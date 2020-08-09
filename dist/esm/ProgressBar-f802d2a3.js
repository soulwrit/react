import { g as _objectWithoutProperties, h as _objectSpread2 } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';

var ProgressBar = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var className = props.className,
      format = props.format,
      height = props.height,
      inline = props.inline,
      traceStyle = props.traceStyle,
      status = props.status,
      stripe = props.stripe,
      trackStyle = props.trackStyle,
      value = props.value,
      valueStyle = props.valueStyle,
      rest = _objectWithoutProperties(props, ["className", "format", "height", "inline", "traceStyle", "status", "stripe", "trackStyle", "value", "valueStyle"]);

  return /*#__PURE__*/React__default.createElement('div', _objectSpread2({
    className: classnames(CSSUtil.progressBar, className),
    children: [/*#__PURE__*/React__default.createElement('div', {
      children: /*#__PURE__*/React__default.createElement('div', {
        className: 'inner',
        style: Object.assign({
          width: format(value)
        }, traceStyle)
      }),
      className: classnames('outer', status, {
        stripe: stripe,
        inb: inline
      }),
      key: 0,
      style: Object.assign({
        height: height
      }, trackStyle)
    }), props.showInfo ? /*#__PURE__*/React__default.createElement('div', {
      key: 1,
      children: format(value),
      className: classnames('info', {
        inb: inline
      }),
      style: valueStyle
    }) : null],
    ref: ref
  }, rest));
});
ProgressBar.defaultProps = {
  value: 0,
  format: function format(value) {
    return value + '%';
  },
  status: 'normal',
  inline: false
};

if (window.DEV) {
  ProgressBar.propTypes = {
    value: propTypes.number.isRequired,
    format: propTypes.func,
    inline: propTypes.bool,
    stripe: propTypes.bool,
    status: propTypes.oneOf(['success', 'failed', 'normal']),
    traceStyle: propTypes.object,
    trackStyle: propTypes.object,
    valueStyle: propTypes.object,
    showInfo: propTypes.bool
  };
}

export { ProgressBar as P };
