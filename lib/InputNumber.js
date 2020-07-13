import '@writ/scss/components/inputNumber.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isNumeric from '@writ/utils/is-numeric';
import noop from '@writ/utils/noop';
// import raf from '@writ/utils/raf';
import { MQ_Breakpoints } from '../dependency';
import { formatNumber, getDot, isDot, getDotIndex, isMinusSign, fixDotStart, fixMinusDotStart } from './InputNumber/utils';

export class InputNumber extends React.PureComponent {
    constructor(props) {
        super();
        const initialValue = props.value || props.min;
        this.state = {
            numeric: initialValue
        };
        // 合法数字结束下标
        this.index = 0;
        // input DOM 引用
        this.input = null;
        this.dotIndex = -1;
    }
    saveRef = elem => this.input = elem;
    format(numeric) {
        const { formatter } = this.props;
        switch (typeof formatter) {
            case 'string': return formatNumber(numeric, formatter);
            case 'function': return formatter(numeric);
            default: break;
        }
        // {}
    }
    setNumeric = (numeric) => {
        const { filter, max, min, onChange, strict } = this.props;

        if (strict) {
            if (numeric < min) {
                numeric = min;
            }

            if (numeric > max) {
                numeric = max;
            }
        }

        // 过滤器
        const filtered = filter(numeric)
        if (isNumeric(filtered)) {
            numeric = filtered;
        }

        // 格式器
        const formatted = this.format(numeric);


        this.setState({ numeric }, () => {
            this.input.value = this.state.numeric; // 设置光标到末尾
            onChange(this.state.numeric, formatted);
            // raf(() => {
            // });
        });
    }
    setStep(isUp) {
        let numeric = isNumeric(this.state.numeric) ? this.state.numeric : 0;
        let precision = this.props.precision;
        let step = this.props.step;
        const strNum = numeric.toString().trim();
        const dotIndex = getDotIndex(strNum);

        if (step != null) {
            step = isUp ? step : -step;
        }

        if (isMinusSign(numeric)) {
            numeric = -0;
        }

        if (dotIndex === -1) {
            // int 类型 整数位进行计算
            if (step == null) {
                step = isUp ? 1 : -1;
            }
            numeric = Number.parseInt(numeric) + step;
            numeric = precision ? numeric.toFixed(precision) : numeric;

            return this.setNumeric(numeric);
        }
        // float 类型 小数末位进行计算
        // 精度不存在时，把用户输入的小数位当作精度
        precision = precision ? precision : strNum.substring(dotIndex + 1).length;
        if (step == null) {
            step = isUp ? Math.pow(10, -precision) : -Math.pow(10, -precision);
        }

        numeric = (Number.parseFloat(numeric) + step).toFixed(precision);
        this.setNumeric(numeric);
    }

    // this.dotIndex = strNum.indexOf(dot);
    // if (this.dotIndex === -1) {
    //     this.dotCount = 0;
    // }
    // for (this.index = value.length - 1; this.index >= 0; this.index--) {
    //     const currChar = strNum.charAt(this.index);
    //     // 负号
    //     if (this.index === 0 && isMinusSign(currChar)) {
    //         break;
    //     }
    //     // 数字
    //     if (isNumeric(currChar)) {
    //         break;
    //     }
    //     // 小数点
    //     if (isDot(currChar)) {
    //         if (this.dotCount === 0) {
    //             this.dotCount = 1;
    //             numeric = strNum.replace(currChar, getDot(currChar));
    //             break;
    //         }
    //         if (this.dotIndex === this.index) {
    //             break;
    //         }
    //     }

