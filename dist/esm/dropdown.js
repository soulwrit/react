import { g as _objectWithoutProperties, h as _objectSpread2, i as _typeof, _ as _inherits, a as _createSuper, b as _classCallCheck, c as _defineProperty, d as _assertThisInitialized, e as _createClass, f as _slicedToArray } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default, { isValidElement } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';
import { a as assert_1 } from './assert-cc694573.js';
import { n as noop_1 } from './noop-469b0e21.js';
import { o as objectHasOwn } from './object-has-own-6b83c90b.js';
import ReactDOM from 'react-dom';
import './raf-4503f6a0.js';
import './dom-contains-5179471e.js';
import { T as Trigger } from './Trigger-efc78ddb.js';
import { g as getViewportWidth } from './dom-viewport-width-59a780a1.js';
import { g as getViewportHeight } from './dom-viewport-height-640d289b.js';
import { g as getZIndex } from './zIndex-bd9d5e3e.js';

function Group(props) {
  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames('grp', props.className),
    style: props.style
  }, props.children);
}
Group.defaultProps = {};

if (window.DEV) {
  Group.propTypes = {
    children: propTypes.any,
    className: propTypes.string,
    style: propTypes.object
  };
}

var Head = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var children = props.children,
      hoverable = props.hoverable,
      onClick = props.onClick,
      onMouseEnter = props.onMouseEnter,
      type = props.type;
  var nextProps = {
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    ref: ref
  };

  try {
    React__default.Children.only(children);

    if (hoverable) {
      nextProps.onMouseEnter = function (e) {
        if (objectHasOwn(children.props, 'onMouseEnter')) {
          children.props.onMouseEnter(e);
        }

        onMouseEnter(e);
      };
    }

    return /*#__PURE__*/React__default.cloneElement(children, nextProps);
  } catch (error) {
    nextProps.className = 'wrapper';
    return /*#__PURE__*/React__default.createElement(type, nextProps, children);
  }
});
Head.defaultProps = {
  type: 'span'
};

if (window.DEV) {
  Head.propTypes = {
    onClick: propTypes.func,
    onMouseEnter: propTypes.func,
    type: propTypes.string
  };
}

function Item(props) {
  var value = props.value,
      children = props.children,
      onClick = props.onClick,
      className = props.className,
      style = props.style,
      rest = _objectWithoutProperties(props, ["value", "children", "onClick", "className", "style"]);

  return /*#__PURE__*/React__default.createElement('div', _objectSpread2(_objectSpread2({}, rest), {}, {
    className: classnames('i', className),
    onClick: onClick
  }), children ? children : value);
}

if (window.DEV) {
  Item.propTypes = {
    children: propTypes.node,
    className: propTypes.string,
    onClick: propTypes.func,
    value: propTypes.any
  };
}

function getPosition(pRect, lRect, props) {
  var placement = props.placement,
      space = props.space;
  var vw = getViewportHeight();
  var vh = getViewportWidth();
  var pos = {};

  switch (_typeof(placement)) {
    case 'function':
      pos = placement(lRect, pRect);
      break;

    case 'string':
      switch (placement) {
        case 'right':
          pos.left = pRect.right - Math.max(pRect.width, lRect.width);
          pos.top = pRect.top + pRect.height + space;
          break;

        case 'left':
          pos.left = pRect.left;
          pos.top = pRect.top + pRect.height;
          break;

        case 'top':
          pos.left = pRect.left;
          pos.bottom = pRect.top;
          break;

        case 'bottom':
          pos.left = pRect.left;
          pos.top = pRect.top + pRect.height;
          break;
      }

      break;

    case 'object':
      for (var prop in placement) {
        pos[prop] = placement[prop];
      }

      break;

    default:
      pos.top = pRect.top + pRect.height;
      pos.left = pRect.left;
      break;
  }

  pos.zIndex = getZIndex();
  return pos;
}

