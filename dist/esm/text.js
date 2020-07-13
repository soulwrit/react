import { g as _objectWithoutProperties, h as _objectSpread2 } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil, t as theme } from './dependency-8ea69cb4.js';

var Text = /*#__PURE__*/React__default.forwardRef(function T(props, ref) {
  var theme = props.theme,
      children = props.children,
      className = props.className,
      type = props.type,
      value = props.value,
      size = props.size,
      ellipsis = props.ellipsis,
      substr = props.substr,
      rest = _objectWithoutProperties(props, ["theme", "children", "className", "type", "value", "size", "ellipsis", "substr"]);

  return /*#__PURE__*/React__default.createElement(type, _objectSpread2({
    className: classnames(CSSUtil.text, theme, className),
    children: value != null ? substr(value, size, ellipsis) : children,
    ref: ref
  }, rest));
});
Text.defaultProps = {
  size: 0,
  theme: 'muted',
  type: 'span',
  ellipsis: ' ...',
  substr: function substr(value, size, ellipsis) {
    return value.toString().length > size && size > 0 ? value.toString().substr(0, size) + ellipsis : value;
  }
};

if (window.DEV) {
  Text.propTypes = {
    ellipsis: propTypes.string,
    substr: propTypes.func,
    size: propTypes.number,
    theme: propTypes.oneOf(theme),
    type: propTypes.string.isRequired,
    value: propTypes.oneOfType([propTypes.number, propTypes.string, propTypes.bool])
  };
}

export { Text };
