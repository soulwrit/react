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


    this.expanded = false;
    this.selected = false;
    this.disabled = false;
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
TreeNode.prototype.scanUp = function backtrack(callback) {
    for (let node = this.parent; node; node = node.parent) {
        const resp = callback(node);

        if (resp === false) continue;
        if (resp) return resp;
    }
}

/**
 * json 偏平数组转为 tree
 * @param {array} dataArray - json 数据  
 * @param {array} diffArray - json 数据  
 * @returns {TreeNode}
 * @public
 */
TreeNode.prototype.generate = function make(dataArray, idKey = 'id', pidKey = 'pid') {
    const root = this;
    const flat = {};

    this.empty();
    dataArray = dataArray || [];
    dataArray.forEach(data => {
        const id = data[idKey];
        const node = new TreeNode(id, data);

        flat[id] = node;
    });
    dataArray.forEach(data => {
        const id = data[idKey];
        const pid = data[pidKey];
        const node = flat[id];
        const parent = flat[pid] || root;

        node.parent = parent;
        parent.append(node);
    });

    this.flat = flat;
    return this;
}