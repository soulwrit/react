import { f as _slicedToArray } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default, { useEffect, useRef, useState } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { M as MQ_Breakpoints } from './dependency-8ea69cb4.js';
import { n as noop_1 } from './noop-469b0e21.js';
import { r as raf } from './raf-4503f6a0.js';
import { o as onAnimationEnd, a as onTransitionEnd, g as getStyleTimeout } from './css-animate-93e47d39.js';

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

    var timer;
    var isStopped = onStart && onStart(elem) === false;

    if (isStopped === false) {
      return;
    }

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

var CSSToggle = function CSSToggle(_ref) {
  var active = _ref.active,
      children = _ref.children,
      offset = _ref.offset,
      _onEnded = _ref.onEnded,
      _onStart = _ref.onStart,
      onRef = _ref.onRef,
      visible = _ref.visible;
  return /*#__PURE__*/React__default.createElement(CSSAnimation, {
    /**@type {HTMLElement} */
    onStart: function onStart(elem) {
      if (visible) {
        active && elem.classList.add(active);
      } else {
        offset && elem.classList.add(offset);
      }

      if (_onStart && _onStart(elem) === false) return false;
    },
    onRef: onRef,

    /**@type {HTMLElement} */
    onEnded: function onEnded(elem) {
      if (visible) {
        offset && elem.classList.remove(offset);
      } else {
        active && elem.classList.remove(active);
      }

      _onEnded && _onEnded(elem);
    },
    flag: visible
  }, children);
};
CSSToggle.defaultProps = {};

if (window.DEV) {
  CSSToggle.propTypes = {
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

var Switch = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var checked = props.checked,
      disabled = props.disabled,
      off = props.off,
      on = props.on,
      onChange = props.onChange,
      outer = props.outer,
      size = props.size;
  var innerRef = useRef();
  var prior = useRef(checked);

  var _useState = useState(checked),
      _useState2 = _slicedToArray(_useState, 2),
      isChecked = _useState2[0],
      setIsChecked = _useState2[1];

  var onChangeWrapper = function onChangeWrapper(e) {
    e.stopPropagation();
    setIsChecked(!isChecked);
    onChange(checked);
  };

  useEffect(function () {
    if (disabled) return;

    if (prior.current !== checked) {
      prior.current = checked;
      setIsChecked(checked);
      onChange(checked);
    }
  }, [checked, disabled]);

  if (outer) {
    return /*#__PURE__*/React__default.createElement(CSSToggle, {
      active: 'checked',
      offset: 'unchecked',
      onRef: function onRef() {
        return innerRef.current;
      },
      visible: isChecked
    }, /*#__PURE__*/React__default.createElement('span', {
      className: classnames('switch outer', isChecked ? 'checked' : 'unchecked', {
        disabled: disabled
      }),
      onClick: disabled ? null : onChangeWrapper,
      ref: innerRef
    }, on ? /*#__PURE__*/React__default.createElement('span', {
      className: 'truly'
    }, on) : null, /*#__PURE__*/React__default.createElement('span', {
      className: 'hold'
    }), off ? /*#__PURE__*/React__default.createElement('span', {
      className: 'false'
    }, off) : null));
  }

  return /*#__PURE__*/React__default.createElement('span', {
    className: 'switch inner',
    ref: ref
  }, /*#__PURE__*/React__default.createElement(CSSToggle, {
    active: 'checked',
    offset: 'unchecked',
    onRef: function onRef() {
      return innerRef.current;
    },
    visible: isChecked
  }, /*#__PURE__*/React__default.createElement('span', {
    className: classnames('inner', isChecked ? 'checked' : 'unchecked', {
      disabled: disabled
    }),
    onClick: disabled ? null : onChangeWrapper,
    ref: innerRef
  }, /*#__PURE__*/React__default.createElement('span', {
    className: classnames('truly', size)
  }, on), /*#__PURE__*/React__default.createElement('span', {
    className: classnames('hold', size)
  }), /*#__PURE__*/React__default.createElement('span', {
    className: classnames('false', size)
  }, off))));
});
Switch.defaultProps = {
  checked: false,
  disabled: false,
  outer: false,
  onChange: noop_1,
  off: '',
  on: '',
  size: 'xs'
};

if (window.DEV) {
  Switch.propTypes = {
    checked: propTypes.bool,
    disabled: propTypes.bool,
    outer: propTypes.bool,
    onChange: propTypes.func,
    off: propTypes.any,
    on: propTypes.any,
    size: propTypes.oneOf(MQ_Breakpoints)
  };
}

export { Switch };
