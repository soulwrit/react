import '@writ/scss/components/input.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from '@writ/utils/noop';
import hasOwn from '@writ/utils/object-has-own';

import { MQ_Breakpoints, theme, CSSUtil } from '../../dependency';
import { Model } from '../Form/Model';
import { CssFloat } from '../Common/CssFloat';
import { NativeInput } from './Native';

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
        let prior = value;

        if (model) {
            prior = model.value;
            model.dispatch = value => {
                this.setValue(value);
            };
        }
        this.state = {
            value: prior
        };
        this.prior = prior;
    }
    componentDidMount() {
        this.onRef();
    }
    componentDidUpdate() {
        const value = this.state.value;
        if (value != null && this.prior != value) {
            this.input.value = value;
            this.prior = value;
        }
    }
    saveRef = ele => this.input = ele
    rmPwdValue = () => {
        if (this.props.type === 'password') {
            var t = setTimeout(() => {
                clearTimeout(t);
                if (this.input.hasAttribute('value')) {
                    this.input.removeAttribute('value');
                }
            });
        }
    }
    setValue = value => {
        this.setState({ value, }, () => {
            this.input.focus();
            this.rmPwdValue();
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
        const { model, onChange } = this.props;

        if (model) {
            model.value = value;
        } else {
            this.setValue(value);
        }
        onChange(value);
    }
    onBlur = e => {
        var onBlur = this.props.onBlur;

        this.rmPwdValue();
        if (onBlur) {
            onBlur(e);
        }
    }
    onFocus = e => {
        var onFocus = this.props.onFocus;

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
        this.setValue('');
    }
    render() {
        const {
            className, multiple,
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
        const prefixElement = typeof prefix === 'function' ? prefix({
            reset: this.onReset,
            setValue: this.setValue,
            className: size
        }) : React.createElement(CssFloat, { className: size }, prefix);
        const suffixElement = typeof suffix === 'function' ? prefix({
            reset: this.onReset,
            setValue: this.setValue,
            className: size
        }) : React.createElement(CssFloat, { className: size }, suffix);

        return React.createElement(wrapper,
            {
                className: classNames(CSSUtil.input, theme, className),
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
        input: PropTypes.object
    };
}