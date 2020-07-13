import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Extra } from './Extra';
export const Pane = React.forwardRef((props, ref) => {
    // 儿子去睡觉吧，爹以后再也不去找小桃红了，等你长大了，让她给你当小妾 ... ... 哈哈哈哈哈。。。。。。大笑
    const { adder, className, children, dref, extra, isWrapper, proxy, onClick, style } = props;

    return React.createElement('div', {
        className: classnames('pane', className),
        children: [
            React.createElement('div', {
                className: isWrapper ? 'wrapper' : 'action',
                key: 'wrp',
                onClick: proxy ? onClick : null,
                ref: dref
            }, children),
            adder ? adder : null,
            extra ? React.createElement(Extra, { key: 'ext' }, extra) : null,
        ],
        ref,
        style
    });
});

if (window.DEV) {
    Pane.propTypes = {
        adder: PropTypes.any,
        extra: PropTypes.any,
        isWrapper: PropTypes.bool,
        proxy: PropTypes.bool
    };
}