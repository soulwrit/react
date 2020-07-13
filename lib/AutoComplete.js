import '@writ/scss/components/autoComplete.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import contains from '@writ/utils/dom-contains';

import { Input } from './Input';
import { Pager } from './Pager';
import { Dropdown, DropdownItem, DropdownHead } from './Dropdown';
import { CSSUtil } from '../dependency';
export { AutoComplete };

/**
 * @example 
 * <AutoComplete
 *  values={[
 *      { value: 289831 },
 *      { value: 2232 },
 *      { value: 33442 },
 *      { value: 789866 },
 *      { value: 89777 },
 *  ]}
 * />
 */
const AutoComplete = props => {
    const { className, empty, fetch, filter, itemClassName, pageNo, pageSize, placeholder, render, valueKey } = props;
    const initialValues = props.values;
    const initialValue = props.value;
    let tmpValues;
    const [pageIndex, setPageIndex] = useState(pageNo);
    const [pageOffset, setPageOffset] = useState(pageSize);

    const limit = array => array.slice((pageIndex - 1) * pageOffset, pageIndex * pageOffset);
    const [total, setTotal] = useState(initialValues.length);
    const [values, setValues] = useState(limit(initialValues));
    const [value, setValue] = useState(initialValue);
    const [visible, setVisible] = useState(false);
    const items = [];

    const getData = () => {
        if (fetch) {
            fetch({ index: pageIndex, offset: pageOffset, value }, (values, total) => {
                setValues(values);
                setTotal(total);
            });
            return true;
        }
    };
    const setData = (value, visible) => {
        if (getData()) {
            setValue(value);
            setVisible(visible);
            return;
        };
        const array = !!value ? initialValues.filter(obj => filter(obj[valueKey], value)) : initialValues;

        setPageIndex(1);
        tmpValues = array;
        setValue(value);
        setVisible(visible);
        setTotal(array.length);
        setValues(limit(array));
    };
    const onVisible = () => {
        setVisible(true);
    };
    const onChange = value => {
        setData(value, true);
    }
    const onClick = value => () => {
        setData(value, false);
    };
    const onPageChange = (no, size) => {
        setPageIndex(no);
        setPageOffset(size);

        if (getData()) return;
        const array = tmpValues || initialValues;

        setTotal(array.length);
        setValues(limit(array));
    };

    if (visible) {
        if (total > 0) {
            values.forEach((obj, index) => {
                items.push(
                    React.createElement(DropdownItem, {
                        key: index,
                        children: render(obj[valueKey], value),
                        className: itemClassName,
                        onClick: onClick(obj[valueKey])
                    })
                );
            });
            items.push(
                React.createElement(DropdownItem, {
                    key: total,  
                    children: React.createElement(Pager, {
                        total: total,
                        pageNo: pageIndex,
                        pageSize: pageOffset,
                        onChange: onPageChange,
                    })
                })
            );
        } else {
            items.push(React.createElement(DropdownItem, {
                key: 0,
                children: empty,
                className: itemClassName,
            }));
        }
    }

    return React.createElement(Dropdown, {
        visible, hoverable: false, multiple: false
    }, React.createElement(DropdownHead, null, React.createElement('div', {
        className: classnames(CSSUtil.autoComplete, className),
    }, React.createElement(Input, {
        onChange: onChange,
        onClick: onVisible,
        placeholder: placeholder,
        value: value
    }))), items);
}

AutoComplete.defaultProps = {
    pageNo: 1,
    pageSize: 10,
    filter: (v0, v1) => v0 === v1 || (v0).toString().indexOf(v1) > -1,
    render: (v0, v1) => !!v1 ? React.createElement('span', {
        dangerouslySetInnerHTML: { __html: v0.toString().replace(v1, v1.toString().fontcolor('#007bff')) }
    }) : v0,
    valueKey: 'value',
    values: [],
    placeholder: '请在此输入',
    empty: '没有检索到相关信息 ... ...'
};

if (window.DEV) {
    AutoComplete.propTypes = {
        className: PropTypes.string,
        placeholder: PropTypes.string,

        pageNo: PropTypes.number,
        pageSize: PropTypes.number,
        fetch: PropTypes.func,

        filter: PropTypes.func.isRequired,
        render: PropTypes.func,
        valueKey: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.object).isRequired,
        empty: PropTypes.any
    };
}