import React from 'react'

export const BackTop = React.forwardRef((props, ref) => {
    const { children } = props;

    return React.createElement('span', {
        className: 'backtop',
        ref
    }, React.createElement('span', {
        className: 'arrow',
    }), React.createElement('span', {
        className: 'value',
    }, children));
});