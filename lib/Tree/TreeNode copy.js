export { TreeNode };

/**
 * @param {number|string} id 节点的唯一标识
 * @param {object} data 节点保存的数据 
 */
function TreeNode(id, data) {
    this.id = id;          // 节点唯一标识
    this.data = data;      // 节点保存的数据 
    this.children = [];    // 节点的子节点
    this.parent = null;    // 节点的父节点
    this.depth = 0;        // 节点的深度

    this.display = true;   // 节点的是否被渲染
    this.selected = false; // [节点状态] 选中
    this.disabled = false; // [节点状态] 禁用
    this.bubble = false;   // 冒泡
}

/**
 * 是否为树节点
 * @param {TreeNode} node 
 */
TreeNode.prototype.is = function is(node) {
    return node instanceof TreeNode;
}

/**
 * 节点查找
 * @param {TreeNode.id} id - 节点的标识
 * @public
 */
TreeNode.prototype.find = function find(id) {
    return this.each(node => node.id === id ? node : null);
}

/**
 * 遍历子节点
 * @param {function} callback
 * @public
 */
TreeNode.prototype.each = function forEach(callback) {
    const children = this.children;

    for (let i = 0; i < children.length; i++) {
        const node = children[i];
        const resp = callback(node, i, children);

        if (resp === false) continue;
        if (resp) return resp;

        node.each(callback);
    }
}

/**
 * 过滤子节点
 * @param {function} callback
 * @public
 */
TreeNode.prototype.filter = function filter(callback) {
    const array = this.children;

    this.empty();
    for (let i = 0; i < array.length; i++) {
        const node = array[i];
        const resp = callback(node, i, array);

        if (resp === false) this.children.push(node);
        node.filter(callback);
    }

    return this.children;
}

/**
 * 节点遍历: 向下访问
 * @param {function} visitor
 * @param {array}    combine
 * @public
 */
TreeNode.prototype.walk = function walk(visitor, combine = []) {
    let depth = this.depth + 1;

    for (let i = 0; i < this.children.length; i++) {
        this.children[i].depth = depth;

        const node = this.children[i];
        const arr = [];
        const res = visitor(node, arr);

        if (res === false) continue;
        if (res) combine.push(res);

        node.walk(visitor, arr);
    }

    return combine;
}

/**
 * 节点遍历：向上扫描, 回溯
 * @param {function} callback
 * @public
 */
TreeNode.prototype.backtrack = function backtrack(callback) {
    for (let node = this.parent; node; node = node.parent) {
        const resp = callback(node);

        if (resp === false) continue;
        if (resp) return resp;
    }
}

/**
 * 追加子级节点
 * @param {TreeNode} node
 * @public
 */
TreeNode.prototype.append = function append(node) {
    if (!this.is(node)) {
        throw new Error('Invaild TreeNode.');
    }

    node.depth = this.depth + 1;
    this.children.push(node);

    return this;
}

/**
 * 索引子节点 
 * @param {Number} index
 * @returns {TreeNode}
 * @public
 */
TreeNode.prototype.remove = function remove(index) {
    return this.children.splice(index, 1);
}

/**
 * 索引子节点 
 * @param {Number} index
 * @returns {TreeNode}
 * @public
 */
TreeNode.prototype.item = function item(index) {
    return this.children[index];
}

/**
 * 清空子节点 
 * @public
 */
TreeNode.prototype.empty = function empty() {
    this.children = [];
    return this;
}

/**
 * json 偏平数组转为 tree
 * @param {array} dataArray - json 数据  
 * @returns {TreeNode}
 * @public
 */
TreeNode.prototype.generate = function make(dataArray, id = 'id', pid = 'pid') {
    const root = this;
    const flat = {};

    this.empty();
    dataArray = dataArray || [];
    dataArray.forEach(data => {
        flat[data[id]] = new TreeNode(data[id], data);
    });
    dataArray.forEach(data => {
        const node = flat[data[id]];
        const parent = flat[data[pid]] || root;

        node.parent = parent;
        parent.append(node);
    });

    return this;
}

/**
 * @param {Number} mode - 可选值
 *        1. multi-under 向下多选: 多选关联子级
 *        2. multiple 多选
 *        3. radio-under 向下单选: 单选关联子级
 *        4. radio 单选
 */
TreeNode.prototype.checkout = function checkout(mode) {
    mode = parseInt(mode >= 1 && mode <= 4 ? mode : 4);
    this.backtrack(node => {
        // 向下扫描直到根节点
        // 多选模式正选时，当有兄弟节点选中就终止向上扫描
        if (node.id === this.id) {
            if (mode === 1 || mode === 3) {
                // 向下直到叶子节点
                node.each(node => {
                    node.selected = this.selected;
                });
            }
        }

        let stop;
        if (mode < 3 && node.parent) {
            // 多选
            node.parent.each(sibling => {
                if (sibling === node) {
                    return false;
                }

                stop = sibling.selected;

                if (stop) {
                    return true;
                }

                return true;
            });
        }

        node.selected = this.selected;
        return stop;
    });
} 