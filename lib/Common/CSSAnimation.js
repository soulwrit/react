import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import raf from '@writ/utils/raf';
import { animation, perspective, transition, transform, onAnimationEnd, onTransitionEnd, getStyleTimeout } from '@writ/utils/css-animate';
export const AnimationContext = React.createContext({
    animation, perspective, transition, transform,
});
export const CSSAnimation = ({ children, flag, isAnimation, isTransition, onEnded, onStart, onRef, }) => {
    // Animation
    useEffect(() => {
        /**@type {HTMLElement} */
        const elem = onRef();
        if (!elem) {
            return;
        }

        let timer;
        const isStopped = onStart && onStart(elem) === false;
        if (isStopped === false) {
            return;
        }
        const clean = () => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            isAnimation ? rmAnimationEnd() : null;
            isTransition ? rmTransitionEnd() : null;
        };
        const listen = e => {
            if (e && e.target !== elem) {
                return;
            }

            clean();
            onEnded && onEnded(elem);
        };
        const rmAnimationEnd = isAnimation ? onAnimationEnd(elem, listen) : null;
        const rmTransitionEnd = isTransition ? onTransitionEnd(elem, listen) : null;

        raf(() => {
            const time = getStyleTimeout(elem);
            if (time >= 0) {
                timer = setTimeout(clean, time);
            }
        });

        return clean;
    }, [flag]);

    return children;
};

CSSAnimation.defaultProps = {
    isAnimation: false,
    isTransition: true,
};
if (window.DEV) {
    CSSAnimation.propTypes = {
        flag: PropTypes.bool.isRequired,
        isAnimation: PropTypes.bool,
        isTransition: PropTypes.bool,
        onEnter: PropTypes.func,
        onEnded: PropTypes.func,
        onRef: PropTypes.func.isRequired,
    };
}