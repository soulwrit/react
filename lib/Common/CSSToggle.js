import React from 'react';
import PropTypes from 'prop-types';
import { CSSAnimation } from './CSSAnimation';

// CSSToggle
export const CSSToggle = ({ active, children, offset, onEnded, onStart, onRef, visible, }) => {
    return React.createElement(CSSAnimation, {
        /**@type {HTMLElement} */
        onStart: elem => {
            if (visible) {
                active && elem.classList.add(active);
            } else {
                offset && elem.classList.add(offset);
            }
            if (onStart && onStart(elem) === false) return false;
        },
        onRef,
        /**@type {HTMLElement} */
        onEnded: elem => {
            if (visible) {
                offset && elem.classList.remove(offset);
            } else {
                active && elem.classList.remove(active);
            }
            onEnded && onEnded(elem);
        },
        flag: visible,
    }, children);
};

CSSToggle.defaultProps = {};
if (window.DEV) {
    CSSToggle.propTypes = {
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