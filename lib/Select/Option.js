import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Context } from './Context';

/**
 * @desc 多选时，Option 非受控，状态由内部维护
 * @param {object} props 
 * @param {any} props.children 子元素
 * @param {string} props.className 添加给 `Option` 的类名
 * @param {boolean} props.disabled 是否禁用
 * @param {string} props.label 显示在选中框里的内容，只能是非引用类型
 * @param {function} props.render 当前子元素渲染函数
 * @param {boolean} props.selected 是否选中
 * @param {string} props.value 用于代表当前选项，当不提供时优先取 `text`，`text`不存在时取`children`
 */
export class Option extends React.PureComponent {
    static contextType = Context;
    constructor(props) {
        super();
        this.state = {
            selected: props.selected
        };
    }
    render() {
        const { children, className, disabled, label, render, selected, style, value } = this.props;
        const { multiple, onSelect } = this.context;
        const status = multiple ? this.state.selected : selected;

        return React.createElement('div',
            {
                className: classnames('i', className, {
                    disabled,
                    selected: status
                }),
                onClick: disabled ? null : e => {
                    const isChecked = !status; 
                    e.stopPropagation();
                    multiple && this.setState({
                        selected: isChecked
                    });
                    onSelect && onSelect(isChecked, {
                        label,
                        value,
                    });
                },
                style
            },
            render
                ? render(label, value, status)
                : children != null
                    ? children
                    : label
        );
    }
}
Option.defaultProps = {
    selected: false
}
if (window.DEV) {
    Option.propTypes = {
        children: PropTypes.any,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onSelect: PropTypes.func,
        render: PropTypes.func,
        selected: PropTypes.bool,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };
} 