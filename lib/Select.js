import '@writ/scss/components/select.scss';
import React, { useState, useEffect } from 'react';
import noop from '@writ/utils/noop';
import createHash from '@writ/utils/hash-creator';
import hasOwn from '@writ/utils/object-has-own';
import { Wrapper } from './Select/Wrapper';
import { Optgroup } from './Select/Optgroup';
import { Option } from './Select/Option';
/**
 * 没有实现原生 select 的两个快捷键行为: 按shift连选 按ctrl点选
 * @param {object} props 
 * @param {function} props.calc 定位计算器
 * @param {ReactNode} props.children 子元素
 * @param {string} props.className 类名
 * @param {...any} props.footer 底部
 * @param {object} props.model 用于表单抓取数据
 * @param {boolean} props.multiple 是否多选
 * @param {function} props.onChange 选中选项时执行的函数
 * @param {...string} props.placeholder 没有选中项时展示的占位
 * @param {function} props.render 用于渲染每个选中项
 * @param {string} props.size 内间距
 * @param {object} props.style 样式
 * @param {string} props.theme 外观状态
 * @param {array} props.value 选中值
 */
export const Select = props => {
    const [inited, setInited] = useState(0);
    const [appKey, setAppKey] = useState(createHash(24));

    useEffect(() => {
        !inited && setInited(1);
    }, []);
    
    if (hasOwn(props, 'multiple')) {
        const { multiple } = props;
        useEffect(() => {
            inited && setAppKey(createHash(32));
        }, [multiple]);
    }

    return React.createElement(Wrapper, Object.assign({}, props, {
        key: appKey
    }));
}
Select.Option = Option;
Select.Optgroup = Optgroup;
Select.defaultProps = {
    container: document.body,
    onChange: noop,
    placeholder: '请选择',
    size: 'md',
    theme: 'muted',
    inb: true
};
if (window.DEV) {
    const valueType = PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]);
    Select.propTypes = {
        arrow: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        calc: PropTypes.func,
        defaultValue: valueType,
        disabled: PropTypes.bool,
        footer: PropTypes.any,
        inb: PropTypes.bool,
        model: PropTypes.instanceOf(Model),
        multiple: PropTypes.bool,
        neck: PropTypes.any,
        onClose: PropTypes.func,
        onOpen: PropTypes.func,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        render: PropTypes.func,
        size: PropTypes.oneOf(MQ_Breakpoints),
        theme: PropTypes.oneOf(theme),
        value: valueType,
        visible: PropTypes.bool
    };
}