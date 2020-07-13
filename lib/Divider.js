import '@writ/scss/components/divider.scss';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { CSSUtil } from '../dependency';
export { Divider };

// 微标风格线
const Divider = props => {
   const { className, children, style, text, dref, type, color, width } = props;

   return React.createElement('span', {
      className: classnames(CSSUtil.divider, className),
      children: text || children ? React.createElement('span', { className: 'text' }, text || children) : null,
      ref: dref,
      style: Object.assign({
         borderLeftStyle: type,
         borderLeftColor: color,
         borderLeftWidth: width
      }, style),
   });
}

Divider.defaultProps = {
   type: 'solid',// 线的样式，此样式同 border-style  
};
if (window.DEV) {
   Divider.propTypes = {
      type: PropTypes.oneOf(['solid', 'dashed', 'dotted', 'double', 'groove', 'hidden', 'outset', 'ridge']),
      text: PropTypes.any,
      color: PropTypes.string,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
   };
}