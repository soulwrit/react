import '@writ/scss/components/drawer.scss'
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Mask } from './Mask';
import { Flex, FlexItem } from './Flex';
import { CSSMotion } from './Common/CSSMotion';
import { getZIndex } from './Common/zIndex';
export { Drawer };

const Drawer = (props) => {
    const {
        children, className,bodyClassName, dir, footer, global, height, mask, onClose, onHidden, onShown, placement,
        title, visible, width
    } = props
    const drawerRef = useRef();
    const drawerElement = React.createElement(React.Fragment, null,
        mask ? React.createElement(Mask, {
            global,
            key: 'mask',
            onClose,
            times: null,
            visible,
            zIndex: getZIndex()
        }) : null,
        React.createElement(CSSMotion,
            {
                key: 'draw',
                display: true,
                active: placement,
                offset: 'enter',
                onStart: () => true,
                onEnded() {
                    visible ? onShown && onShown() : onHidden && onHidden();
                },
                onRef: () => drawerRef.current,
                visible
            },
            React.createElement(Flex,
                {
                    className: classnames('dar', 'non', dir, { abs: !global }, className),
                    height,
                    ref: drawerRef,
                    width,
                    style: {
                        zIndex: global ? getZIndex() : 1
                    }
                },
                title ? React.createElement(FlexItem, {
                    className: 'hd'
                }, title) : null,
                children ? React.createElement(FlexItem, {
                    className: classnames('bd', bodyClassName),
                    flex: 1
                }, children) : null,
                footer ? React.createElement(FlexItem, {
                    className: 'ft'
                }, footer) : null,
            ),
        )
    );

    return global ? ReactDOM.createPortal(drawerElement, document.body) : drawerElement;
};

Drawer.defaultProps = {
    global: true,
    mask: true,
    dir: 'ttr',
    placement: 'left',
};
if (window.DEV) {
    Drawer.propTypes = {
        nomask: PropTypes.bool,
        dir: PropTypes.oneOf(['ttr', 'rtt']),
        global: PropTypes.bool,
        onHidden: PropTypes.func,
        onShown: PropTypes.func,
        onClose: PropTypes.func,
        placement: PropTypes.oneOf(['right', 'left', 'top', 'bottom']),
        visible: PropTypes.bool,
    };
}


