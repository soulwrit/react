import '@writ/scss/components/icon.scss';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { CSSUtil } from '../dependency';
export { Icon };

const Icon = React.forwardRef((props, ref) => {
   const { type, size, className, children, color, style, ...rest } = props;
   const typeIsString = typeof type === 'string'; 

   return React.createElement('i', {
      ...rest,
      ref,
      className: classnames(
         CSSUtil.icon,
         typeIsString ? CSSUtil.join(CSSUtil.icon, type) : void 0,
         CSSUtil.join(CSSUtil.icon, size),
         className,
      ),
      style: Object.assign({ color }, style)
   }, typeIsString ? null : type);
});

Icon.defaultProps = {
   className: void 0,
   color: void 0,
   size: '1x',
   type: 'form',
};

if (window.DEV) {
   Icon.propTypes = {
      className: PropTypes.string,
      color: PropTypes.string,
      size: PropTypes.oneOf(['lg', '1x', '2x', '3x', '4x', '5x']),
      type: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      style: PropTypes.object
   };
}