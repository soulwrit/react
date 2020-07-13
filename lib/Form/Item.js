import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { dirs, CSSUtil } from '../../dependency';
import { Model } from './Model';
export { Item };

const Item = props => {
    if (!props.show) return null;
    const {
        children, className, dir, extra, extraClassName, label, labelClassName,
        mainClassName, model, required, style, useLabel, isRow
    } = props;
    const isRequired = required || model && model.required;
    const title = label || model && model.label;
    const type = useLabel ? 'label' : 'div';

    return React.createElement(type, {
        className: classnames('lbl', isRow ? CSSUtil.row : undefined, className),
        children: [
            title ? React.createElement('div', {
                key: 0,
                className: classnames('name', labelClassName),
                children: [
                    React.createElement(React.Fragment, {
                        key: 0
                    }, title),
                    isRequired ? React.createElement('b', {
                        key: 1,
                        className: 'required'
                    }, '*') : null
                ]
            }) : null,
            React.createElement('div', {
                key: 1,
                className: classnames('ctrl', mainClassName),
            }, children),
            extra ? React.createElement('div', {
                key: 2,
                className: classnames('extra', extraClassName),
            }, extra) : null
        ],
        dir,
        style
    });
}

Item.defaultProps = {
    dir: dirs[0],
    required: false,
    show: true,
    useLabel: true
};

if (window.DEV) {
    Item.propTypes = {
        label: PropTypes.any,
        labelClassName: PropTypes.string,
        extra: PropTypes.any,
        extraClassName: PropTypes.string,
        model: PropTypes.instanceOf(Model),
        dir: PropTypes.oneOf(dirs),
        required: PropTypes.bool,
        show: PropTypes.bool,
        useLabel: PropTypes.bool,
    };
}