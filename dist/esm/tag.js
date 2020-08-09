import { g as _objectWithoutProperties, h as _objectSpread2, c as _defineProperty, j as _toConsumableArray } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil, t as theme, M as MQ_Breakpoints } from './dependency-8ea69cb4.js';

var Tag = /*#__PURE__*/React__default.forwardRef(function tag(props, ref) {
  var _React$createElement;

  var className = props.className,
      children = props.children,
      theme = props.theme,
      value = props.value,
      size = props.size,
      icon = props.icon,
      onClose = props.onClose,
      visible = props.visible,
      inb = props.inb,
      invert = props.invert,
      rest = _objectWithoutProperties(props, ["className", "children", "theme", "value", "size", "icon", "onClose", "visible", "inb", "invert"]);

  return /*#__PURE__*/React__default.createElement('span', _objectSpread2({
    className: classnames(CSSUtil.tag, size, theme, {
      inb: inb,
      invert: invert,
      non: !visible
    }, className),
    ref: ref
  }, rest), value ? value : children, onClose ? /*#__PURE__*/React__default.createElement('big', (_React$createElement = {}, _defineProperty(_React$createElement, typeof icon != 'string' ? 'children' : 'dangerouslySetInnerHTML', typeof icon != 'string' ? icon : {
    __html: icon
  }), _defineProperty(_React$createElement, "onClick", onClose), _React$createElement)) : null);
});
Tag.defaultProps = {
  size: 'xs',
  theme: 'primary',
  icon: '&times;',
  visible: true,
  inb: false,
  invert: false
};

if (window.DEV) {
  Tag.propTypes = {
    icon: propTypes.any,
    onClose: propTypes.func,
    size: propTypes.oneOf(['x1', 'x2'].concat(_toConsumableArray(MQ_Breakpoints))),
    theme: propTypes.oneOf(theme),
    visible: propTypes.bool,
    inb: propTypes.bool,
    invert: propTypes.bool
  };
}

export { Tag };
