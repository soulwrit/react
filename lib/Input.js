import '@writ/scss/components/input.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './Input/Wrapper';
export { Input, Textarea };

const Input = props => {
   return React.createElement(Wrapper, Object.assign({}, props, {
      multiple: false,
   }));
};
const Textarea = props => {
   return React.createElement(Wrapper, Object.assign({}, props, {
      multiple: true,
   }));
};

Input.Textarea = Textarea;
Input.defaultProps = {
   type: 'text'
}
if (window.DEV) {
   Input.propTypes = {
      type: PropTypes.string,
      resize: PropTypes.string
   };
}