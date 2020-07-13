import '../../scss/components/autoComplete.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import contains from '@writ/utils/dom-contains';

import { Input } from './Input';
import { Pager } from './Pager';
import { CSSUtil } from '../dependency';

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
export class AutoComplete extends React.PureComponent {
    constructor(props) {
        super();
        this.page = {
            NO: props.pageNo,
            size: props.pageSize
        };
        this.state = {
            value: props.value,
            total: props.values.length,
            values: this.limit(props.values),
            visible: false
        };
    }
    componentDidMount() {
        document.body.addEventListener('click', this.onOutsideClick, false);
    }
    componentWillUnmount() {
        document.body.removeEventListener('click', this.onOutsideClick);
    }
    assginRef = ele => { this.root = ele }
    limit(values) {
        return values.slice((this.page.NO - 1) * this.page.size, this.page.NO * this.page.size);
    }
    getData() {
        if (this.props.fetch) {
            this.props.fetch(this.page, (values, total) => {
                this.setState({ values, total });
            });
            return true;
        }
    }
    setData(value, visible) {
        this.page.value = value;
        if (this.getData(value)) {
            return this.setState({
                value,
                visible
            });
        };

        const { filter, values, valueKey } = this.props;
        const array = !!value ? values.filter(obj => filter(obj[valueKey], value)) : values;

        this.page.NO = 1;
        this.tmpValues = array;
        this.setState({
            total: array.length,
            values: this.limit(array),
            value,
            visible,
        });
    }
    onOutsideClick = e => {
        if (contains(this.root, e.target)) {
            return false;
        }
        this.setState({ visible: false });
    }
    onFocus = () => {
        this.setState({ visible: true });
    }
    onChange = value => {
        this.setData(value, true);
    }
    onClick = value => e => {
        e.stopPropagation();
        this.setData(value, false);
    }
    onPageChange = (no, size) => {
        this.page.NO = no;
        this.page.size = size;

        if (this.getData()) return;
        const values = this.tmpValues || this.props.values;

        this.setState({
            values: this.limit(values),
            total: values.length
        });
    }
    getItems() {
        const { props, state } = this;
        const items = [];

        if (state.visible) {
            if (state.total > 0) {
                state.values.forEach((obj, index) => {
                    items.push(
                        React.createElement('li', {
                            key: index,
                            children: props.render(obj[props.valueKey], state.value),
                            className: props.itemClassName,
                            onClick: this.onClick(obj[props.valueKey])
                        })
                    );
                });
                items.push(
                    React.createElement('li', {
                        key: state.total,
                        children: React.createElement(Pager, {
                            total: Math.ceil(state.total / this.page.size),
                            pageNo: this.page.NO,
                            pageSize: this.page.size,
                            onChange: this.onPageChange,
                        })
                    })
                );
            } else {
                items.push(
                    React.createElement('li', {
                        key: 0,
                        children: props.empty,
                        className: props.itemClassName,
                    })
                );
            }
        }

        return items;
    }
    render() {
        const { props, state } = this;

        return React.createElement('div', {
            className: classnames(CSSUtil.autoComplete, props.className),
            children: [
                React.createElement(Input, {
                    key: 0,
                    onChange: this.onChange,
                    onFocus: this.onFocus,
                    placeholder: props.placeholder,
                    value: state.value
                }),
                React.createElement('ul', {
                    key: 1,
                    style: { display: state.visible ? 'block' : 'none' },
                    children: this.getItems()
                })
            ],
            ref: this.assginRef
        });
    }
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