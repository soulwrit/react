import '@writ/scss/components/tree.scss';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { CSSUtil } from '../dependency';
import noop from '@writ/utils/noop';

export class TreeNode {
    /**
    * @param {*} id 标识节点唯一字段
    * @param {*} data 节点保存的数据
    */
    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.children = [];
        this.parent = null;

        this.depth = 0;
        this.default = false;
        this.selected = false;
        this.disabled = false;
    }

    /**
     * 是否为树节点
     * @param {object} node 
     */
    is(node) {
        return node instanceof TreeNode;
    }

    /**
     * 节点查找
     * @param {TreeNode.id} id - 节点的标识
     * @public
     */
    find(id) {
        return this.forEach(node => node.id === id ? node : null);
    }

    /**
     * 追加子级节点
     * @param {TreeNode} node
     * @public
     */
    append(node) {
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
    remove(index) {
        return this.children.splice(index, 1);
    }

    /**
     * 清空子节点 
     * @public
     */
    empty() {
        this.children = [];
        return this;
    }

    /**
     * 索引子节点 
     * @param {Number} index
     * @returns {TreeNode}
     * @public
     */
    item(index) {
        return this.children[index];
    }

    /**
     * 过滤子节点
     * @param {function} callback
     * @public
     */
    filter(callback) {
        const array = this.children;

        this.empty();
        for (let i = 0; i < array.length; i++) {
            const node = array[i];
            const resp = callback(node, i, array);

            if (!resp) this.children.push(node);
            node.forEach(callback);
        }

        return this.children;
    }

    /**
     * 遍历子节点
     * @param {function} callback
     * @public
     */
    forEach(callback) {
        for (let i = 0; i < this.children.length; i++) {
            const node = this.children[i];
            const resp = callback(node, i, this.children);

            if (resp === false) continue;
            if (resp) return resp;

            node.forEach(callback);
        }
    }

    /**
     * 节点遍历: 向下访问
     * @param {function} visitor
     * @param {Array}    combine
     * @public
     */
    reduce(visitor, combine = []) {
        let depth = this.depth + 1;

        for (let i = 0; i < this.children.length; i++) {
            this.children[i].depth = depth;

            const node = this.children[i];
            const arr = [];
            const res = visitor(node, arr);

            if (res === false) continue;
            if (res) combine.push(res);

            node.reduce(visitor, arr);
        }

        return combine;
    }

    /**
     * 节点遍历：向上扫描, 回溯
     * @param {function} callback
     * @public
     */
    backtrack(callback) {
        for (let node = this.parent; node; node = node.parent) {
            const resp = callback(node);

            if (resp === false) continue;
            if (resp) return broken;
        }
    }

    /**
     *  json 偏平数组转为 tree
     * @param {array} data - json 数据  
     * @returns {TreeNode}
     * @public
     */
    make(dataArray, ik = 'id', pk = 'pid') {
        const root = this;
        const temp = {};

        dataArray = dataArray || [];
        this.empty();
        dataArray.forEach(data => {
            temp[data[ik]] = new TreeNode(data[ik], data);
        });
        dataArray.forEach(data => {
            const node = temp[data[ik]];
            const parent = temp[data[pk]] || root;

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
    checkout(mode) {
        mode = parseInt(mode >= 1 && mode <= 4 ? mode : 4);

        this.backtrack(node => {
            // 向下扫描直到根节点
            // 多选模式正选时，当有兄弟节点选中就终止向上扫描
            if (node.id === this.id) {
                if (mode === 1 || mode === 3) {
                    // 向下直到叶子节点
                    node.forEach(node => {
                        node.selected = this.selected;
                    });
                }
            }

            let stop;
            if (mode < 3 && node.parent) {
                // 多选
                node.parent.forEach(sibling => {
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
}

export class TreeView extends React.PureComponent {
    static defaultProps = {
        onClick: noop,
        head: noop,

        expanded: false,
        isExpand: true,

        selected: false,
        isSelect: true,
    }
    static propTypes = {
        head: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,

        expanded: PropTypes.bool,
        onExpand: PropTypes.func,
        isExpand: PropTypes.bool,

        selected: PropTypes.bool,
        onSelect: PropTypes.func,
        isSelect: PropTypes.bool,

        activeClassName: PropTypes.string,
        customize: PropTypes.bool
    }
    constructor(props) {
        super();
        this.state = {
            selected: props.selected,
            expanded: props.expanded
        };
    }
    onClick = e => {
        switch (e.target.getAttribute('data-evt')) {
            case 'select':
                this.props.isSelect
                    ? this.props.onSelect
                        ? this.props.onSelect(e)
                        : this.setState({ selected: !this.state.selected })
                    : null;
                break;
            default:
                this.props.isExpand
                    ? this.props.onExpand
                        ? this.props.onExpand(e)
                        : this.setState({ expanded: !this.state.expanded })
                    : null;
                break;
        }

        this.props.onClick(e);
    }

    render() {
        const { className, onClick, children, head, expanded, selected, isSelect, isExpand, activeClassName, ...props } = this.props;
        const _selected = selected || this.state.selected;
        const _expanded = expanded || this.state.expanded;

        return React.createElement('div', {
            className: classnames(CSSUtil.tree, className),
            children: [
                React.createElement('div', {
                    key: 0,
                    children: head({ expanded: _expanded, selected: _selected }),
                    className: classnames('tit', CSSUtil.activate(_selected, activeClassName)),
                    onClick: this.onClick
                }),
                children ? React.createElement(React.Fragment, {
                    key: 1,
                    children: React.Children.map(children, Item => {
                        if (Item.type !== TreeView) {
                            throw new Error('Only `TreeView` used in `TreeView`.');
                        }

                        return React.cloneElement(Item, {
                            ...Item.props,
                            style: Object.assign({
                                display: _expanded ? 'block' : 'none'
                            }, Item.props.style),
                        });
                    })
                }) : null
            ],
            ...props
        });
    }
}