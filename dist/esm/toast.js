import { f as _slicedToArray, i as _typeof, a as _inherits, b as _createSuper, d as _classCallCheck, c as _createClass } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default, { useRef, useState, useEffect } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil, M as MQ_Breakpoints, t as theme } from './dependency-8ea69cb4.js';
import { n as noop_1 } from './noop-469b0e21.js';
import { o as objectHasOwn } from './object-has-own-6b83c90b.js';
import ReactDOM from 'react-dom';
import { a as assert_1 } from './assert-cc694573.js';
import './raf-4503f6a0.js';
import './css-animate-93e47d39.js';
import { C as CSSMotion } from './CSSMotion-f1b5afe8.js';

var cached = new Map();
function createContainer(position) {
  if (cached.has(position)) {
    return cached.get(position);
  }

  var container = document.createElement('div');
  var bridge = Object.create(null);
  container.className = [CSSUtil.toast, position].join(' ');
  document.body.appendChild(container);
  cached.set(position, [container, bridge]);
  return [container, bridge];
}
function removeContainer(position) {
  if (cached.has(position)) {
    var _cached$get = cached.get(position),
        _cached$get2 = _slicedToArray(_cached$get, 2),
        container = _cached$get2[0],
        bridge = _cached$get2[1];

    document.body.removeChild(container);
    bridge.instance = null;
    return cached["delete"](position);
  }

  assert_1["throw"]('Container does existed, or has be removed.');
}

function getKey() {
  var index = 0;

  getKey = function _getKey() {
    return 'toast'.concat(++index);
  };

  return getKey();
}

var position = ['top-start', 'top', 'top-end', // 'right', 'left', 'middle', 'fade',
'bottom-start', 'bottom', 'bottom-end'];
var DEFAULT = {
  autoClose: true,
  duration: 5000,
  onClose: noop_1,
  position: 'top-end',
  size: 'md',
  space: 16,
  type: 'error',
  value: 'message'
};
var mergeProps = function mergeProps(options, targetObj, hasDefault) {
  var target = targetObj || DEFAULT;

  switch (_typeof(options)) {
    case 'function':
      target.onClose = options;
      break;

    case 'number':
      target.duration = options;
      break;

    case 'string':
      {
        if (MQ_Breakpoints.includes(options)) {
          target.size = options;
          break;
        }

        target.position = options;
        break;
      }

    case 'object':
      {
        for (var key in options) {
          if (DEFAULT.hasOwnProperty(key) && typeof options[key] !== 'undefined') {
            target[key] = options[key];
          }
        }
      }
  }

  if (hasDefault) {
    for (var _key in DEFAULT) {
      if (!objectHasOwn(target, _key) || typeof target[_key] === 'undefined') {
        target[_key] = DEFAULT[_key];
      }
    }
  }

  return target;
};

function Queue() {
  assert_1.truly(this instanceof Queue, 'Queue is a constructor, must new.');
  this.nodes = [];
}

Queue.prototype.get = function get() {
  return [].concat(this.nodes);
};

Queue.prototype.append = function append(inst) {
  var nodes = this.nodes;
  assert_1.truly(nodes.indexOf(inst) === -1, 'Queue member has be existed.');
  nodes.push(inst);
};

Queue.prototype.remove = function remove(inst) {
  var nodes = this.nodes;
  var index = nodes.indexOf(inst);
  assert_1.truly(index > -1, 'Queue member does existed.');
  nodes.splice(index, 1);
};

var Layer = /*#__PURE__*/function (_React$Component) {
  _inherits(Layer, _React$Component);

  var _super = _createSuper(Layer);

  function Layer(props) {
    var _this;

    _classCallCheck(this, Layer);

    _this = _super.call(this);
    _this.queue = new Queue();

    _this.queue.append(props.first);

    _this.state = {
      queue: _this.queue.get()
    };
    return _this;
  }

  _createClass(Layer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.onRef(this);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var queue = this.state.queue;

      if (queue.length === 0) {
        this.props.unmonut(); // 卸载组件
      }
    }
  }, {
    key: "add",
    value: function add(node) {
      this.queue.append(node);
      this.setState({
        queue: this.queue.get()
      });
    }
  }, {
    key: "remove",
    value: function remove(node) {
      this.queue.remove(node);
      this.setState({
        queue: this.queue.get()
      });
    }
  }, {
    key: "render",
    value: function render() {
      return this.state.queue;
    }
  }]);

  return Layer;
}(React__default.Component);

