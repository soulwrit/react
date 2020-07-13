import { f as _slicedToArray } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default, { useContext, useState, useEffect } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import './index-dc594463.js';
import './dependency-8ea69cb4.js';
import './noop-469b0e21.js';
import './object-has-own-6b83c90b.js';
import './Model-6a5cfb7c.js';
import { Input } from './input.js';
import ReactDOM from 'react-dom';
import { a as assert_1 } from './assert-cc694573.js';
import './raf-4503f6a0.js';
import { Button } from './button.js';
import { Flex, FlexItem } from './flex.js';
import './css-animate-93e47d39.js';
import './CSSMotion-f1b5afe8.js';
import './mask.js';
import { Modal } from './modal.js';
import { C as ConfigContext } from './Context-859f32e3.js';

function mount(element, callback) {
  var dDiv = document.createElement('div');
  document.body.append(dDiv);
  ReactDOM.render(element, dDiv, function () {
    typeof callback === 'function' && callback(dDiv);
  });
  return function () {
    unmount(dDiv);
  };
}
function unmount(container, isDeleteContainer) {
  var isUnmounted = ReactDOM.unmountComponentAtNode(container);

  if (isUnmounted === false) {
    assert_1.report(new Error('Failed to unload element from specified node'));
  }

  if (isDeleteContainer === false) {
    return;
  }

  try {
    document.body.removeChild(container);
  } catch (error) {}
}

var Alert = function Alert(props) {
  var onClose = props.onClose,
      subTitle = props.subTitle,
      title = props.title;

  var _useContext = useContext(ConfigContext),
      appTitle = _useContext.appTitle;

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var onCloseWrapper = function onCloseWrapper() {
    setVisible(false);
  };

  useEffect(function () {
    if (visible === false) {
      onClose && onClose();
    }
  }, [visible]);
  return /*#__PURE__*/React__default.createElement(Modal, {
    escOut: false,
    maskClosable: false,
    onClose: onCloseWrapper,
    visible: visible,
    width: 420
  }, /*#__PURE__*/React__default.createElement(Flex, {
    dir: "ttr"
  }, /*#__PURE__*/React__default.createElement(FlexItem, {
    shrink: 0,
    className: "hdbar"
  }, /*#__PURE__*/React__default.createElement("h6", null, title || appTitle)), /*#__PURE__*/React__default.createElement(FlexItem, {
    shrink: 0,
    className: "bdbar"
  }, subTitle), /*#__PURE__*/React__default.createElement(FlexItem, {
    shrink: 0,
    className: "ftbar"
  }, /*#__PURE__*/React__default.createElement(Button, {
    onClick: onCloseWrapper
  }, "\u786E\u5B9A"))));
};
Alert.defaultProps = {};

if (window.DEV) {
  Alert.propTypes = {
    onClose: propTypes.func,
    subTitle: propTypes.any,
    title: propTypes.any
  };
}

var Confirm = function Confirm(props) {
  var onClose = props.onClose,
      subTitle = props.subTitle,
      title = props.title;

  var _useContext = useContext(ConfigContext),
      appTitle = _useContext.appTitle;

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var onCloseWrapper = function onCloseWrapper() {
    setVisible(false);
    setValue(false);
  };

  var onOKWrapper = function onOKWrapper() {
    setVisible(false);
    setValue(true);
  };

  useEffect(function () {
    if (visible === false) {
      onClose && onClose(value);
    }
  }, [value, visible]);
  return /*#__PURE__*/React__default.createElement(Modal, {
    escOut: false,
    maskClosable: false,
    onClose: onCloseWrapper,
    visible: visible,
    width: 420
  }, /*#__PURE__*/React__default.createElement(Flex, {
    dir: "ttr"
  }, /*#__PURE__*/React__default.createElement(FlexItem, {
    shrink: 0,
    className: "hdbar"
  }, /*#__PURE__*/React__default.createElement("h6", null, title || appTitle)), /*#__PURE__*/React__default.createElement(FlexItem, {
    shrink: 0,
    className: "bdbar"
  }, subTitle), /*#__PURE__*/React__default.createElement(FlexItem, {
    shrink: 0,
    className: "ftbar"
  }, /*#__PURE__*/React__default.createElement(Button, {
    onClick: onOKWrapper
  }, "\u786E\u5B9A"), /*#__PURE__*/React__default.createElement(Button, {
    onClick: onCloseWrapper,
    theme: "muted"
  }, "\u53D6\u6D88"))));
};
Confirm.defaultProps = {};

