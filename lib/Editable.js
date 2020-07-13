import '@writ/scss/components/editable.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { theme, MQ_Breakpoints, CSSUtil } from '../dependency';

export class Editable extends React.Component {
    constructor(props) {
        super(props);

        this.element = null;
        this.compositionEnd = true;
        this.value = props.value;
        this.state = {
            show: this.isEmpty()
        };
    }
    componentDidMount() {
        this.props.onRef && this.props.onRef(this.element);
    }
    editabled() {
        return this.props.disabled === false && this.props.readonly === false;
    }
    isEmpty() {
        return typeof this.value === 'undefined' || this.value === '' || /^\<br\>$/.test(this.value);
    }
    onCompositionStart = () => {
        this.setState({
            show: false
        });
        this.compositionEnd = false;
    }
    onCompositionEnd = () => {
        this.compositionEnd = true;
    }
    onBlur = e => {
        this.setState({
            show: this.isEmpty()
        });
        this.props.onBlur && this.props.onBlur(e);
    }
    onFocus = e => {
        this.props.onFocus && this.props.onFocus(e);
        this.element.focus();
    }
    onInput = e => {
        this.value = this.element.innerHTML;
        const isEmpty = this.isEmpty();
        if (this.state.show === true || isEmpty) {
            this.setState({
                show: isEmpty
            });
        }
        e.target.value = this.value;
        this.props.onInput && this.props.onInput(e);
    }
    onKeyUp = e => {
        if (!this.compositionEnd) {
            return;
        }
        this.value = this.element.innerHTML;
        this.props.onKeyUp && this.props.onKeyUp(e);
        this.props.onChange && this.props.onChange({
            event: e,
            value: this.value,
        });
    }
    render() {
        const { props } = this;

        return React.createElement('div', {
            className: classnames(CSSUtil.editable, props.className),
            children: [
                React.createElement('div', {
                    key: 0,
                    className: classnames('i', props.theme, props.size),
                    contentEditable: this.editabled(),
                    onCompositionStart: this.onCompositionStart,
                    onCompositionEnd: this.onCompositionEnd,
                    onBlur: this.onBlur,
                    onFocus: this.onFocus,
                    onInput: this.onInput,
                    onKeyUp: this.onKeyUp,
                    onKeyDown: props.onKeyDown,
                    ref: ele => this.element = ele,
                }),
                this.state.show ? React.createElement('div', {
                    key: 1,
                    className: classnames('placeholder', props.size),
                    children: props.placeholder,
                    onClick: this.onFocus
                }) : null
            ],
            style: props.style
        })
    };
};

Editable.defaultProps = {
    disabled: false,
    maxLength: Infinity,
    minLength: 0,
    placeholder: '请在此输入',
    rafDelay: 100,
    readonly: false,
    size: 'md',
    theme: 'muted',
};

if (window.DEV) {
    Editable.propTypes = {
        disabled: PropTypes.bool,
        maxLength: PropTypes.number,
        minLength: PropTypes.number,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        onInput: PropTypes.func,
        onKeyUp: PropTypes.func,
        onKeyDown: PropTypes.func,
        placeholder: PropTypes.string,
        rafDelay: PropTypes.number,
        readonly: PropTypes.bool,
        size: PropTypes.oneOf(MQ_Breakpoints),
        theme: PropTypes.oneOf(theme),
        value: PropTypes.string,
        onRef: PropTypes.func
    };
} 