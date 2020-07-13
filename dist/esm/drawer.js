import './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default, { useRef } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import './dependency-8ea69cb4.js';
import ReactDOM from 'react-dom';
import './raf-4503f6a0.js';
import { Flex, FlexItem } from './flex.js';
import './css-animate-93e47d39.js';
import { C as CSSMotion } from './CSSMotion-f1b5afe8.js';
import { Mask } from './mask.js';

var Drawer = function Drawer(props) {
  var children = props.children,
      className = props.className,
      dir = props.dir,
      footer = props.footer,
      global = props.global,
      height = props.height,
      mask = props.mask,
      onClose = props.onClose,
      onHidden = props.onHidden,
      onShown = props.onShown,
      placement = props.placement,
      title = props.title,
      visible = props.visible,
      width = props.width;
  var drawerRef = useRef();
  var drawerElement = /*#__PURE__*/React__default.createElement(React__default.Fragment, null, mask ? /*#__PURE__*/React__default.createElement(Mask, {
    global: false,
    key: 'mask',
    onClose: onClose,
    times: null,
    visible: visible
  }) : null, /*#__PURE__*/React__default.createElement(CSSMotion, {
    key: 'draw',
    display: true,
    active: placement,
    offset: 'enter',
    onStart: function onStart() {
      return true;
    },
    onEnded: function onEnded() {
      visible ? onShown && onShown() : onHidden && onHidden();
    },
    onRef: function onRef() {
      return drawerRef.current;
    },
    visible: visible
  }, /*#__PURE__*/React__default.createElement(Flex, {
    className: classnames('dar', 'non', dir, className),
    height: height,
    ref: drawerRef,
    width: width
  }, title ? /*#__PURE__*/React__default.createElement(FlexItem, {
    className: 'hd'
  }, title) : null, children ? /*#__PURE__*/React__default.createElement(FlexItem, {
    className: 'bd',
    flex: 1
  }, children) : null, footer ? /*#__PURE__*/React__default.createElement(FlexItem, {
    className: 'ft'
  }, footer) : null)));
  return global ? /*#__PURE__*/ReactDOM.createPortal(drawerElement, document.body) : drawerElement;
};

Drawer.defaultProps = {
  global: true,
  mask: true,
  dir: 'ttr',
  placement: 'left'
};

if (window.DEV) {
  Drawer.propTypes = {
    nomask: propTypes.bool,
    dir: propTypes.oneOf(['ttr', 'rtt']),
    global: propTypes.bool,
    onHidden: propTypes.func,
    onShown: propTypes.func,
    onClose: propTypes.func,
    placement: propTypes.oneOf(['right', 'left', 'top', 'bottom']),
    visible: propTypes.bool
  };
}

export { Drawer };
