import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import raf from '@writ/utils/raf';
import { animation, perspective, transition, transform, onAnimationEnd, onTransitionEnd, getStyleTimeout } from '@writ/utils/css-animate';
export const MotionContext = React.createContext({
    animation, perspective, transition, transform,
});

// Motion
export const CSSMotion = ({ active, children, display, offset, onEnded, onStart, onRef, only, visible, }) => {
    useEffect(() => {
        /**@type {HTMLElement} */
        const elem = onRef();
        if (!elem) {
            return;
        }
        let timer;
        let isRunning = onStart && onStart(elem) !== false;
        const classList = elem.classList;

        if (isRunning === false) {
            visible ? classList.remove('non') : classList.add('non');
            return;
        }
        if (visible) {
            active && classList.add(active);
            display && classList.remove('non');
            raf(() => {
                offset && classList.add(offset);
            });
        } else {
            classList.remove(offset);
        }
        const clean = () => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            only ? rmAnimationEnd() : null;
            rmTransitionEnd();
            if (!visible) {
                offset && classList.remove(active);
                offset && classList.remove(offset);
                display && classList.add('non');
            }
        };
        const listen = e => {
            if (e && e.target !== elem) {
                return;
            }

            clean();
            onEnded && onEnded(elem);
        };
        let rmAnimationEnd = only ? onAnimationEnd(elem, listen) : null;
        let rmTransitionEnd = onTransitionEnd(elem, listen);

        raf(() => {
            const time = getStyleTimeout(elem);
            if (time >= 0) {
                timer = setTimeout(clean, time);
            }
        });

        return clean;
    }, [visible]);

    return children;
};

MotionContext.displayName = 'TSC';
CSSMotion.defaultProps = {};
if (window.DEV) {
    CSSMotion.propTypes = {
        active: PropTypes.string,
        display: PropTypes.bool,
        offset: PropTypes.string,
        only: PropTypes.bool,
        onEnter: PropTypes.func,
        onEnded: PropTypes.func,
        onRef: PropTypes.func.isRequired,
        visible: PropTypes.bool.isRequired,
    };
}