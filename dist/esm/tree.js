import { g as _objectWithoutProperties, h as _objectSpread2, _ as _defineProperty, a as _inherits, b as _createSuper, d as _classCallCheck, c as _createClass } from './_rollupPluginBabelHelpers-62f9ecef.js';
import { createElement, Children, cloneElement, PureComponent } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';
import { a as assert_1 } from './assert-cc694573.js';
import { n as noop_1 } from './noop-469b0e21.js';

/**
 * @param {number|string} id 节点的唯一标识
 * @param {object} data 节点保存的数据 
 */

function TreeNode(id, data) {
  this.id = id; // 节点唯一标识

  this.data = data; // 节点保存的数据 

  this.children = []; // 节点的子节点

  this.parent = null; // 节点的父节点

  this.depth = 0; // 节点的深度

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
};
/**
 * 节点查找
 * @param {TreeNode.id} id - 节点的标识
 * @public
 */


TreeNode.prototype.find = function find(id) {
  return this.each(function (node) {
    return node.id === id ? node : null;
  });
};
/**
 * 遍历子节点
 * @param {function} callback
 * @public
 */


TreeNode.prototype.each = function forEach(callback) {
  var children = this.children;

  for (var i = 0; i < children.length; i++) {
    var node = children[i];
    var resp = callback(node, i, children);
    if (resp === false) continue;
    if (resp) return resp;
    node.each(callback);
  }
};
/**
 * 过滤子节点
 * @param {function} callback
 * @public
 */


TreeNode.prototype.filter = function filter(callback) {
  var array = this.children;
  this.empty();

  for (var i = 0; i < array.length; i++) {
    var node = array[i];
    var resp = callback(node, i, array);
    if (resp === false) this.children.push(node);
    node.filter(callback);
  }

  return this.children;
};
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
};
/**
 * 索引子节点 
 * @param {Number} index
 * @returns {TreeNode}
 * @public
 */


TreeNode.prototype.remove = function remove(index) {
  return this.children.splice(index, 1);
};
/**
 * 索引子节点 
 * @param {Number} index
 * @returns {TreeNode}
 * @public
 */


TreeNode.prototype.item = function item(index) {
  return this.children[index];
};
/**
 * 清空子节点 
 * @public
 */


TreeNode.prototype.empty = function empty() {
  this.children = [];
  return this;
};
/**
 * 节点遍历: 向下访问 
 * @param {function} visitor
 * @param {array}    combine
 * @public
 */


TreeNode.prototype.walk = function walk(visitor) {
  var combine = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var depth = this.depth + 1;

  for (var i = 0; i < this.children.length; i++) {
    this.children[i].depth = depth;
    var node = this.children[i];
    var arr = [];
    var res = visitor(node, arr);
    if (res === false) continue;
    if (res) combine.push(res);
    node.walk(visitor, arr);
  }

  return combine;
};
/**
 * 节点遍历：向上扫描, 回溯
 * @param {function} callback
 * @public
 */


TreeNode.prototype.scanUp = function backtrack(callback) {
  for (var node = this.parent; node; node = node.parent) {
    var resp = callback(node);
    if (resp === false) continue;
    if (resp) return resp;
  }
};
/**
 * json 偏平数组转为 tree
 * @param {array} dataArray - json 数据  
 * @param {array} diffArray - json 数据  
 * @returns {TreeNode}
 * @public
 */


TreeNode.prototype.generate = function make(dataArray) {
  var idKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
  var pidKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'pid';
  var root = this;
  var flat = {};
  this.empty();
  dataArray = dataArray || [];
  dataArray.forEach(function (data) {
    var id = data[idKey];
    var node = new TreeNode(id, data);
    flat[id] = node;
  });
  dataArray.forEach(function (data) {
    var id = data[idKey];
    var pid = data[pidKey];
    var node = flat[id];
    var parent = flat[pid] || root;
    node.parent = parent;
    parent.append(node);
  });
  this.flat = flat;
  return this;
};

