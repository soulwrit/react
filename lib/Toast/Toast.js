import '@writ/scss/components/toast.scss';
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';

import { theme, MQ_Breakpoints } from '../../dependency';
import { CSSMotion } from '../Common/CSSMotion';
import { DEFAULT, position } from './defaultProps';

export const Toast = props => {
    const {
        autoClose, children, className, duration,
        height, onClose,
        size, style,
        type, value, width,
    } = props;
    const toastRef = useRef();
    const timerRef = useRef();
    const [visible, setVisible] = useState(true);

    const close = e => {
        if (!autoClose) {
            return;
        }
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        setVisible(false);
    };
    // pause
    const pause = () => {
        if (timerRef.current != null) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };
    // restart
    const restart = () => {
        if (timerRef.current == null) {
            timerRef.current = setTimeout(close, duration);
        }
    };

    useEffect(() => {
        timerRef.current = setTimeout(close, duration);
        return () => {
            if (timerRef.current != null) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (visible === false) {
            if (timerRef.current != null) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        }
    }, [visible]);

    return React.createElement(CSSMotion,
        {
            active: void 0,
            offset: 'open',
            display: false,
            onStart: () => true,
            onEnded: () => {
                console.log('Toast isEnter', visible);
                if (visible === false) {
                    if (autoClose) {
                        onClose();
                    }
                }
            },
            onRef: () => toastRef.current,
            visible
        },
        React.createElement('div', {
            className: classnames('wrap', size, type, className),
            ref: toastRef,
            onMouseEnter: pause,
            onMouseLeave: restart,
            style: Object.assign({
                width, height
            }, style),
        }, value || children)
    );
}

Toast.defaultProps = DEFAULT;
if (window.DEV) {
    Toast.propTypes = {
        autoClose: PropTypes.bool,
        duration: PropTypes.number,
        onClose: PropTypes.func,
        position: PropTypes.oneOf(position),
        type: PropTypes.oneOf(theme),
        value: PropTypes.any,
        size: PropTypes.oneOf(MQ_Breakpoints),
        space: PropTypes.number,
    };
}