import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSMotion } from './CSSMotion';
export const Fade = props => {
    const target = useRef();
    const { children, className, display, onEnded, visible } = props;
    const onlyChild = React.Children.only(children);

    return React.createElement(CSSMotion,
        {
            active: 'fade',
            offset: 'in',
            display,
            onStart: () => true,
            onEnded,
            onRef: () => target.current,
            visible
        },
        React.cloneElement(onlyChild, {
            className: classnames(className, {
                non: !visible
            }),
            ref: target
        })
    );
};

Fade.defaultProps = {
    visible: false,
    display: true
};
if (window.DEV) {
    Fade.propTypes = {
        visible: PropTypes.bool,
    };
}