import { c as _createClass, a as _inherits, b as _createSuper, d as _classCallCheck, _ as _defineProperty, e as _assertThisInitialized, g as _objectWithoutProperties, h as _objectSpread2 } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';
import { n as noop_1 } from './noop-469b0e21.js';

var TreeNode = /*#__PURE__*/function () {
  /**
  * @param {*} id 标识节点唯一字段
  * @param {*} data 节点保存的数据
  */
  function TreeNode(id, data) {
    _classCallCheck(this, TreeNode);

    this.id = id;
    this.data = data;
    this.children = [];
    this.parent = null;
    this.depth = 0;
    this["default"] = false;
    this.selected = false;
    this.disabled = false;
  }
  /**
   * 是否为树节点
   * @param {object} node 
   */


  _createClass(TreeNode, [{
    key: "is",
    value: function is(node) {
      return node instanceof TreeNode;
    }
    /**
     * 节点查找
     * @param {TreeNode.id} id - 节点的标识
     * @public
     */

  }, {
    key: "find",
    value: function find(id) {
      return this.forEach(function (node) {
        return node.id === id ? node : null;
      });
    }
    /**
     * 追加子级节点
     * @param {TreeNode} node
     * @public
     */

  }, {
    key: "append",
    value: function append(node) {
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

  }, {
    key: "remove",
    value: function remove(index) {
      return this.children.splice(index, 1);
    }
    /**
     * 清空子节点 
     * @public
     */

  }, {
    key: "empty",
    value: function empty() {
      this.children = [];
      return this;
    }
    /**
     * 索引子节点 
     * @param {Number} index
     * @returns {TreeNode}
     * @public
     */

  }, {
    key: "item",
    value: function item(index) {
      return this.children[index];
    }
    /**
     * 过滤子节点
     * @param {function} callback
     * @public
     */

  }, {
    key: "filter",
    value: function filter(callback) {
      var array = this.children;
      this.empty();

      for (var i = 0; i < array.length; i++) {
        var node = array[i];
        var resp = callback(node, i, array);
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

  }, {
    key: "forEach",
    value: function forEach(callback) {
      for (var i = 0; i < this.children.length; i++) {
        var node = this.children[i];
        var resp = callback(node, i, this.children);
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

  }, {
    key: "reduce",
    value: function reduce(visitor) {
      var combine = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var depth = this.depth + 1;

      for (var i = 0; i < this.children.length; i++) {
        this.children[i].depth = depth;
        var node = this.children[i];
        var arr = [];
        var res = visitor(node, arr);
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

  }, {
    key: "backtrack",
    value: function backtrack(callback) {
      for (var node = this.parent; node; node = node.parent) {
        var resp = callback(node);
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

  }, {
    key: "make",
    value: function make(dataArray) {
      var ik = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
      var pk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'pid';
      var root = this;
      var temp = {};
      dataArray = dataArray || [];
      this.empty();
      dataArray.forEach(function (data) {
        temp[data[ik]] = new TreeNode(data[ik], data);
      });
      dataArray.forEach(function (data) {
        var node = temp[data[ik]];
        var parent = temp[data[pk]] || root;
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

  }, {
    key: "checkout",
    value: function checkout(mode) {
      var _this = this;

      mode = parseInt(mode >= 1 && mode <= 4 ? mode : 4);
      this.backtrack(function (node) {
        // 向下扫描直到根节点
        // 多选模式正选时，当有兄弟节点选中就终止向上扫描
        if (node.id === _this.id) {
          if (mode === 1 || mode === 3) {
            // 向下直到叶子节点
            node.forEach(function (node) {
              node.selected = _this.selected;
            });
          }
        }

        var stop;

        if (mode < 3 && node.parent) {
          // 多选
          node.parent.forEach(function (sibling) {
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

        node.selected = _this.selected;
        return stop;
      });
    }
  }]);

  return TreeNode;
}();
var TreeView = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(TreeView, _React$PureComponent);

  var _super = _createSuper(TreeView);

  function TreeView(props) {
    var _this2;

    _classCallCheck(this, TreeView);

    _this2 = _super.call(this);

    _defineProperty(_assertThisInitialized(_this2), "onClick", function (e) {
      switch (e.target.getAttribute('data-evt')) {
        case 'select':
          _this2.props.isSelect ? _this2.props.onSelect ? _this2.props.onSelect(e) : _this2.setState({
            selected: !_this2.state.selected
          }) : null;
          break;

        default:
          _this2.props.isExpand ? _this2.props.onExpand ? _this2.props.onExpand(e) : _this2.setState({
            expanded: !_this2.state.expanded
          }) : null;
          break;
      }

      _this2.props.onClick(e);
    });

    _this2.state = {
      selected: props.selected,
      expanded: props.expanded
    };
    return _this2;
  }

  _createClass(TreeView, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          onClick = _this$props.onClick,
          children = _this$props.children,
          head = _this$props.head,
          expanded = _this$props.expanded,
          selected = _this$props.selected,
          isSelect = _this$props.isSelect,
          isExpand = _this$props.isExpand,
          activeClassName = _this$props.activeClassName,
          props = _objectWithoutProperties(_this$props, ["className", "onClick", "children", "head", "expanded", "selected", "isSelect", "isExpand", "activeClassName"]);

      var _selected = selected || this.state.selected;

      var _expanded = expanded || this.state.expanded;

      return /*#__PURE__*/React__default.createElement('div', _objectSpread2({
        className: classnames(CSSUtil.tree, className),
        children: [/*#__PURE__*/React__default.createElement('div', {
          key: 0,
          children: head({
            expanded: _expanded,
            selected: _selected
          }),
          className: classnames('tit', CSSUtil.activate(_selected, activeClassName)),
          onClick: this.onClick
        }), children ? /*#__PURE__*/React__default.createElement(React__default.Fragment, {
          key: 1,
          children: React__default.Children.map(children, function (Item) {
            if (Item.type !== TreeView) {
              throw new Error('Only `TreeView` used in `TreeView`.');
            }

            return /*#__PURE__*/React__default.cloneElement(Item, _objectSpread2(_objectSpread2({}, Item.props), {}, {
              style: Object.assign({
                display: _expanded ? 'block' : 'none'
              }, Item.props.style)
            }));
          })
        }) : null]
      }, props));
    }
  }]);

  return TreeView;
}(React__default.PureComponent);

_defineProperty(TreeView, "defaultProps", {
  onClick: noop_1,
  head: noop_1,
  expanded: false,
  isExpand: true,
  selected: false,
  isSelect: true
});

_defineProperty(TreeView, "propTypes", {
  head: propTypes.func.isRequired,
  onClick: propTypes.func.isRequired,
  expanded: propTypes.bool,
  onExpand: propTypes.func,
  isExpand: propTypes.bool,
  selected: propTypes.bool,
  onSelect: propTypes.func,
  isSelect: propTypes.bool,
  activeClassName: propTypes.string,
  customize: propTypes.bool
});

export { TreeNode, TreeView };
