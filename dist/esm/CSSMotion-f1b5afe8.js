import React__default, { useEffect } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { r as raf } from './raf-4503f6a0.js';
import { b as animation, p as perspective, t as transition, c as transform, o as onAnimationEnd, a as onTransitionEnd, g as getStyleTimeout } from './css-animate-93e47d39.js';

var MotionContext = /*#__PURE__*/React__default.createContext({
  animation: animation,
  perspective: perspective,
  transition: transition,
  transform: transform
}); // Motion

var CSSMotion = function CSSMotion(_ref) {
  var active = _ref.active,
      children = _ref.children,
      display = _ref.display,
      offset = _ref.offset,
      onEnded = _ref.onEnded,
      onStart = _ref.onStart,
      onRef = _ref.onRef,
      only = _ref.only,
      visible = _ref.visible;
  useEffect(function () {
    /**@type {HTMLElement} */
    var elem = onRef();

    if (!elem) {
      return;
    }

    var timer;
    var isRunning = onStart && onStart(elem) !== false;
    var classList = elem.classList;

    if (isRunning === false) {
      visible ? classList.remove('non') : classList.add('non');
      return;
    }

    if (visible) {
      active && classList.add(active);
      display && classList.remove('non');
      raf(function () {
        offset && classList.add(offset);
      });
    } else {
      classList.remove(offset);
    }

    var clean = function clean() {
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

    var listen = function listen(e) {
      if (e && e.target !== elem) {
        return;
      }

      clean();
      onEnded && onEnded(elem);
    };

    var rmAnimationEnd = only ? onAnimationEnd(elem, listen) : null;
    var rmTransitionEnd = onTransitionEnd(elem, listen);
    raf(function () {
      var time = getStyleTimeout(elem);

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
    active: propTypes.string,
    display: propTypes.bool,
    offset: propTypes.string,
    only: propTypes.bool,
    onEnter: propTypes.func,
    onEnded: propTypes.func,
    onRef: propTypes.func.isRequired,
    visible: propTypes.bool.isRequired
  };
}

export { CSSMotion as C };
