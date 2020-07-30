import { g as _objectWithoutProperties, h as _objectSpread2 } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';

var Icon = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var type = props.type,
      size = props.size,
      className = props.className,
      children = props.children,
      color = props.color,
      style = props.style,
      rest = _objectWithoutProperties(props, ["type", "size", "className", "children", "color", "style"]);

  var typeIsString = typeof type === 'string';
  return /*#__PURE__*/React__default.createElement('i', _objectSpread2(_objectSpread2({}, rest), {}, {
    ref: ref,
    className: classnames(CSSUtil.icon, typeIsString ? CSSUtil.join(CSSUtil.icon, type) : void 0, CSSUtil.join(CSSUtil.icon, size), className),
    style: Object.assign({
      color: color
    }, style)
  }), typeIsString ? null : type);
});
Icon.defaultProps = {
  className: void 0,
  color: void 0,
  size: '1x',
  type: 'form'
};

if (window.DEV) {
  Icon.propTypes = {
    className: propTypes.string,
    color: propTypes.string,
    size: propTypes.oneOf(['lg', '1x', '2x', '3x', '4x', '5x']),
    type: propTypes.oneOfType([propTypes.string, propTypes.node]).isRequired,
    style: propTypes.object
  };
}

export { Icon };
