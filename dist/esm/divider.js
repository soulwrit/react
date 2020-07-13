import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';

var Divider = function Divider(props) {
  var className = props.className,
      children = props.children,
      style = props.style,
      text = props.text,
      dref = props.dref,
      type = props.type,
      color = props.color,
      width = props.width;
  return /*#__PURE__*/React__default.createElement('span', {
    className: classnames(CSSUtil.divider, className),
    children: text || children ? /*#__PURE__*/React__default.createElement('span', {
      className: 'text'
    }, text || children) : null,
    ref: dref,
    style: Object.assign({
      borderLeftStyle: type,
      borderLeftColor: color,
      borderLeftWidth: width
    }, style)
  });
};

Divider.defaultProps = {
  type: 'solid' // 线的样式，此样式同 border-style  

};

if (window.DEV) {
  Divider.propTypes = {
    type: propTypes.oneOf(['solid', 'dashed', 'dotted', 'double', 'groove', 'hidden', 'outset', 'ridge']),
    text: propTypes.any,
    color: propTypes.string,
    width: propTypes.oneOfType([propTypes.string, propTypes.number])
  };
}

export { Divider };
