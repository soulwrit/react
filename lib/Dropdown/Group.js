import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
export function Group(props) {
   return React.createElement('div', {
      className: classnames('grp', props.className),
      style: props.style
   }, props.children);
}

Group.defaultProps = {}
if (window.DEV) {
   Group.propTypes = {
      children: PropTypes.any,
      className: PropTypes.string,
      style: PropTypes.object,
   };
}