import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
export function Item(props) {
    const { value, children, onClick, className, style, ...rest } = props;

    return React.createElement('div', {
        ...rest,
        className: classnames('i', className),
        onClick
    }, children ? children : value);
}

if (window.DEV) {
    Item.propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        onClick: PropTypes.func,
        value: PropTypes.any,
    };
}