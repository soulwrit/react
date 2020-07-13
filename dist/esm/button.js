import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { M as MQ_Breakpoints, t as theme, C as CSSUtil } from './dependency-8ea69cb4.js';

var Button = function Button(props) {
  var className = props.className,
      size = props.size,
      theme = props.theme,
      children = props.children,
      value = props.value,
      link = props.link,
      dref = props.dref,
      onClick = props.onClick;
  var cName = link ? [CSSUtil.button, 'link', className] : [CSSUtil.button, size, theme, className];
  return /*#__PURE__*/React__default.createElement('button', {
    className: classnames(cName),
    children: value ? value : children || null,
    ref: dref,
    onClick: onClick
  });
};

Button.defaultProps = {
  size: 'md',
  theme: 'primary'
};

if (window.DEV) {
  Button.propTypes = {
    className: propTypes.string,
    size: propTypes.oneOf(MQ_Breakpoints),
    theme: propTypes.oneOf(theme),
    link: propTypes.bool
  };
}

export { Button };
