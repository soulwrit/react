import { f as _slicedToArray, c as _defineProperty } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default, { useRef, useState, useCallback, useEffect } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { p as placements, C as CSSUtil, t as theme } from './dependency-8ea69cb4.js';
import { a as assert_1 } from './assert-cc694573.js';
import { o as objectHasOwn } from './object-has-own-6b83c90b.js';
import ReactDOM from 'react-dom';
import './raf-4503f6a0.js';
import { g as getZIndex } from './zIndex-bd9d5e3e.js';
import './css-animate-4c1feb1b.js';
import { C as CSSMotion } from './CSSMotion-cdce7961.js';
import { Mask } from './mask.js';

var Modal = function Modal(props) {
  var bodyClassName = props.bodyClassName,
      bodyStyle = props.bodyStyle,
      children = props.children,
      className = props.className,
      container = props.container,
      footer = props.footer,
      footerStyle = props.footerStyle,
      footerClassName = props.footerClassName,
      headerStyle = props.headerStyle,
      headerClassName = props.headerClassName,
      height = props.height,
      mask = props.mask,
      maskClosable = props.maskClosable,
      maskStyle = props.maskStyle,
      onClose = props.onClose,
      onHide = props.onHide,
      onHidden = props.onHidden,
      onShow = props.onShow,
      onShown = props.onShown,
      placement = props.placement,
      size = props.size,
      style = props.style,
      theme = props.theme,
      title = props.title,
      times = props.times,
      timesClosable = props.timesClosable,
      visible = props.visible,
      width = props.width;
  var hasVisible = objectHasOwn(props, 'visible');

  if (hasVisible && title) {
    assert_1.falsly(!!onClose, '`Controller Modal` must via your close handle!');
  }

  var isControlled = hasVisible && onClose;
  var modalRef = useRef();

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isInitialed = _useState2[0],
      setIsInitialed = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      opened = _useState4[0],
      setOpened = _useState4[1];

  var shown = isControlled ? visible : opened;
  var position = placement ? placement : 'middle';

  var onCloseWrapper = function onCloseWrapper() {
    if (isControlled) return onClose();
    setOpened(false);
  };

  var onStart = useCallback(function () {
    shown ? onShow && onShow() : isInitialed && onHide && onHide();

    if (style && placements.some(function (k) {
      return typeof style[k] !== 'undefined';
    })) {
      return isInitialed;
    }
  }, [shown]);
  var onEnded = useCallback(function () {
    shown ? onShown && onShown() : onHidden && onHidden();
  }, [shown]);
  var onRef = useCallback(function () {
    return modalRef.current;
  }, [modalRef]);
  useEffect(function () {
    !isInitialed && setIsInitialed(true);
  }, []);
  return /*#__PURE__*/ReactDOM.createPortal([mask ? /*#__PURE__*/React__default.createElement(Mask, {
    key: 'mask',
    className: 'fixed',
    onClose: maskClosable ? onCloseWrapper : null,
    style: maskStyle,
    times: 0,
    visible: shown,
    zIndex: getZIndex()
  }) : null, /*#__PURE__*/React__default.createElement(CSSMotion, {
    active: position,
    key: 'body',
    offset: 'open',
    onStart: onStart,
    onEnded: onEnded,
    onRef: onRef,
    visible: shown,
    display: true
  }, /*#__PURE__*/React__default.createElement('div', {
    className: classnames(CSSUtil.modal, className),
    ref: modalRef,
    style: Object.assign({
      width: width,
      height: height,
      zIndex: getZIndex()
    }, style)
  }, title && /*#__PURE__*/React__default.createElement('div', {
    className: classnames('hd', size, theme, headerClassName),
    style: headerStyle
  }, /*#__PURE__*/React__default.createElement('div', {
    className: 'tit'
  }, title), times && /*#__PURE__*/React__default.createElement('div', _defineProperty({
    className: 'cls',
    onClick: timesClosable ? onCloseWrapper : null
  }, typeof times != 'string' ? 'children' : 'dangerouslySetInnerHTML', typeof times != 'string' ? times : {
    __html: times
  }))), children && /*#__PURE__*/React__default.createElement('div', {
    className: classnames('bd', size, bodyClassName),
    style: bodyStyle
  }, children), footer && /*#__PURE__*/React__default.createElement('div', {
    className: classnames('ft', size, footerClassName),
    style: footerStyle
  }, footer)))], container);
};
Modal.defaultProps = {
  times: '&times;',
  timesClosable: true,
  mask: true,
  maskClosable: true,
  placement: 'fade',
  size: 'md',
  width: 300,
  container: document.body
};

if (window.DEV) {
  var TYPE_NS = [propTypes.string, propTypes.number];
  Modal.propTypes = {
    bodyStyle: propTypes.object,
    bodyClassName: propTypes.string,
    theme: propTypes.oneOf(theme),
    title: propTypes.any,
    times: propTypes.any,
    timesClosable: propTypes.bool,
    mask: propTypes.bool,
    maskClosable: propTypes.bool,
    maskStyle: propTypes.any,
    headerStyle: propTypes.object,
    headerClassName: propTypes.string,
    footer: propTypes.any,
    footerStyle: propTypes.object,
    footerClassName: propTypes.string,
    onClose: propTypes.func,
    onHidden: propTypes.func,
    onShow: propTypes.func,
    onShown: propTypes.func,
    visible: propTypes.bool,
    placement: propTypes.oneOf(['top-start', 'top', 'top-end', 'right', 'bottom-start', 'bottom', 'bottom-end', 'left', 'middle', 'fade']),
    width: propTypes.oneOfType(TYPE_NS),
    height: propTypes.oneOfType(TYPE_NS),
    span: propTypes.oneOfType(TYPE_NS)
  };
}

export { Modal };
