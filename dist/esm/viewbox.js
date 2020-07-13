import { i as _typeof, g as _objectWithoutProperties, h as _objectSpread2, a as _inherits, b as _createSuper, d as _classCallCheck, _ as _defineProperty, e as _assertThisInitialized, c as _createClass } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { n as noop_1 } from './noop-469b0e21.js';
import { a as assert_1 } from './assert-cc694573.js';

function createNamedContext(name) {
  var context = /*#__PURE__*/React__default.createContext();
  context.displayName = name;
  return context;
}
var context = createNamedContext('viewBox');

function createManager(change) {
  var stack = [];
  var paths = [];
  var event = {};
  return {
    index: 0,

    get current() {
      return this._current;
    },

    set current(path) {
      var _this = this;

      if (paths.indexOf(path) === -1) {
        throw new Error('Path does not existed.');
      }

      this.getValidPath(path, {
        string: function string() {
          for (var i = 0, item = stack[i]; !!item; item = stack[i++]) {
            if (item.path === path) {
              _this.index = i;
              _this._current = item;
              break;
            }
          }
        },
        number: function number() {
          if (path < stack.length) {
            _this.index = path;
            _this._current = stack[path];
          }
        }
      });
    },

    next: function next(state) {
      this.index++;

      if (this.index > stack.length - 1) {
        return; // 上边际;
      }

      this.go(this.index, state);
    },
    prev: function prev(state) {
      this.index--;

      if (this.index < 0) {
        return; // 下边界
      }

      this.go(this.index, state);
    },
    go: function go(path, state) {
      this.current = path;

      if (this.current) {
        this.current.state = Object.assign({}, this.current.state, state);
        this.emit(this.current.name);
      }

      typeof change === 'function' ? change(this) : console.warn('No via VBM.Provider-onChange listener;');
    },

    /**
     * @param {string}  name 
     * @param {string}  path
     * @param {object}  state
     */
    push: function push(name, path, state) {
      if (paths.indexOf(path) > -1) {
        return;
      }

      assert_1.truly(!!name && typeof name === 'string', 'namespace’s name must be a valid(not empty) string.');
      assert_1.truly(_typeof(path) === 'object' && path, 'View must be an object, eg: {path: <String>, state: <Object> }');
      path = this.getValidPath(path);
      stack.push({
        name: name,
        path: path,
        state: state
      });
      paths.push(path);
    },
    getValidPath: function getValidPath(path) {
      var visitor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        string: noop_1,
        number: noop_1
      };

      if (paths.indexOf(paths) > -1) {
        throw new Error('ViewPath already be existed.');
      }

      switch (_typeof(path)) {
        case 'string':
          visitor.string(path);
          break;

        case 'number':
          visitor.number(path);
          break;

        case 'function':
          path = path(this);
          path = this.getValidPath(path);

        default:
          {
            throw new Error('InvalidViewPath - the `path` can be a string or number or a return `number or string` function.');
          }
      }

      return path;
    },
    on: function on(name, listen) {
      assert_1.truly(!!name && typeof name === 'string', 'Listen-name must be a valid(not empty) string.');
      assert_1.truly(typeof listen === 'function', 'Listen-handle must a function.');
      event[name] = listen;
    },
    emit: function emit(name) {
      typeof event[name] === 'function' && event[name](this);
    },
    off: function off(name) {
      delete event[name];
    }
  };
}

function Link(props) {
  var type = props.type,
      value = props.value,
      _children = props.children,
      _onClick = props.onClick,
      to = props.to,
      state = props.state,
      _props = _objectWithoutProperties(props, ["type", "value", "children", "onClick", "to", "state"]);

  return /*#__PURE__*/React__default.createElement(context.Consumer, {
    children: function children(vbm) {
      assert_1.nuil(vbm, "You should not use <ViewBox.Link> outside a <ViewBox.Provider>");
      return /*#__PURE__*/React__default.createElement(type, _objectSpread2({
        children: value || _children,
        onClick: function onClick(e) {
          e.stopPropagation();

          if (_onClick) {
            _onClick(e, vbm);
          }

          vbm.go(to, state);
        }
      }, _props));
    }
  });
}

Link.defaultProps = {
  type: 'span'
};

if (window.DEV) {
  Link.propTypes = {
    to: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    onClick: propTypes.func,
    state: propTypes.object
  };
}

function Area(props) {
  return props.children || null;
}

if (window.DEV) {
  Area.propTypes = {
    path: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    component: propTypes.any
  };
}

function Consumer(props) {
  return /*#__PURE__*/React__default.createElement(context.Consumer, {
    children: function children(vbm) {
      return React__default.Children.map(props.children, function (Item, index) {
        if (!Item) {
          throw new Error('View Child must be a valid reactNode.');
        }

        return /*#__PURE__*/React__default.cloneElement(Item, {
          vbm: vbm,
          key: index
        });
      });
    }
  });
}

function Provider(props) {
  return /*#__PURE__*/React__default.createElement(context.Provider, {
    value: createManager(props.onChange),
    children: props.children
  });
}

var ViewBox = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ViewBox, _React$PureComponent);

  var _super = _createSuper(ViewBox);

  function ViewBox(props) {
    var _this;

    _classCallCheck(this, ViewBox);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "onPath", function (vbm) {
      if (vbm.current) {
        _this.setState({
          current: Object.assign({}, vbm.current)
        });
      }
    });

    _this.state = {
      current: {
        path: props.path,
        name: props.name
      }
    };
    return _this;
  }

  _createClass(ViewBox, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      this.setState({
        current: {
          path: props.path,
          name: props.name
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (React__default.Children.count(this.props.children)) {
        var current = this.state.current;
        return /*#__PURE__*/React__default.createElement(context.Consumer, {
          children: function children(vbm) {
            assert_1.nuil(vbm, "You should not use <ViewBox> outside a <ViewBox.Provider>");
            vbm.on(_this2.props.name, _this2.onPath);
            var match, props;
            React__default.Children.forEach(_this2.props.children, function (child) {
              assert_1.truly(child && child.type === Area, "You should not use <ViewBox.Area> outside a <ViewBox>");
              var _child$props = child.props,
                  path = _child$props.path,
                  component = _child$props.component,
                  state = _child$props.state;
              vbm.push(current.name, path, state);

              if (vbm.current ? path === vbm.current.path : path === current.path) {
                match = component;
                props = state;
              }
            });
            return match ? /*#__PURE__*/React__default.createElement(match, Object.assign({}, props, vbm.current ? vbm.current.state : null)) : /*#__PURE__*/React__default.createElement('div', _this2.props.empty);
          }
        });
      }

      return /*#__PURE__*/React__default.createElement('div', null, this.props.empty);
    }
  }]);

  return ViewBox;
}(React__default.PureComponent);

_defineProperty(ViewBox, "Provider", Provider);

_defineProperty(ViewBox, "Consumer", Consumer);

_defineProperty(ViewBox, "Area", Area);

_defineProperty(ViewBox, "Link", Link);

_defineProperty(ViewBox, "defaultProps", {
  empty: {
    children: '这是一个空盒子！'
  }
});

if (window.DEV) {
  Provider.propTypes = {
    onChange: propTypes.func
  };
  ViewBox.propTypes = {
    name: propTypes.string.isRequired,
    path: Area.propTypes.path,
    onChange: propTypes.func
  };
}

export { Consumer, Provider, Area as ViewArea, ViewBox, Link as ViewLink };
