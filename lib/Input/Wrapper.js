import '@writ/scss/components/input.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from '@writ/utils/noop';
import hasOwn from '@writ/utils/object-has-own';

import { MQ_Breakpoints, theme, CSSUtil } from '../../dependency';
import { Model, watchModel, updateModel } from '../Form/Model';
import { CssFloat } from '../Common/CssFloat';
import { NativeInput } from './Native';
import { rmPwdValue } from './rmPwdValue';

export class Wrapper extends React.Component {
    static getDerivedStateFromProps(nextProps, nextState) {
        if (!hasOwn(nextProps, 'value')) {
            return nextState;
        }
        const propsValue = nextProps.value;
        if (propsValue == null) {
            return nextState;
        }

        return {
            value: propsValue
        };
    }
    constructor(props) {
        super();
        const { model, value } = props;
        const prior = model ? model.value : value;

        this.state = {
            value: prior || ''
        };
        this.input = null;
        watchModel(model, this.setValue, prior);
    }
    componentDidMount() {
        this.onRef();
    }
    componentDidUpdate(props) {
        if (props.model !== this.props.model) {
            watchModel(this.props.model, this.setValue, this.state.value);
        }
    }
    saveRef = ele => this.input = ele
    setValue = value => { 
        this.setState({ value, }, () => {
            rmPwdValue(this.props.type, this.input);
            this.input.focus();
            this.props.onChange(value);
        });
    }
    onRef() {
        const onRef = this.props.onRef;
        if (onRef) {
            onRef(this.input);
        }
    }
    onChange = e => {
        const value = e.target.value;
        if (updateModel(this.props.model, value)) {
            return;
        }
        this.setValue(value);
    }
    onBlur = e => {
        const onBlur = this.props.onBlur;

        rmPwdValue(this.props.type, this.input);
        if (onBlur) {
            onBlur(e);
        }
    }
    onFocus = e => {
        const onFocus = this.props.onFocus;

        if (onFocus) {
            onFocus(e);
        }
    }
    onKeyDown = e => {
        const { onKeyDown, onEnter } = this.props;

        if (e.keyCode === 13 && onEnter) {
            if (onEnter(e)) return;
        }

        if (onKeyDown) {
            onKeyDown(e);
        }
    }
    onReset = () => {
        if (updateModel(this.props.model, '')) {
            return;
        }
        this.setValue('');
    }
    render() {
        const {
            className,
            inf, multiple,
            placeholder, prefix, resize,
            style, size, suffix, theme, model, width, wrapper,
            ...rest
        } = this.props;
        const value = this.state.value;
        const styled = Object.assign({ width }, style);
        const isPureInput = !prefix && !suffix;
        const inputProps = Object.assign({}, rest, {
            onChange: this.onChange,
            onKeyDown: this.onKeyDown,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            placeholder: model && model.placeholder || placeholder,
            ref: this.saveRef,
            multiple,
            value,
        });

        if (isPureInput) {
            inputProps.className = classNames(CSSUtil.input, size, theme, className);
            inputProps.style = styled;
            return React.createElement(NativeInput, inputProps);
        }
        inputProps.className = size;
        inputProps.style = Object.assign({ resize }, inputProps.style);
        const length = value.length;
        const prefixElement = typeof prefix === 'function' ? prefix({
            reset: this.onReset,
            setValue: this.setValue,
            className: size,
            length,
        }) : React.createElement(CssFloat, { className: size }, prefix);
        const suffixElement = typeof suffix === 'function' ? suffix({
            reset: this.onReset,
            setValue: this.setValue,
            className: size,
            length,
        }) : React.createElement(CssFloat, { className: size }, suffix);

        return React.createElement(wrapper,
            {
                className: classNames(CSSUtil.input, theme, { inf, }, className),
                style: styled,
            },
            prefixElement,
            React.createElement(CssFloat, null, React.createElement(NativeInput, inputProps)),
            suffixElement
        );
    }
}

Wrapper.defaultProps = {
    onChange: noop,
    size: 'md',
    theme: 'muted',
    width: '100%',
    wrapper: 'span',
    placeholder: 'Enter to here',
    inf: true
};

if (window.DEV) {
    Wrapper.propTypes = {
        model: PropTypes.instanceOf(Model),
        multiple: PropTypes.bool,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onEnter: PropTypes.func,
        onFocus: PropTypes.func,
        onKeyDown: PropTypes.func,
        onRef: PropTypes.func,
        prefix: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),
        size: PropTypes.oneOf(MQ_Breakpoints),
        suffix: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),
        theme: PropTypes.oneOf(theme),
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };
}