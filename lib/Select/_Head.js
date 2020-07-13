import React, { useContext } from 'react';
import classnames from 'classnames';
import { CSSUtil } from '../../dependency';
import { Context } from './Context';
export const Head = React.forwardRef((props, ref) => {
    const { arrow, className, close, open, render, style } = props;
    const { values, theme, multiple, disabled, size, inb, placeholder, visible } = useContext(Context); 
    
    return React.createElement('div',
        {
            className: classnames(CSSUtil.select, {
                [theme]: !disabled,
                disabled,
                inb
            }, className),
            ref,
            onClick: visible || disabled ? null : open,
            style
        },
        React.createElement('div',
            {
                className: classnames('hd', size),
            },
            React.createElement('div',
                {
                    className: classnames('tit', {
                        single: !multiple
                    })
                },
                values.length === 0 ? placeholder : values.map((option, key) => {
                    return render ? render(option, close, open) : React.createElement(
                        React.Fragment,
                        { key },
                        typeof option === 'object' ? option.label : option
                    );
                }),
            ),
            arrow
                ? typeof arrow === 'function'
                    ? arrow(visible)
                    : arrow
                : React.createElement('span', {
                    className: classnames('arrow', { flip: visible }),
                })
        )
    );
});
