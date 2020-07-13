import '@writ/scss/components/button.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MQ_Breakpoints, theme, CSSUtil } from '../dependency';
export { Button };

const Button = props => {
   const { className, size, theme, children, value, link, dref, onClick } = props;
   const cName = link ? [CSSUtil.button, 'link', className] : [CSSUtil.button, size, theme, className];

   return React.createElement('button', {
      className: classnames(cName),
      children: value ? value : (children || null),
      ref: dref,
      onClick: onClick
   });
};

Button.defaultProps = {
   size: 'md',
   theme: 'primary',
};
if (window.DEV) {
   Button.propTypes = {
      className: PropTypes.string,
      size: PropTypes.oneOf(MQ_Breakpoints),
      theme: PropTypes.oneOf(theme),
      link: PropTypes.bool
   };
}