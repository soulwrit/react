import { useEffect } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { r as raf } from './raf-4503f6a0.js';
import { o as onAnimationEnd, c as onTransitionEnd, g as getStyleTimeout } from './css-animate-4c1feb1b.js';

var CSSAnimation = function CSSAnimation(_ref) {
  var children = _ref.children,
      flag = _ref.flag,
      isAnimation = _ref.isAnimation,
      isTransition = _ref.isTransition,
      onEnded = _ref.onEnded,
      onStart = _ref.onStart,
      onRef = _ref.onRef;
  // Animation
  useEffect(function () {
    /**@type {HTMLElement} */
    var elem = onRef();

    if (!elem) {
      return;
    }

    onStart && onStart(elem);
    var timer;

    var clean = function clean() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      isAnimation ? rmAnimationEnd() : null;
      isTransition ? rmTransitionEnd() : null;
    };

    var listen = function listen(e) {
      if (e && e.target !== elem) {
        return;
      }

      clean();
      onEnded && onEnded(elem);
    };

    var rmAnimationEnd = isAnimation ? onAnimationEnd(elem, listen) : null;
    var rmTransitionEnd = isTransition ? onTransitionEnd(elem, listen) : null;
    raf(function () {
      var time = getStyleTimeout(elem);

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
  isTransition: true
};

if (window.DEV) {
  CSSAnimation.propTypes = {
    flag: propTypes.bool.isRequired,
    isAnimation: propTypes.bool,
    isTransition: propTypes.bool,
    onEnter: propTypes.func,
    onEnded: propTypes.func,
    onRef: propTypes.func.isRequired
  };
}

export { CSSAnimation as C };
