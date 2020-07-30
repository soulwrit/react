import '@writ/scss/components/progressBar.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSUtil } from '../../dependency'; 
export const ProgressBar = React.forwardRef((props, ref) => {
    const {
        className, format,
        height, inline,
        traceStyle, status, stripe,
        trackStyle, value, valueStyle,
        ...rest
    } = props; 
 
    return React.createElement('div', {
        className: classnames(CSSUtil.progressBar, className),
        children: [
            React.createElement('div', {
                children: React.createElement('div', {
                    className: 'inner',
                    style: Object.assign({
                        width: format(value)
                    }, traceStyle)
                }),
                className: classnames('outer', status, {
                    stripe,
                    inb: inline
                }),
                key: 0,
                style: Object.assign({ height }, trackStyle)
            }),
            props.showInfo ? React.createElement('div', {
                key: 1,
                children: format(value),
                className: classnames('info', {
                    inb: inline
                }),
                style: valueStyle
            }) : null,
        ],
        ref,
        ...rest
    });
});
ProgressBar.defaultProps = {
    value: 0,
    format: value => value + '%',
    status: 'normal',
    inline: false,
};
if (window.DEV) {
    ProgressBar.propTypes = {
        value: PropTypes.number.isRequired,
        format: PropTypes.func,
        inline: PropTypes.bool,
        stripe: PropTypes.bool,
        status: PropTypes.oneOf(['success', 'failed', 'normal']),
        traceStyle: PropTypes.object,
        trackStyle: PropTypes.object,
        valueStyle: PropTypes.object,
        showInfo: PropTypes.bool
    };
} 