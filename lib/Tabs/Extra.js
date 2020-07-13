import React from 'react'; 
import classnames from 'classnames';
export const Extra = React.forwardRef((props, ref) => {
    const { className, children, style } = props;

    return React.createElement('div', {
        className: classnames('extra', className), 
        ref,
        style,
    }, children);
}); 