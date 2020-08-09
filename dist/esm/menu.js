import { g as _objectWithoutProperties, h as _objectSpread2, c as _defineProperty, _ as _inherits, a as _createSuper, b as _classCallCheck, e as _createClass } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { t as theme, d as dirs, C as CSSUtil } from './dependency-8ea69cb4.js';
import { FlexItem, Flex } from './flex.js';
import { LineBar } from './linebar.js';

function assert(expr, message) {
  function AssertError(message) {
    this.message = message;
  }

  AssertError.prototype = new Error();
  AssertError.prototype.name = 'AssertError';

  assert = function (expr, message) {
    if (expr == null || expr === false || expr instanceof Error) {
      throw new AssertError(message);
    }
  };

  return assert(expr, message);
}

console.assert = assert;
var assertFalsly = assert;

var MenuItem = /*#__PURE__*/React__default.memo( /*#__PURE__*/React__default.forwardRef(function (_ref, ref) {
  var _classnames;

  var active = _ref.active,
      activeClassName = _ref.activeClassName,
      children = _ref.children,
      className = _ref.className,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      style = _ref.style,
      rest = _objectWithoutProperties(_ref, ["active", "activeClassName", "children", "className", "disabled", "onClick", "style"]);

  return /*#__PURE__*/React__default.createElement(FlexItem, _objectSpread2({
    className: classnames(className, (_classnames = {}, _defineProperty(_classnames, activeClassName, active), _defineProperty(_classnames, "active", activeClassName ? false : active), _defineProperty(_classnames, "disabled", disabled), _classnames)),
    onClick: disabled ? null : onClick,
    ref: ref
  }, rest), children);
}));
MenuItem.defaultProps = {
  disabled: false
};

if (window.DEV) {
  MenuItem.propTypes = {
    active: propTypes.bool,
    disabled: propTypes.bool,
    onClick: propTypes.func
  };
}

var getLineBarDir = function getLineBarDir(dir) {
  return dir === 'ttr' || dir === 'rtt' ? 'ltr' : 'ttr';
};

var Menu = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Menu, _React$PureComponent);

  var _super = _createSuper(Menu);

  function Menu(props) {
    var _this;

    _classCallCheck(this, Menu);

    _this = _super.call(this);
    _this.state = {
      index: props.index || props.activeIndex,
      activedNode: null
    };
    _this.items = {};
    return _this;
  }

  _createClass(Menu, [{
    key: "setIndex",
    value: function setIndex(index) {
      var _this2 = this;

      this.setState({
        index: index
      }, function () {
        var onChange = _this2.props.onChange;
        if (onChange) onChange(index);
      });
    }
  }, {
    key: "getLineBarElement",
    value: function getLineBarElement(isOpen, dir, size) {
      var _this$props = this.props,
          lineBarColor = _this$props.lineBarColor,
          lineBarDir = _this$props.lineBarDir;
      var activedNode = this.state.activedNode;
      return isOpen && activedNode ? /*#__PURE__*/React__default.createElement(LineBar, {
        color: lineBarColor,
        dir: lineBarDir ? lineBarDir : getLineBarDir(dir),
        size: size,
        target: activedNode
      }) : null;
    }
  }, {
    key: "getOverflowElement",
    value: function getOverflowElement() {
      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          activeClassName = _this$props2.activeClassName,
          className = _this$props2.className,
          children = _this$props2.children,
          dir = _this$props2.dir,
          lineBar = _this$props2.lineBar,
          lineBarSize = _this$props2.lineBarSize,
          lineHeight = _this$props2.lineHeight,
          style = _this$props2.style,
          theme = _this$props2.theme;
      var activeIndex = this.state.index;
      return /*#__PURE__*/React__default.createElement(Flex, {
        className: classnames(CSSUtil.menu, dir, theme, className),
        style: Object.assign({
          lineHeight: lineHeight
        }, style)
      }, React__default.Children.map(children, function (child, idx) {
        assertFalsly(child, '`Menu` Contains valid elements.');
        assertFalsly(child.type === MenuItem, 'Only `MemuItem` can be used in `Menu`.');
        var index = child.key || idx;
        var isActived = activeIndex == index;
        return /*#__PURE__*/React__default.cloneElement(child, {
          active: isActived,
          activeClassName: activeClassName,
          key: index,
          onClick: function onClick(e) {
            e.preventDefault();
            e.stopPropagation();

            _this3.setIndex(index);
          },
          // onMouseEnter: e => {
          // },
          // onMouseLeave: e => {
          // },
          ref: function ref(instance) {
            if (isActived) {
              _this3.setState({
                activedNode: instance
              });
            }
          }
        });
      }), this.getLineBarElement(lineBar, dir, lineBarSize), this.getOverflowElement());
    }
  }]);

  return Menu;
}(React__default.PureComponent);

Menu.Item = MenuItem;
Menu.defaultProps = {
  theme: 'primary',
  dir: 'ltr',
  lineBar: true
};

if (window.DEV) {
  Menu.propTypes = {
    // 默认的展示的菜单项
    index: propTypes.oneOfType([propTypes.string, propTypes.number]),
    // 菜单主题色
    theme: propTypes.oneOf(theme),
    // 当菜单发生变化时执行
    onChange: propTypes.func,
    // 显示 line bar 滑动效果
    lineBar: propTypes.bool,
    lineBarDir: propTypes.oneOf(dirs),
    lineBarColor: propTypes.string,
    lineBarSize: propTypes.number,
    // 
    dir: propTypes.oneOf(dirs)
  };
}

export { Menu, MenuItem };