var Toast = function Toast(props) {
  var autoClose = props.autoClose,
      children = props.children,
      className = props.className,
      duration = props.duration,
      height = props.height,
      onClose = props.onClose,
      size = props.size,
      style = props.style,
      type = props.type,
      value = props.value,
      width = props.width;
  var toastRef = useRef();
  var timerRef = useRef();

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var close = function close(e) {
    if (!autoClose) {
      return;
    }

    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    setVisible(false);
  }; // pause


  var pause = function pause() {
    if (timerRef.current != null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }; // restart


  var restart = function restart() {
    if (timerRef.current == null) {
      timerRef.current = setTimeout(close, duration);
    }
  };

  useEffect(function () {
    timerRef.current = setTimeout(close, duration);
    return function () {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);
  useEffect(function () {
    if (visible === false) {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [visible]);
  return /*#__PURE__*/React__default.createElement(CSSMotion, {
    active: void 0,
    offset: 'open',
    display: false,
    onStart: function onStart() {
      return true;
    },
    onEnded: function onEnded() {
      console.log('Toast isEnter', visible);

      if (visible === false) {
        if (autoClose) {
          onClose();
        }
      }
    },
    onRef: function onRef() {
      return toastRef.current;
    },
    visible: visible
  }, /*#__PURE__*/React__default.createElement('div', {
    className: classnames('wrap', size, type, className),
    ref: toastRef,
    onMouseEnter: pause,
    onMouseLeave: restart,
    style: Object.assign({
      width: width,
      height: height
    }, style)
  }, value || children));
};
Toast.defaultProps = DEFAULT;

if (window.DEV) {
  Toast.propTypes = {
    autoClose: propTypes.bool,
    duration: propTypes.number,
    onClose: propTypes.func,
    position: propTypes.oneOf(position),
    type: propTypes.oneOf(theme),
    value: propTypes.any,
    size: propTypes.oneOf(MQ_Breakpoints),
    space: propTypes.number
  };
}

function toast(content, type, options) {
  var key = getKey();
  var props = {
    type: type,
    value: content
  };
  mergeProps(options, props, true);
  var userOnClose = props.onClose;
  var position = props.position;
  props.key = key;

  props.onClose = function onEnd() {
    console.log('Toast Unmount.');
    bridge.instance.remove(element);
    typeof userOnClose === 'function' && userOnClose();
  };

  var _createContainer = createContainer(position),
      _createContainer2 = _slicedToArray(_createContainer, 2),
      container = _createContainer2[0],
      bridge = _createContainer2[1];

  var element = /*#__PURE__*/React__default.createElement(Toast, props);

  if (objectHasOwn(bridge, 'instance')) {
    bridge.instance.add(element);
  } else {
    ReactDOM.render( /*#__PURE__*/React__default.createElement(Layer, {
      first: element,
      onRef: function onRef(instance) {
        bridge.instance = instance;
      },
      unmonut: function unmonut() {
        console.log('Layer Unmount.');
        removeContainer(position);
      }
    }), container);
  }
}

toast.secondary = function secondary(content, options) {
  toast(content, 'secondary', options);
};

toast.error = function error(content, options) {
  toast(content, 'error', options);
};

toast.info = function info(content, options) {
  toast(content, 'info', options);
};

toast.success = function success(content, options) {
  toast(content, 'success', options);
};

toast.warn = function warning(content, options) {
  toast(content, 'warning', options);
};

toast.fatal = function danger(content, options) {
  toast(content, 'danger', options);
};

toast.darken = function dark(content, options) {
  toast(content, 'dark', options);
};

toast.config = function config(options) {
  void mergeProps(options);
};

export { toast };
