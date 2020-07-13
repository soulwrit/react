import toHTMLNode from '../../../utils/toHTMLNode';
import { bs } from '../../../utils/web-ua';

function Utils(options) {
    this.options = Object.assign({
        useStyleWithCSS: true,
        onChange: undefined
    }, options);
    this._range = null;
}
const UtilsProto = Utils.prototype;

UtilsProto.constructor = Utils;
UtilsProto.execCommand = function (name, value, callback) {
    // 执行命令
    const options = this.options;

    // 使用 styleWithCSS
    if (!options.useStyleWithCSS) {
        document.execCommand('styleWithCSS', null, true);
        options.useStyleWithCSS = true;
    }

    // 如果无选区，忽略
    if (!this.getRange()) {
        return;
    }

    // 恢复选取
    this.restoreSelection()

    // 执行
    switch (name) {
        case 'insertHTML': this.insertHTML(value); break;
        case 'insertNode': this.insertNode(value); break;
        default: {
            // 有自定义事件
            typeof name === 'function' ? name(this, value) : document.execCommand(name, false, value);
            break;
        }
    }
    // 最后，恢复选取保证光标在原来的位置闪烁
    this.saveRange();
    this.restoreSelection();

    // 触发 onchange
    if (typeof callback === 'function') {
        callback();
    }
    if (typeof options.onChange === 'function') {
        options.onChange();
    }
}
UtilsProto.insertHTML = function (html) {
    // 自定义 insertHTML 事件
    const range = this.getRange();

    if (document.queryCommandSupported('insertHTML')) {
        // W3C
        document.execCommand('insertHTML', false, html);
    } else if (range.insertNode) {
        // IE
        range.deleteContents();
        range.insertNode(toHTMLNode(html));
    } else if (range.pasteHTML) {
        // IE <= 10
        range.pasteHTML(html);
    }
}
UtilsProto.insertNode = function (node) {
    // 插入 htmlElement
    const range = this.getRange();
    if (range.insertNode) {
        range.deleteContents();
        range.insertNode(toHTMLNode(node));
    }
}
UtilsProto.queryCommandValue = function (name) {
    // 封装 document.queryCommandValue
    return document.queryCommandValue(name);
}
UtilsProto.queryCommandState = function (name) {
    // 封装 document.queryCommandState
    return document.queryCommandState(name);
}
UtilsProto.getRange = function () {
    // 获取 range 对象
    return this._range;
}
UtilsProto.saveRange = function (_range) {
    // 保存选区
    if (_range) {
        // 保存已有选区
        this._range = _range;
        return;
    }

    // 获取当前的选区
    const selection = window.getSelection();
    if (selection.rangeCount === 0) {
        return
    }
    const range = selection.getRangeAt(0);

    // 判断选区内容是否在编辑内容之内
    const container = this.getSelectionContainerNode(range);
    if (container) {
        return;
    }

    // 判断选区内容是否在不可编辑区域之内 
    if (container.getAttribute('contenteditable') === 'false' || container.parentUntil('[contenteditable=false]')) {
        return;
    }

    if (this.options.textarea.isContain(container)) {
        // 是编辑内容之内的
        this._range = range;
    }
}
UtilsProto.collapseRange = function (toStart) {
    // 折叠选区
    if (toStart == null) {
        // 默认为 false
        toStart = false;
    }
    const range = this._range;
    if (range) {
        range.collapse(toStart);
    }
}
UtilsProto.getSelectionText = function () {
    // 选中区域的文字
    const range = this._range;
    if (range) {
        return this._range.toString();
    } else {
        return ''
    }
}
UtilsProto.getSelectionContainerNode = function (range) {
    // 选区的 Node
    range = range || this._range;
    let node;
    if (range) {
        node = range.commonAncestorContainer;
        return node.nodeType === 1 ? node : node.parentNode;
    }
}
UtilsProto.getSelectionStartNode = function (range) {
    range = range || this._range;
    let node;
    if (range) {
        node = range.startContainer;
        return node.nodeType === 1 ? node : node.parentNode;
    }
}
UtilsProto.getSelectionEndNode = function (range) {
    range = range || this._range;
    let node;
    if (range) {
        node = range.endContainer;
        return node.nodeType === 1 ? node : node.parentNode;
    }
}
UtilsProto.isSelectionEmpty = function () {
    // 选区是否为空
    const range = this._range;
    if (range && range.startContainer) {
        if (range.startContainer === range.endContainer) {
            if (range.startOffset === range.endOffset) {
                return true;
            }
        }
    }
    return false;
}
UtilsProto.restoreSelection = function () {
    // 恢复选区
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(this._range);
}
UtilsProto.createEmptyRange = function () {
    // 创建一个空白（即 &#8203 字符）选区 
    const range = this.getRange();
    let node

    if (!range) {
        // 当前无 range
        return
    }
    if (!this.isSelectionEmpty()) {
        // 当前选区必须没有内容才可以
        return
    }

    try {
        // 目前只支持 webkit 内核
        if (bs.webkit) {
            // 插入 &#8203
            this.insertHTML('&#8203;');
            // 修改 offset 位置
            range.setEnd(range.endContainer, range.endOffset + 1);
            // 存储
            this.saveRange(range);
        } else {
            node = toHTMLNode('<strong>&#8203;</strong>');
            this.insertNode(node);
            this.createRangeByNode(node, true);
        }
    } catch (ex) {
        // 部分情况下会报错，兼容一下
    }
}
UtilsProto.createRangeByNode = function (node, toStart, isContent) {
    // 根据 node 设置选区
    // node - DOM节点
    // toStart - true 开始位置，false 结束位置
    // isContent - 是否选中Elem的内容
    if (!node) {
        return;
    }

    const range = document.createRange();

    if (isContent) {
        range.selectNodeContents(node);
    } else {
        range.selectNode(node);
    }

    if (typeof toStart === 'boolean') {
        range.collapse(toStart);
    }

    // 存储 range
    this.saveRange(range);
}

export { Utils };