var DropdownHead = Head;
var DropdownItem = Item;
var DropdownGroup = Group;
var Dropdown = /*#__PURE__*/function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  var _super = _createSuper(Dropdown);

  function Dropdown() {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "getPos", function (pRect, lRect) {
      return getPosition(pRect, lRect, _this.props);
    });

    _this.state = {
      selected: []
    };
    return _this;
  }

  _createClass(Dropdown, [{
    key: "mapDropList",
    value: function mapDropList(array, serial, action) {
      var _this2 = this;

      var _this$props = this.props,
          multiple = _this$props.multiple,
          onChange = _this$props.onChange,
          selectable = _this$props.selectable;
      var selected = this.state.selected;
      return array.map(function (child, index) {
        assert_1.nuil(child, 'Invalid `Dropdown.Item`.');

        switch (child.type) {
          case Item:
            var key = serial + '.' + index;
            var _child$props = child.props,
                className = _child$props.className,
                _onClick = _child$props.onClick,
                value = _child$props.value;
            return /*#__PURE__*/React__default.cloneElement(child, {
              key: index,
              className: classnames(className, selectable ? {
                active: objectHasOwn(selected, key)
              } : null),
              onClick: function onClick(e) {
                e.stopPropagation();

                if (selectable) {
                  var tmp = Object.assign({}, selected);

                  if (multiple) {
                    tmp[key] = value;
                  } else {
                    tmp = _defineProperty({}, key, value);
                  }

                  _this2.setState({
                    selected: tmp
                  });
                }

                if (typeof _onClick === 'function') {
                  _onClick(key, value);
                }

                onChange(e);
                action.close();
              }
            });

          case Group:
            serial++;
            return /*#__PURE__*/React__default.cloneElement(child, {
              key: index,
              children: _this2.mapDropList(React__default.Children.toArray(child.props.children), serial, action)
            });

          default:
            assert_1["throw"]('Only `Group` or `Item` can used `Dropdown`.');
            break;
        }
      });
    }
  }, {
    key: "parseChildren",
    value: function parseChildren() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          head = _this$props2.head;
      var _Head = head;
      var _Body = [];
      React__default.Children.forEach(children, function (child) {
        if (! /*#__PURE__*/React__default.isValidElement(child)) return child;

        switch (child.type) {
          case Head:
            _Head = child;
            break;

          case Item:
          case Group:
            _Body.push(child);

            break;
        }
      });
      return [_Head, _Body];
    }
  }, {
    key: "getHeader",
    value: function getHeader(node, props) {
      if ( /*#__PURE__*/isValidElement(node) && node.type === Head) {
        return /*#__PURE__*/React__default.cloneElement(node, props);
      }

      return /*#__PURE__*/React__default.createElement(Head, props, node);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props3 = this.props,
          calc = _this$props3.calc,
          className = _this$props3.className,
          clickable = _this$props3.clickable,
          hoverable = _this$props3.hoverable,
          style = _this$props3.style,
          closeOnEsc = _this$props3.closeOnEsc,
          closeOnOutsideClick = _this$props3.closeOnOutsideClick,
          container = _this$props3.container,
          disabled = _this$props3.disabled,
          escape = _this$props3.escape,
          onClose = _this$props3.onClose,
          onKeyUp = _this$props3.onKeyUp,
          onOpen = _this$props3.onOpen,
          onResize = _this$props3.onResize,
          resetOnTopResize = _this$props3.resetOnTopResize,
          visible = _this$props3.visible;
      var calcCoord = calc || this.getPos;

      var _this$parseChildren = this.parseChildren(),
          _this$parseChildren2 = _slicedToArray(_this$parseChildren, 2),
          _Head = _this$parseChildren2[0],
          _Body = _this$parseChildren2[1];

      return /*#__PURE__*/React__default.createElement(Trigger, {
        closeOnEsc: closeOnEsc,
        closeOnOutsideClick: closeOnOutsideClick,
        disabled: disabled,
        escape: escape,
        onClose: onClose,
        onKeyUp: onKeyUp,
        onOpen: onOpen,
        onResize: onResize,
        resetOnTopResize: resetOnTopResize,
        calcCoord: calcCoord,
        visible: visible
      }, function (action) {
        var coord = action.coord,
            layer = action.layer,
            trigger = action.trigger,
            open = action.open,
            close = action.close,
            visible = action.visible;
        return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, _this3.getHeader(_Head, {
          clickable: clickable,
          hoverable: hoverable,
          onClick: open,
          onMouseEnter: hoverable ? open : null,
          ref: trigger
        }), /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React__default.createElement('div', {
          className: classnames(CSSUtil.dropdown, {
            non: !visible
          }, className),
          onMouseLeave: hoverable ? close : null,
          ref: layer,
          style: visible ? Object.assign({
            zIndex: getZIndex()
          }, style, coord) : null
        }, _this3.mapDropList(_Body, 0, action)), container));
      });
    }
  }]);

  return Dropdown;
}(React__default.Component);
Dropdown.Head = Head;
Dropdown.Item = Item;
Dropdown.Group = Group;
Dropdown.defaultProps = {
  clickable: true,
  container: document.body,
  multiple: false,
  onChange: noop_1,
  space: 10
};

if (window.DEV) {
  Dropdown.propTypes = {
    clickable: propTypes.bool,
    head: propTypes.any,
    hoverable: propTypes.bool,
    multiple: propTypes.bool,
    onChange: propTypes.func,
    selectable: propTypes.bool,
    space: propTypes.number,
    value: propTypes.oneOfType([propTypes.bool, propTypes.string, propTypes.number]),
    visible: propTypes.bool
  };
}

export { Dropdown, DropdownGroup, DropdownHead, DropdownItem };
