import React, { useContext } from 'react';
import classnames from 'classnames';
import assert from '@writ/utils/assert';
// 自欺欺人，自我鼓励 。。。
import { Optgroup } from './Optgroup';
import { Option } from './Option';
import { Context } from './Context';
import { getZIndex } from '../Common/zIndex';
import { CSSUtil } from '../../dependency';
import { normalize, inValue } from './value';
export const Body = React.forwardRef(({ children, footer, neck, }, ref) => {
    const { coord, size, visible, values } = useContext(Context);

    return React.createElement('div',
        {
            className: classnames(CSSUtil.select, 'closed', {
                open: visible
            }),
            ref,
            style: Object.assign({ zIndex: getZIndex() }, coord)
        },
        neck ? React.createElement('div', {
            className: classnames('nk', size),
        }) : null,
        React.createElement('div',
            {
                className: 'bd',
            },
            React.Children.map(children, (child, index) => {
                assert.nuil(child, 'Invalid `Select` child element.');
                switch (child.type) {
                    case Option:
                        const { value, label } = normalize(child.props, index);
                        const isSelected = inValue(values, value);

                        return React.cloneElement(child, {
                            key: index,
                            label,
                            selected: isSelected,
                            value,
                        });
                    case Optgroup:
                        return React.cloneElement(child, {
                            key: index,
                            serial: index
                        });
                    default: assert.throw('Only `Optgroup` or `Option` can be used in `Select`.');
                        break;
                }
            }),
        ),
        footer ? React.createElement('div', {
            className: classnames('ft', size),
        }, footer) : null
    );
});