import './_rollupPluginBabelHelpers-cc1db274.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import './index-dc594463.js';
import './dependency-8ea69cb4.js';
import './assert-cc694573.js';
import './object-has-own-6b83c90b.js';
import 'react-dom';
import './raf-4503f6a0.js';
import './zIndex-bd9d5e3e.js';
import { Button } from './button.js';
import './css-animate-4c1feb1b.js';
import './CSSMotion-cdce7961.js';
import './mask.js';
import { Modal } from './modal.js';

var Confirm = function Confirm(props) {
  var children = props.children,
      onClose = props.onClose,
      onConfirm = props.onConfirm,
      size = props.size,
      title = props.title,
      visible = props.visible,
      width = props.width;
  return /*#__PURE__*/React__default.createElement(Modal, {
    visible: visible,
    onClose: onClose,
    size: size,
    title: title,
    footer: /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Button, {
      theme: "primary",
      size: size,
      onClick: onConfirm
    }, "\u786E\u5B9A"), /*#__PURE__*/React__default.createElement(Button, {
      theme: "muted",
      size: size,
      onClick: onClose
    }, "\u53D6\u6D88")),
    width: width
  }, " ", children, " ");
};
Confirm.defaultProps = {
  width: 450
};

if (window.DEV) {
  Confirm.propTypes = {
    onClose: propTypes.func,
    onConfirm: propTypes.func
  };
}

export { Confirm };
