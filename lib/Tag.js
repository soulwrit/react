import '@writ/scss/components/tag.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { theme, CSSUtil, MQ_Breakpoints } from '../dependency';
export const Tag = React.forwardRef(function tag(props, ref) {
   const { className, children, theme, value, size, icon, onClose, visible, inb, invert, ...rest } = props;

   return React.createElement('span', {
      className: classnames(
         CSSUtil.tag,
         size,
         theme,
         { inb, invert, non: !visible },
         className,
      ),
      ref,
      ...rest,
   }, value ? value : children,
      onClose ? React.createElement('big', {
         [typeof icon != 'string' ? 'children' : 'dangerouslySetInnerHTML']:
            typeof icon != 'string' ? icon : { __html: icon },
         onClick: onClose,
      }) : null);
});

Tag.defaultProps = {
   size: 'xs',
   theme: 'primary',
   icon: '&times;',
   visible: true,
   inb: false,
   invert: false
}
if (window.DEV) {
   Tag.propTypes = {
      icon: PropTypes.any,
      onClose: PropTypes.func,
      size: PropTypes.oneOf(['x1', 'x2', ...MQ_Breakpoints]),
      theme: PropTypes.oneOf(theme),
      visible: PropTypes.bool,
      inb: PropTypes.bool,
      invert: PropTypes.bool,
   }
}