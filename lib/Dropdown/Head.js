import React from 'react';
import PropTypes from 'prop-types';
// import assert from '@writ/utils/assert';
import hasOwn from '@writ/utils/object-has-own';
export const Head = React.forwardRef(function (props, ref) {
   const { children, hoverable, onClick, onMouseEnter, type, } = props;
   const nextProps = {
      onClick,
      onMouseEnter,
      ref,
   };

   try {
      React.Children.only(children);
      if (hoverable) {
         nextProps.onMouseEnter = e => {
            if (hasOwn(children.props, 'onMouseEnter')) {
               children.props.onMouseEnter(e);
            }
            onMouseEnter(e);
         };
      }
      return React.cloneElement(children, nextProps);
   } catch (error) {
      nextProps.className = 'wrapper';
      return React.createElement(type, nextProps, children);
   }
});
Head.defaultProps = {
   type: 'span',
};
if (window.DEV) {
   Head.propTypes = {
      onClick: PropTypes.func,
      onMouseEnter: PropTypes.func,
      type: PropTypes.string,
   };
} 