import { g as _objectWithoutProperties, h as _objectSpread2 } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';

var Icon = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var type = props.type,
      size = props.size,
      className = props.className,
      rest = _objectWithoutProperties(props, ["type", "size", "className"]);

  return /*#__PURE__*/React__default.createElement('i', _objectSpread2(_objectSpread2({
    ref: ref
  }, rest), {}, {
    className: classnames(CSSUtil.icon, CSSUtil.join(CSSUtil.icon, type), CSSUtil.join(CSSUtil.icon, size), className)
  }));
});
Icon.defaultProps = {
  size: '1x'
};

if (window.DEV) {
  Icon.propTypes = {
    type: propTypes.string.isRequired,
    size: propTypes.oneOf(['lg', '1x', '2x', '3x', '4x', '5x'])
  };
}

export { Icon };
