import '@writ/scss/components/switch.scss';
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from '@writ/utils/noop';
import { CSSToggle } from './Common/CSSToggle';
import { MQ_Breakpoints } from '../dependency';
export const Switch = React.forwardRef((props, ref) => {
    const { checked, disabled, off, on, onChange, outer, size } = props;
    const innerRef = useRef();
    const prior = useRef(checked);
    const [isChecked, setIsChecked] = useState(checked);
    const onChangeWrapper = e => {
        e.stopPropagation();
        setIsChecked(!isChecked);
        onChange(checked);
    };
    useEffect(() => {
        if (disabled) return;
        if (prior.current !== checked) {
            prior.current = checked;
            setIsChecked(checked);
            onChange(checked);
        }
    }, [checked, disabled]);

    if (outer) {
        return React.createElement(CSSToggle, {
            active: 'checked',
            offset: 'unchecked',
            onRef: () => innerRef.current,
            visible: isChecked
        }, React.createElement('span',
            {
                className: classnames(
                    'switch outer',
                    isChecked ? 'checked' : 'unchecked',
                    { disabled }
                ),
                onClick: disabled ? null : onChangeWrapper,
                ref: innerRef
            }, on ? React.createElement('span', {
                className: 'truly',
            }, on) : null, React.createElement('span', {
                className: 'hold',
            }), off ? React.createElement('span', {
                className: 'false',
            }, off) : null
        ));
    }

    return React.createElement('span',
        {
            className: 'switch inner',
            ref,
        },
        React.createElement(CSSToggle, {
            active: 'checked',
            offset: 'unchecked',
            onRef: () => innerRef.current,
            visible: isChecked
        }, React.createElement('span',
            {
                className: classnames(
                    'inner',
                    isChecked ? 'checked' : 'unchecked', {
                    disabled
                }),
                onClick: disabled ? null : onChangeWrapper,
                ref: innerRef
            }, React.createElement('span', {
                className: classnames('truly', size),
            }, on), React.createElement('span', {
                className: classnames('hold', size),
            }), React.createElement('span', {
                className: classnames('false', size),
            }, off)
        )));
});

Switch.defaultProps = {
    checked: false,
    disabled: false,
    outer: false,
    onChange: noop,
    off: '',
    on: '',
    size: 'xs'
};
if (window.DEV) {
    Switch.propTypes = {
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        outer: PropTypes.bool,
        onChange: PropTypes.func,
        off: PropTypes.any,
        on: PropTypes.any,
        size: PropTypes.oneOf(MQ_Breakpoints)
    };
}