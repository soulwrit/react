import React from 'react';

const getType = multiple => multiple === true ? 'textarea' : 'input';
export const NativeInput = React.forwardRef(({ multiple, value, ...rest }, ref) => {
    return React.createElement(getType(multiple), {
        ...rest,
        ref,
        defaultValue: value
    });
})