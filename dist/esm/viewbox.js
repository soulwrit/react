import { g as _objectWithoutProperties, h as _objectSpread2, _ as _inherits, a as _createSuper, b as _classCallCheck, c as _defineProperty, d as _assertThisInitialized, e as _createClass } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default, { createContext, createElement } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { a as assert_1 } from './assert-cc694573.js';
import { n as noop_1 } from './noop-469b0e21.js';

function createNamedContext(name) {
  var context = /*#__PURE__*/createContext();
  context.displayName = name;
  return context;
}
var context = createNamedContext('viewBox');

function Link(props) {
  var type = props.type,
      value = props.value,
      children = props.children,
      _onClick = props.onClick,
      to = props.to,
      state = props.state,
      rest = _objectWithoutProperties(props, ["type", "value", "children", "onClick", "to", "state"]);

  return /*#__PURE__*/React__default.createElement(context.Consumer, null, function (vbm) {
    assert_1.nuil(vbm, "You should not use <ViewBox.Link> outside a <ViewBox.Provider>");
    return /*#__PURE__*/React__default.createElement(type, _objectSpread2({
      children: value || children,
      onClick: function onClick(e) {
        e.stopPropagation();

        if (_onClick) {
          _onClick(e, vbm);
        }

        vbm.go(to, state);
      }
    }, rest));
  });
}

Link.defaultProps = {
  type: 'span'
};

if (window.DEV) {
  Link.propTypes = {
    to: propTypes.string.isRequired,
    onClick: propTypes.func,
    state: propTypes.object,
    value: propTypes.any
  };
}

function Area(props) {
  return props.children || null;
}

Area.defaultProps = {
  path: void 0,
  children: null,
  component: null
};

if (window.DEV) {
  Area.propTypes = {
    path: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    component: propTypes.any
  };
}

function withViewBox(Component, config) {
  function ComponentWrapper(props) {
    return /*#__PURE__*/createElement(context.Consumer, null, function (vbm) {
      var nextProps = Object.assign({}, config, props, {
        vbm: vbm
      });
      return /*#__PURE__*/createElement(Component, nextProps);
    });
  }

  ComponentWrapper.displayName = "withViewBox(".concat(Component.displayName || Component.name, ")");
  return ComponentWrapper;
}

function createManager(name, dispatch) {
  var ns = new Namespace(name, dispatch);
  return {
    current: undefined,
    back: function back(state) {
      this.current = ns.prev();
      ns.update(this.current, state);
    },
    go: function go(path, state) {
      if (ns.has(path)) {
        this.current = path;
        ns.update(path, state);
        return;
      }

      assert_1["throw"]("viewBox: viewPath(".concat(path, ") does not existed."));
    },
    push: function push(path, state) {
      ns.update(path, state);
    },
    add: function add(path) {
      ns.push(path);
    },
    set: function set(name, dispatch) {
      ns.set(name, dispatch);
    },
    reset: function reset(name, dispatch) {
      ns.reset(name, dispatch);
    }
  };
}

function Namespace(name, dispatch) {
  this.name = name;
  this.dispatch = dispatch;
  this.paths = [];
  this.index = 0; // this.set(name, dispatch);
}

Namespace.prototype.has = function hasPath(path) {
  return this.paths.includes(path);
};

Namespace.prototype.push = function pushPath(path) {
  if (this.has(path)) {
    return;
  }

  assert_1.truly(typeof path === 'string' && path.trim().length > 0, 'InvalidViewPath - the `path` must be a not-empty-string.');
  this.paths.push(path);
};

Namespace.prototype.prev = function prevPath() {
  this.index--;

  if (this.index < 0) {
    this.index = 0;
  }

  return this.paths[this.index];
};

Namespace.prototype.update = function updateView(path, state) {
  this.index = this.paths.indexOf(path);

  if (this.index === -1) {
    this.push(path);
    this.index = this.paths.length - 1;
  }

  this.dispatch(path, state);
};

Namespace.prototype.set = function setUpdate(name, dispatch) {
  assert_1.truly(!!name && typeof name === 'string', 'box-name must be a valid(not empty) string.');
  assert_1.truly(typeof dispatch === 'function', 'viewBox update must a function.');
  this.name = name;
  this.dispatch = dispatch;
};

Namespace.prototype.reset = function resetUpdate(name, dispatch) {
  this.set(name, dispatch);
  this.paths = [];
  this.index = 0;
};

function createViewBox(Component, config) {
  var ProviderWrapper = function ProviderWrapper(props) {
    var nextProps = Object.assign({}, config, props);
    var vbm = createManager();
    return /*#__PURE__*/createElement(context.Provider, {
      value: vbm
    }, /*#__PURE__*/createElement(Component, nextProps));
  };

  return ProviderWrapper;
}

function Provider(props) {
  var children = props.children,
      name = props.name,
      onChange = props.onChange;
  var vbm = createManager(name, onChange);
  return /*#__PURE__*/createElement(context.Provider, {
    value: vbm
  }, children);
}

Provider.defaultProps = {
  children: null,
  name: void 0,
  onChange: void 0
};

if (window.DEV) {
  Provider.propTypes = {
    children: propTypes.any,
    name: propTypes.string,
    onChange: propTypes.func
  };
}

var ViewBox = /*#__PURE__*/function (_React$Component) {
  _inherits(ViewBox, _React$Component);

  var _super = _createSuper(ViewBox);

  // static getDerivedStateFromProps(nextProps, nextState, ) { 
  //     if (has(nextProps, 'path')) {
  //         if (nextProps.path === nextState.ctrl) {
  //             return nextState;
  //         }
  //         return {
  //             path: nextProps.path,
  //             ctrl: nextProps.path,
  //             data: nextProps.state || nextState.data
  //         };
  //     }
  //     return nextState;
  // }
  function ViewBox(props, context) {
    var _this;

    _classCallCheck(this, ViewBox);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "onChange", function (path, state) {
      _this.setState({
        path: path,
        data: state
      }, _this.props.onChange);
    });

    _this.state = {
      path: props.path,
      data: props.state // ctrl: props.path

    };
    assert_1.nuil(context, "You should not use <ViewBox> outside a <ViewBox.Provider>");
    context.set(props.name, _this.onChange);
    context.current = props.path;
    return _this;
  }

  _createClass(ViewBox, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      var currentPath = this.state.path;
      var currentData = this.state.data;
      var ctx = this.context;
      var match, props;
      React__default.Children.forEach(children, function (child) {
        assert_1.truly(child && child.type === Area, "You should not use <ViewBox.Area> outside a <ViewBox>");
        var _child$props = child.props,
            path = _child$props.path,
            component = _child$props.component,
            state = _child$props.state;
        ctx.add(path);

        if (ctx.current ? path === ctx.current : path === currentPath) {
          match = component;
          props = state;
        }
      });
      return match ? /*#__PURE__*/React__default.createElement(match, Object.assign({}, props, currentData)) : null;
    }
  }]);

  return ViewBox;
}(React__default.Component);

_defineProperty(ViewBox, "Provider", Provider);

_defineProperty(ViewBox, "Area", Area);

_defineProperty(ViewBox, "Link", Link);

_defineProperty(ViewBox, "contextType", context);

_defineProperty(ViewBox, "defaultProps", {
  onChange: noop_1
});

if (window.DEV) {
  ViewBox.propTypes = {
    name: propTypes.string.isRequired,
    path: Area.propTypes.path,
    onChange: propTypes.func
  };
}

export { Area as ViewArea, ViewBox, Provider as ViewBoxProvider, Link as ViewLink, createViewBox, withViewBox };
