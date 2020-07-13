import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
export const Item = React.forwardRef((props, ref) => {
    const { children, className, style } = props;
    return React.createElement('div', {
        className: classnames('i', className),
        ref,
        style,
    }, children);
});

if (window.DEV) {
    Item.propTypes = {
        index: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };
}