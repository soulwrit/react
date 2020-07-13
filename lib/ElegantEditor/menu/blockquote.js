import React from 'react';
export default {
    name: 'blockquote',
    override: false,
    view(master) {
        return React.createElement('i', {
            className: 'reico reico-blockquote',
            onClick: () => {
                var html = '<blockquote><p><br></p></blockquote>';
                const editor = this.editor
                const $selectionElem = editor.selection.getSelectionContainerElem()
                const nodeName = $selectionElem.getNodeName()

                if (!UA.isIE()) {
                    if (nodeName === 'BLOCKQUOTE') {
                        // 撤销 quote
                        editor.cmd.do('formatBlock', '<P>')
                    } else {
                        // 转换为 quote
                        editor.cmd.do('formatBlock', '<BLOCKQUOTE>')
                    }
                    return
                }

                // IE 中不支持 formatBlock <BLOCKQUOTE> ，要用其他方式兼容
                let content, $targetELem
                if (nodeName === 'P') {
                    // 将 P 转换为 quote
                    content = $selectionElem.text()
                    $targetELem = $(`<blockquote>${content}</blockquote>`)
                    $targetELem.insertAfter($selectionElem)
                    $selectionElem.remove()
                    return
                }
                if (nodeName === 'BLOCKQUOTE') {
                    // 撤销 quote
                    content = $selectionElem.text()
                    $targetELem = $(`<p>${content}</p>`)
                    $targetELem.insertAfter($selectionElem)
                    $selectionElem.remove()
                }
            },
            style: master.iconStyle,
            title: '引用',
        });
    }
}