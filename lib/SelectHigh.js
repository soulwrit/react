import '@writ/scss/components/selectHigh.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import raf from '@writ/utils/raf';

import { PageTurn } from './PageTurn';
import { Tag } from './Tag';

import { Model } from './Form/Model';
import { CSSUtil, theme } from '../dependency'; 


export { SelectHigh };

/**
 * 高阶 select 组件
 * @example 
 * <SelectHigh
 *  values={[
 *      { value: 289831 },
 *      { value: 2232 },
 *      { value: 33442 },
 *      { value: 789866 },
 *      { value: 89777 },
 *  ]}
 * />
 */
class SelectHigh extends React.PureComponent {
    constructor(props) {
        super();
        this.page = {
            pageNo: props.pageNo,
            pageSize: props.pageSize,
            value: undefined
        };
        this.state = {
            total: props.values.length,
            values: this.limit(props.values),
            visiable: false,
            selected: []
        };
    }
    componentDidMount() {
        this.getData();
        document.body.addEventListener('click', this.onHidden, false);
    }
    componentWillUnmount() {
        document.body.removeEventListener('click', this.onHidden);
    }
    position() {
        const { element, container } = this;
        if (!element && !container) return;

        const eRect = element.getBoundingClientRect();
        const cRect = container.getBoundingClientRect();
        const style = container.style;
        const { offsetHeight, offsetWidth } = document.body;

        if (cRect.width < eRect.width) {
            style.minWidth = eRect.width;
        }

        if (cRect.left < 0) {
            style.left = 0 + 'px';
        }

        if (cRect.top < 0) {
            style.top = 0 + 'px';
        }

        if (cRect.right > offsetWidth) {
            style.right = 0 + 'px';
        }

        if (cRect.bottom > offsetHeight) {
            style.bottom = '100%';
        }
    }
    visiable(visiable) {
        this.setState({ visiable }, () => {
            if (visiable) {
                this.position();
                this.setInputFocus();
            }
        });
    }
    limit(values) {
        return values.slice(
            (this.page.pageNo - 1) * this.page.pageSize,
            this.page.pageNo * this.page.pageSize
        );
    }
    onHidden = (e) => {
        let ele = e.target;

        while (ele) {
            if (ele === this.element) {
                return;
            }
            ele = ele.parentElement;
        }

        this.visiable(false);
    }
    onPageChange = (pageNo, pageSize) => {
        this.page.pageNo = pageNo;
        this.page.pageSize = pageSize;
        if (this.getData()) return;

        const values = this.tmpValues || this.props.values;

        this.setState({
            total: values.length,
            values: this.limit(values),
        });
    }
    onFocus = () => {
        this.visiable(true);
    }
    onEnter = e => {
        const value = e.target.value;
        raf(() => {
            this.page.value = value;
            if (this.getData()) return;
            const { filter, values } = this.props;
            const array = !!value ? values.filter(obj => filter(this.getValue(obj), value)) : values;

            this.tmpValues = array;
            this.setState({
                total: array.length,
                values: this.limit(array)
            });
        });
    }
    onSelect = (obj, undo) => () => {
        this.setState({
            selected: undo
                ? this.state.selected.filter(v => v !== obj)
                : this.state.selected.concat(obj)
        }, () => {
            if (this.props.model) {
                this.props.model.value = this.props.onModel(this.state.selected);
            }
        });
    }
    setInputFocus = () => {
        if (this.input) this.input.focus();
    }
    getData() {
        if (this.props.fetch) {
            this.props.fetch(this.page, (values, total) => {
                this.setState({ total, values });
            });
            return true;
        }
    }
    getValue(obj) {
        return obj && typeof obj === 'object' ? obj[this.props.vKey] : obj;
    }
    render() {
        const { className, headClassName, bodyClassName, inputClassName, theme, size, holder, style, page, render } = this.props;
        const { visiable, values, selected } = this.state;

        return React.createElement('div', {
            className: classnames(CSSUtil.highSelect, theme, className),
            children: [
                React.createElement('div', {
                    key: 0,
                    className: classnames('hd', size, headClassName),
                    children: [
                        React.createElement('div', {
                            key: 0,
                            children: selected.length ? selected.map((value, index) => {
                                return React.createElement(Tag, {
                                    key: index,
                                    onClose: this.onSelect(value, true),
                                    size: this.props.tagSize,
                                    theme: this.props.tagTheme,
                                    value: this.getValue(value),
                                    inline: true,
                                    inb: true
                                });
                            }) : React.createElement('input', {
                                onKeyUp: this.onEnter,
                                onFocus: this.onFocus,
                                placeholder: this.props.model ? this.props.model.placeholder : this.props.placeholder,
                                ref: ele => this.input = ele,
                                value: this.state.value,
                            }),
                            className: 'fst'
                        }),
                        React.createElement('div', {
                            key: 1,
                            children: React.createElement('span', {
                                className: 'alt'
                            }),
                            className: 'lst',
                            onClick: this.onFocus
                        })
                    ],
                    onClick: this.setInputFocus
                }),
                visiable ? React.createElement('ul', {
                    key: 1,
                    className: classnames(theme, bodyClassName),
                    children: [
                        React.createElement('li', {
                            key: 'hd',
                            children: [
                                React.createElement('input', {
                                    key: 0,
                                    className: inputClassName,
                                    onKeyUp: this.onEnter,
                                    onFocus: this.onFocus,
                                    placeholder: this.props.model ? this.props.model.placeholder : this.props.placeholder,
                                    ref: ele => this.input = ele,
                                    value: this.state.value,
                                }),
                                React.createElement(PageTurn, {
                                    ...page,
                                    key: 1,
                                    onChange: this.onPageChange,
                                    pageNo: this.page.pageNo,
                                    pageSize: this.page.pageSize,
                                    total: this.state.total
                                })
                            ],
                            className: classnames('fst', size),
                        }),
                        values.length
                            ? values.map((obj, index) =>
                                React.createElement('li', {
                                    key: index,
                                    children: render(this.getValue(obj), this.page.value),
                                    className: classnames(size, CSSUtil.disable(selected.includes(obj))),
                                    onClick: this.onSelect(obj)
                                }))
                            : React.createElement('li', {
                                key: 0,
                                children: holder,
                                className: size,
                            }),
                    ],
                    ref: ele => this.container = ele
                }) : null
            ],
            ref: ele => this.element = ele,
            style,
        });
    }
}
SelectHigh.defaultProps = {
    filter: (v0, v1) => v0 === v1 || (v0).toString().indexOf(v1) > -1,
    render: (v0, /* v1 */) => v0,
    values: [],
    vKey: 'value',
    holder: '没有相关数据 ... ...',
    onModel: v => v,
    pageNo: 1,
    pageSize: 10,
    size: 'md',
    theme: 'muted'
};

if (window.DEV) {
    SelectHigh.propTypes = {
        headClassName: PropTypes.string,
        bodyClassName: PropTypes.string,

        theme: PropTypes.oneOf(theme),
        model: PropTypes.instanceOf(Model),
        onModel: PropTypes.func,
        placeholder: PropTypes.string,

        page: PropTypes.shape(PageTurn.propTypes),
        pageNo: PropTypes.number,
        pageSize: PropTypes.number,
        fetch: PropTypes.func,

        filter: PropTypes.func.isRequired,
        render: PropTypes.func,
        values: PropTypes.arrayOf(PropTypes.object).isRequired,
        vKey: PropTypes.string,

        holder: PropTypes.any,

        tagTheme: Tag.propTypes.theme,
        tagSize: Tag.propTypes.size
    };
}