import '@writ/scss/components/text.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { theme, CSSUtil } from '../dependency';
export const Text = React.forwardRef(function T(props, ref) {
   const { theme, children, className, type, value, size, ellipsis, substr, ...rest } = props;

   return React.createElement(type, {
      className: classnames(
         CSSUtil.text,
         theme,
         className
      ),
      children: value != null ? substr(value, size, ellipsis) : children,
      ref,
      ...rest,
   });
});
Text.defaultProps = {
   size: 0,
   theme: 'muted',
   type: 'span',
   ellipsis: ' ...',
   substr(value, size, ellipsis) {
      return value.toString().length > size && size > 0 ? (value.toString().substr(0, size) + ellipsis) : value;
   }
};
if (window.DEV) {
   Text.propTypes = {
      ellipsis: PropTypes.string,
      substr: PropTypes.func,
      size: PropTypes.number,
      theme: PropTypes.oneOf(theme),
      type: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
   };
}