if (window.DEV) {
  Confirm.propTypes = {
    onClose: propTypes.func,
    subTitle: propTypes.any,
    title: propTypes.any
  };
}

var Prompt = function Prompt(props) {
  var defaultValue = props.defaultValue,
      onCancel = props.onCancel,
      onOK = props.onOK,
      subTitle = props.subTitle,
      title = props.title;

  var _useContext = useContext(ConfigContext),
      appTitle = _useContext.appTitle;

  var _useState = useState(defaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      visible = _useState4[0],
      setVisible = _useState4[1];

  var _useState5 = useState(-1),
      _useState6 = _slicedToArray(_useState5, 2),
      type = _useState6[0],
      setType = _useState6[1];

  var onCloseWrapper = function onCloseWrapper() {
    setVisible(false);
    setType(0);
  };

  var onOKWrapper = function onOKWrapper() {
    setVisible(false);
    setType(1);
  };

  useEffect(function () {
    if (visible === false) {
      switch (type) {
        case 0:
          onCancel && onCancel();
          break;

        case 1:
          onOK && onOK(value);
          break;
      }
    }
  }, [visible, type]);
  return /*#__PURE__*/React__default.createElement(Modal, {
    escOut: false,
    maskClosable: false,
    onClose: onCloseWrapper,
    visible: visible,
    width: 420
  }, /*#__PURE__*/React__default.createElement(Flex, {
    dir: "ttr"
  }, /*#__PURE__*/React__default.createElement(FlexItem, {
    shrink: 0,
    className: "hdbar"
  }, /*#__PURE__*/React__default.createElement("h6", null, title || appTitle)), /*#__PURE__*/React__default.createElement(FlexItem, {
    shrink: 0,
    className: "bdbar"
  }, subTitle), /*#__PURE__*/React__default.createElement(FlexItem, {
    shrink: 0,
    className: "ftbar"
  }, /*#__PURE__*/React__default.createElement(Input, {
    value: defaultValue,
    width: "100%",
    onChange: setValue
  }), /*#__PURE__*/React__default.createElement("p", {
    style: {
      marginTop: '1em'
    }
  }, /*#__PURE__*/React__default.createElement(Button, {
    onClick: onOKWrapper
  }, "\u786E\u5B9A"), /*#__PURE__*/React__default.createElement(Button, {
    onClick: onCloseWrapper,
    theme: "muted"
  }, "\u53D6\u6D88")))));
};
Prompt.defaultProps = {};

if (window.DEV) {
  Prompt.propTypes = {
    onCancel: propTypes.func,
    onOK: propTypes.func,
    subTitle: propTypes.any,
    title: propTypes.any
  };
}

function prompt(message, defaultValue, title) {
  return new Promise(function (resolve, reject) {
    var element = /*#__PURE__*/React__default.createElement(Prompt, {
      title: title,
      defaultValue: defaultValue,
      subTitle: message,
      onOK: function onOK(value) {
        resolve(value);
      },
      onCancel: function onCancel() {
        unmount();
        reject();
      }
    });
    var unmount = mount(element);
  })["catch"](function () {
    return void 0;
  });
}
function alert(message, title) {
  return new Promise(function (resolve) {
    var element = /*#__PURE__*/React__default.createElement(Alert, {
      title: title,
      subTitle: message,
      onClose: function onClose() {
        resolve();
        unmount();
      }
    });
    var unmount = mount(element);
  })["catch"](function () {
    return void 0;
  });
}
function confirm(message, title) {
  return new Promise(function (resolve) {
    var element = /*#__PURE__*/React__default.createElement(Confirm, {
      title: title,
      subTitle: message,
      onClose: function onClose(value) {
        resolve(value);
        unmount();
      }
    });
    var unmount = mount(element);
  })["catch"](function () {
    return false;
  });
}

export { alert, confirm, prompt };
