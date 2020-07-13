import '@writ/scss/components/switch.scss';
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from '@writ/utils/noop';
import { CSSToggle } from '../Common/CSSToggle';
export const Outer = props => {
    const { checked, disabled, off, on, onChange, } = props;
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
};

Outer.defaultProps = {
    checked: false,
    disabled: false,
    onChange: noop,
    off: '',
    on: '',
};
if (window.DEV) {
    Outer.propTypes = {
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        off: PropTypes.any,
        on: PropTypes.any,
    };
}