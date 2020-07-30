import '@writ/scss/components/mask.scss';
import React, { useEffect, useRef, } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSMotion } from './Common/CSSMotion';
import { getZIndex } from './Common/zIndex';
export { Mask };

/**
 * 这是一个受控组件，visible 由 props 完全控制
 */
var Mask = React.forwardRef((props, ref) => {
    const maskRef = useRef(ref);
    const { children, className, escOut, thisOut, global, onClose, style, times, visible, zIndex } = props;

    useEffect(() => {
        const onCloseEsc = e => { 
            if (!visible) return;
            if ((e.key || '').toLowerCase() == 'escape' || e.keyCode === 27) {
                onClose();
            }
        };
        if (onClose) {
            document.body.addEventListener('keyup', onCloseEsc, false);
        }
        return () => {
            if (onClose) {
                document.body.removeEventListener('keyup', onCloseEsc);
            }
        };
    }, [visible, escOut]);
    const maskElement = React.createElement(CSSMotion,
        {
            active: 'fade',
            offset: 'in',
            display: true,
            onStart: () => true,
            onRef() {
                return maskRef.current;
            },
            visible
        },
        React.createElement('div', {
            className: classnames('msk', 'non', className),
            children: [
                onClose && times ? React.createElement('div', {
                    key: 1,
                    className: 'cls',
                    onClick(e) {
                        e.stopPropagation();
                        onClose();
                    },
                    [typeof times != 'string' ? 'children' : 'dangerouslySetInnerHTML']:
                        typeof times != 'string' ? times : { __html: times }
                }) : null,
                React.createElement(React.Fragment, {
                    key: 0,
                }, children)
            ],
            onClick: thisOut ? onClose : null,
            ref: maskRef,
            style: Object.assign({
                zIndex: zIndex || getZIndex()
            }, style)
        })
    );

    return global ? ReactDOM.createPortal(maskElement, document.body) : maskElement;
});

Mask.defaultProps = {
    times: '&times;',
    escOut: true,
    thisOut: true,
};
if (window.DEV) {
    Mask.propTypes = {
        thisOut: PropTypes.bool,
        escOut: PropTypes.bool,
        global: PropTypes.bool,
        onClose: PropTypes.func,
        times: PropTypes.any,
        visible: PropTypes.bool,
    };
}