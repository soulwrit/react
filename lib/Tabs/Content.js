import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
export const Content = React.forwardRef((props, ref) => {
    const { children, className, style } = props;

    return React.createElement('div', {
        className: classnames('cnt', className),
        ref,
        style
    }, children);
});

if (window.DEV) {
    Content.propTypes = {
        className: PropTypes.string,
        children: PropTypes.any,
        style: PropTypes.object
    };
}