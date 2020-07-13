import '@writ/scss/components/icon.scss';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { CSSUtil } from '../dependency';

const Icon = React.forwardRef((props, ref) => {
   const { type, size, className, ...rest } = props;

   return React.createElement('i', {
      ref,
      ...rest,
      className: classnames(
         CSSUtil.icon,
         CSSUtil.join(CSSUtil.icon, type),
         CSSUtil.join(CSSUtil.icon, size),
         className
      ),
   });
});

Icon.defaultProps = {
   size: '1x'
};

export { Icon };
if (window.DEV) {
   Icon.propTypes = {
      type: PropTypes.string.isRequired,
      size: PropTypes.oneOf(['lg', '1x', '2x', '3x', '4x', '5x'])
   };
}