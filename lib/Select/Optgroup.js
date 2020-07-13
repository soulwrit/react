import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import assert from '@writ/utils/assert';
import { Option } from './Option';
import { Context } from './Context';
import { inValue, normalize } from './value';

/**
 * 选项分组
 * @param {object} props 
 * @param {ReactNode} props.children 组内子元素，只能时 `Option`
 * @param {String} props.className 组的类名
 * @param {function} props.onSelect `Option`选中函数，这个函数将会传递给`Option`
 * @param {string} props.size 标题的间距
 * @param {object} props.style 分组的样式
 * @param {...any} props.title 分组的标题
 */
export const Optgroup = props => {
    const { children, className, style, serial, title } = props;
    const { size, values } = useContext(Context);

    return React.createElement('div',
        {
            className: classnames('grp', className),
            style
        },
        React.createElement('div',
            { className: classnames('tit', size) },
            title
        ),
        React.Children.map(children, (child, index) => {
            assert.nuil(child, 'Invalid `Optgroup` child element.');
            assert.truly(child.type === Option, 'Only `Option` can be used in `Optgroup`.');
            const { value, label } = normalize(child.props, serial + index);
            const isSelected = inValue(values, value);

            return React.cloneElement(child, {
                key: index,
                label,
                selected: isSelected,
                value,
            });
        })
    );
};

Optgroup.defaultProps = {
};
if (window.DEV) {
    Optgroup.propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        size: PropTypes.string,
        style: PropTypes.object,
        title: PropTypes.any,
    };
}