var TreeMeta = function TreeMeta(props) {
  var active = props.active,
      children = props.children,
      className = props.className,
      disabled = props.disabled,
      onClick = props.onClick,
      onMouseEnter = props.onMouseEnter,
      onMouseLeave = props.onMouseLeave,
      selected = props.selected,
      style = props.style,
      ref = _objectWithoutProperties(props, ["active", "children", "className", "disabled", "onClick", "onMouseEnter", "onMouseLeave", "selected", "style"]);

  return /*#__PURE__*/createElement('div', _objectSpread2({
    className: classnames('view', className, _defineProperty({}, active, selected)),
    onClick: disabled ? null : onClick,
    onMouseEnter: disabled ? null : onMouseEnter,
    onMouseLeave: disabled ? null : onMouseLeave,
    style: style
  }, ref), children);
};
TreeMeta.defaultProps = {
  active: void 0,
  className: void 0,
  disabled: false,
  onClick: noop_1,
  onMouseEnter: void 0,
  onMouseLeave: void 0,
  selected: false,
  style: null
};

if (window.DEV) {
  TreeMeta.propTypes = {
    active: propTypes.string,
    className: propTypes.string,
    disabled: propTypes.bool,
    onClick: propTypes.func.isRequired,
    onMouseEnter: propTypes.func,
    onMouseLeave: propTypes.func,
    selected: propTypes.bool,
    style: propTypes.object
  };
}

var TreeView = /*#__PURE__*/function (_PureComponent) {
  _inherits(TreeView, _PureComponent);

  var _super = _createSuper(TreeView);

  function TreeView(props) {
    var _this;

    _classCallCheck(this, TreeView);

    _this = _super.call(this);
    _this.state = {
      expanded: props.expanded,
      disabled: props.disabled,
      selected: props.selected
    };
    return _this;
  }

  _createClass(TreeView, [{
    key: "expand",
    value: function expand(expanded, callback) {
      this.setState({
        expanded: expanded != null ? expanded : !this.state.expanded
      }, callback);
    }
  }, {
    key: "disable",
    value: function disable(disabled, callback) {
      this.setState({
        disabled: disabled != null ? disabled : !this.state.disabled
      }, callback);
    }
  }, {
    key: "select",
    value: function select(selected, callback) {
      this.setState({
        selected: selected != null ? selected : !this.state.selected
      }, callback);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          render = _this$props.render,
          style = _this$props.style;
      var _this$state = this.state,
          disabled = _this$state.disabled,
          expanded = _this$state.expanded;
      var meta = render(this.state, this);
      assert_1.nuil(meta, 'Please via tree meta.');
      assert_1.truly(meta.type === TreeMeta, 'tree meta must be `TreeMeta` type.');
      return /*#__PURE__*/createElement('div', {
        className: classnames(CSSUtil.tree, {
          disabled: disabled
        }, className),
        style: style
      }, meta, Children.map(children || null, function (Item) {
        assert_1.nuil(Item, 'Invalid Tree Node.');
        assert_1.truly(Item.type === TreeView, 'Only `TreeView` used in `TreeView`.');
        return /*#__PURE__*/cloneElement(Item, {
          className: classnames({
            non: !expanded
          })
        });
      }));
    }
  }]);

  return TreeView;
}(PureComponent);
TreeView.defaultProps = {
  className: void 0,
  disabled: false,
  expanded: false,
  onClick: noop_1,
  render: noop_1,
  selected: false,
  style: null
};

if (window.DEV) {
  TreeView.propTypes = {
    className: propTypes.string,
    disabled: propTypes.bool,
    expanded: propTypes.bool,
    onClick: propTypes.func.isRequired,
    render: propTypes.func.isRequired,
    selected: propTypes.bool,
    style: propTypes.object
  }; // TreeMeta
}

export { TreeMeta, TreeNode, TreeView };
