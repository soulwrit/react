import { _ as _defineProperty } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default, { useRef, useEffect } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import ReactDOM from 'react-dom';
import './raf-4503f6a0.js';
import { g as getZIndex } from './zIndex-bd9d5e3e.js';
import './css-animate-4c1feb1b.js';
import { C as CSSMotion } from './CSSMotion-cdce7961.js';

/**
 * 这是一个受控组件，visible 由 props 完全控制
 */

var Mask = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var maskRef = useRef(ref);
  var children = props.children,
      className = props.className,
      escOut = props.escOut,
      thisOut = props.thisOut,
      global = props.global,
      onClose = props.onClose,
      style = props.style,
      times = props.times,
      visible = props.visible,
      zIndex = props.zIndex;
  useEffect(function () {
    var onCloseEsc = function onCloseEsc(e) {
      if (!visible) return;

      if ((e.key || '').toLowerCase() == 'escape' || e.keyCode === 27) {
        onClose();
      }
    };

    if (onClose) {
      document.body.addEventListener('keyup', onCloseEsc, false);
    }

    return function () {
      if (onClose) {
        document.body.removeEventListener('keyup', onCloseEsc);
      }
    };
  }, [visible, escOut]);
  var maskElement = /*#__PURE__*/React__default.createElement(CSSMotion, {
    active: 'fade',
    offset: 'in',
    display: true,
    onStart: function onStart() {
      return true;
    },
    onRef: function onRef() {
      return maskRef.current;
    },
    visible: visible
  }, /*#__PURE__*/React__default.createElement('div', {
    className: classnames('msk', 'non', className),
    children: [onClose && times ? /*#__PURE__*/React__default.createElement('div', _defineProperty({
      key: 1,
      className: 'cls',
      onClick: function onClick(e) {
        e.stopPropagation();
        onClose();
      }
    }, typeof times != 'string' ? 'children' : 'dangerouslySetInnerHTML', typeof times != 'string' ? times : {
      __html: times
    })) : null, /*#__PURE__*/React__default.createElement(React__default.Fragment, {
      key: 0
    }, children)],
    onClick: thisOut ? onClose : null,
    ref: maskRef,
    style: Object.assign({
      zIndex: zIndex || getZIndex()
    }, style)
  }));
  return global ? /*#__PURE__*/ReactDOM.createPortal(maskElement, document.body) : maskElement;
});
Mask.defaultProps = {
  times: '&times;',
  escOut: true,
  thisOut: true
};

if (window.DEV) {
  Mask.propTypes = {
    thisOut: propTypes.bool,
    escOut: propTypes.bool,
    global: propTypes.bool,
    onClose: propTypes.func,
    times: propTypes.any,
    visible: propTypes.bool
  };
}

export { Mask };