    //     numeric = strNum.substr(0, this.index);
    // }
    onInput = e => {
        const input = e.target;
        const value = input.value;
        const strNum = value.toString();
        const length = strNum.length;
        let numeric = strNum.split('');

        for (let i = 0, dotIndex = -1; i < length; i++) {
            const currChar = strNum.charAt(i);

            // 负号
            if (i === 0 && isMinusSign(currChar)) {
                continue;
            }
            // 数字
            if (isNumeric(currChar)) {
                continue;
            }

            // 小数点
            if (dotIndex === -1 && isDot(currChar)) {
                dotIndex = i;
                numeric[i] = getDot(currChar);
                continue;
            }

            numeric[i] = '';
        }

        numeric = numeric.join('');

        if (this.props.fixDot) {
            numeric = fixDotStart(numeric);
        }

        if (this.props.fixMinusDot) {
            numeric = fixMinusDotStart(numeric);
        }

        if (this.props.onInput(e, this.setNumeric)) {
            return;
        }

        this.setNumeric(numeric);
    }
    onKeyDown = e => {
        switch (e.keyCode) {
            case 40:
                // 向下
                this.setStep(false);
                break;
            case 38:
                // 向上
                this.setStep(true);
                break;

            default: break;
        }
        this.props.onKeyDown(e);
    }
    onUpStep = () => {
        if (!this.input) {
            return;
        }

        this.setStep(true);
    }
    onDownStep = () => {
        if (!this.input) {
            return;
        }

        this.setStep(false);
    }
    render() {
        const { decrease, disabled, increase, inb, isVertical, max, min, size } = this.props;
        const { numeric } = this.state;
        const upButtonIsDisabled = disabled || numeric >= max;
        const downButtonIsDisabled = disabled || numeric <= min;

        return React.createElement('div', {
            className: classnames('iptn', { inb, disabled, vertical: isVertical })
        }, decrease ? React.createElement('span', {
            className: classnames('decrease', size, {
                disabled: downButtonIsDisabled
            }),
            onClick: downButtonIsDisabled ? null : this.onDownStep
        }, decrease) : null, React.createElement('div', {
            className: 'enter',
        }, React.createElement('input', {
            autoComplete: 'off',
            className: size,
            defaultValue: numeric,
            disabled,
            max,
            min,
            onKeyDown: this.onKeyDown,
            onInput: this.onInput,
            ref: this.saveRef,
        })), increase ? React.createElement('span', {
            className: classnames('increase', size, {
                disabled: upButtonIsDisabled
            }),
            onClick: upButtonIsDisabled ? null : this.onUpStep
        }, increase) : null);
    }
}

InputNumber.defaultProps = {
    decrease: '-',
    disabled: false,
    filter: noop,
    fixDot: true,
    fixMinusDot: true,
    formatter: void 0,
    inb: true,
    isVertical: false,
    increase: '+',
    max: Infinity,
    min: -Infinity,
    onChange: noop,
    onKeyDown: noop,
    onInput: noop,
    precision: 0,
    size: 'xs',
    step: void 0,
    strict: true
};
if (window.DEV) {
    InputNumber.propTypes = {
        decrease: PropTypes.any, // 递减按钮的文本
        disabled: PropTypes.bool, // 是否禁用
        filter: PropTypes.func, // 自定义值过滤器,将在 state 更新之前执行
        fixDot: PropTypes.bool, //当输入 . 时，是否转换为 `0.`
        fixMinusDot: PropTypes.bool, // 当输入 `-.`时，是否转为 `-0.`;
        formatter: PropTypes.oneOfType([PropTypes.string, PropTypes.func]), // 按照执行格式展示输入内容
        inb: PropTypes.bool, // 设置组件的 display 属性为 inline-block
        increase: PropTypes.any, // 递加按钮的文本
        isVertical: PropTypes.bool, // 垂直布局
        max: PropTypes.number, // 输入数字的上限
        min: PropTypes.number, // 输入数字的下限
        onChange: PropTypes.func, //输入有效值时执行的函数
        onKeyDown: PropTypes.func, // input 发生 onKeyDown 事件时执行的函数
        onInput: PropTypes.func, // input 发生 onInput 事件时执行的函数
        precision: PropTypes.number, // 输入小数时保留的有效数字的个数
        size: PropTypes.oneOf(MQ_Breakpoints), // 组件的内边距
        // 递减或递加的步进值, 默认自动检测，
        // 当为整数类型时，step为(+-)1，
        // 当为浮点数时，step由用户输入的小数位决定, 例如 输入 0.9 则步进值为 0.1, 输入 1.09 步进值为 0.01
        step: PropTypes.number,
        // 是否将输入值严格限制在集合 [min, max] 的范围内
        strict: PropTypes.number,
    };
}