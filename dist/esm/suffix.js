import { f as _slicedToArray } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default, { useState, useRef, useEffect } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { a as assert_1 } from './assert-cc694573.js';
import { r as raf } from './raf-4503f6a0.js';
import { c as contains } from './dom-contains-5179471e.js';
import { g as getZIndex } from './zIndex-bd9d5e3e.js';
import './css-animate-4c1feb1b.js';
import { C as CSSMotion } from './CSSMotion-cdce7961.js';

/**
 * 指定的对象`obj`是否为window对象
 * @param {*} obj
 */

function isWindow(obj) {
  return obj !== null && obj !== window && obj === obj.window;
}

var isWindow_1 = isWindow;

function getScroll(target, isTop) {
  if (typeof window === 'undefined') {
    return 0;
  }

  const method = isTop ? 'scrollTop' : 'scrollLeft';
  let result = 0;

  if (isWindow_1(target)) {
    result = target[isTop ? 'pageYOffset' : 'pageXOffset'];
  } else if (target instanceof Document) {
    result = target.documentElement[method];
  } else if (target) {
    result = target[method];
  }

  if (target && !isWindow_1(target) && typeof result !== 'number') {
    result = (target.ownerDocument || target).documentElement[method];
  }

  return result;
}

function easeInOutCubic(t, b, c, d) {
  const cc = c - b;
  t /= d / 2;

  if (t < 1) {
    return cc / 2 * t * t * t + b;
  }

  return cc / 2 * ((t -= 2) * t * t + 2) + b;
}

/** 
 * @param {*} y 
 * @param {object} options 
 * @param {function} options.getContainer 
 * @param {function} options.callback 
 * @param {number} options.duration 
 * @param {function} options.cancel
 */

function scrollTo(y, {
  getContainer = () => window,
  callback,
  duration = 400,
  cancel = () => false
}) {
  const container = getContainer();
  const scrollTop = getScroll(container, true);
  const startTime = Date.now();

  const frameFunc = function frameFunc() {
    const timeActive = Date.now();
    const time = timeActive - startTime;
    const nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration);

    if (isWindow_1(container)) {
      container.scrollTo(window.pageXOffset, nextScrollTop);
    } else if (container instanceof HTMLDocument || container.constructor.name === 'HTMLDocument') {
      container.documentElement.scrollTop = nextScrollTop;
    } else {
      container.scrollTop = nextScrollTop;
    }

    if (time <= duration && !cancel()) {
      return raf(frameFunc);
    }

    if (typeof callback === 'function') {
      callback();
    }
  };

  raf(frameFunc);
}

var BackTop = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var children = props.children;
  return /*#__PURE__*/React__default.createElement('span', {
    className: 'backtop',
    ref: ref
  }, /*#__PURE__*/React__default.createElement('span', {
    className: 'arrow'
  }), /*#__PURE__*/React__default.createElement('span', {
    className: 'value'
  }, children));
});

var Suffix = function Suffix(props) {
  var backTop = props.backTop,
      children = props.children,
      className = props.className,
      isVertical = props.isVertical,
      onScrollEnd = props.onScrollEnd,
      style = props.style,
      visibility = props.visibility,
      zIndex = props.zIndex;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var pointRef = useRef();
  var wrapperRef = useRef();

  var getCurrent = function getCurrent() {
    var current = backTop.current;
    assert_1.nuil(current, 'Scrolling Container must be a HTML Element.');
    return current;
  };

  useEffect(function () {
    var current = getCurrent(); // 可以点击停止 

    var canceled = true;
    var options = {
      callback: function callback() {
        canceled = true;
        onScrollEnd && onScrollEnd();
      },
      cancel: function cancel() {
        return canceled;
      },
      duration: 2000,
      getContainer: function getContainer() {
        return current;
      }
    };

    var handleClick = function handleClick(e) {
      if (canceled === true) {
        if (contains(pointRef.current, e.target)) {
          canceled = false;
          return scrollTo(0, options);
        }
      }

      canceled = true;
    };

    var handleScroll = function handleScroll() {
      raf(function () {
        var current = getCurrent();
        var value = getScroll(current, isVertical);

        if (value >= visibility && !visible) {
          // 此处存在卡顿问题
          setVisible(true);
        } else {
          setVisible(false);
        }
      });
    };

    current.addEventListener('click', handleClick, false);
    current.addEventListener('scroll', handleScroll, false);
    return function () {
      current.removeEventListener('click', handleClick, false);
      current.removeEventListener('scroll', handleScroll, false);
    };
  }, []);
  return /*#__PURE__*/React__default.createElement(CSSMotion, {
    key: 'draw',
    active: 'fade',
    offset: 'in',
    display: true,
    onStart: function onStart() {
      return true;
    },
    onRef: function onRef() {
      return wrapperRef.current;
    },
    visible: visible
  }, /*#__PURE__*/React__default.createElement('div', {
    style: Object.assign({
      zIndex: zIndex || getZIndex()
    }, style),
    className: classnames('suf', className, {
      non: !visible
    }),
    ref: wrapperRef
  }, children, backTop ? /*#__PURE__*/React__default.createElement(BackTop, {
    ref: pointRef
  }, 'UP') : null));
};
Suffix.defaultProps = {
  backTop: {
    current: window
  },
  isVertical: true,
  visibility: 50
};

if (window.DEV) {
  Suffix.propTypes = {
    backTop: propTypes.object,
    isVertical: propTypes.bool,
    onScrollEnd: propTypes.func,
    visibility: propTypes.number,
    zIndex: propTypes.number
  };
}

export { Suffix };
