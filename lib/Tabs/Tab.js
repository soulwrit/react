import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
export const Tab = React.forwardRef((props, ref) => {
    const { children, className, dataIndex, onClick, style, } = props;

    return React.createElement('div', {
        className: classnames('i', className),
        'data-index': dataIndex,
        onClick,
        style,
        ref,
    }, children);
});

if (window.DEV) {
    Tab.propTypes = {
        index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onClick: PropTypes.func,
        style: PropTypes.object, 
    };
}