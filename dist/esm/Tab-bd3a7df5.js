import { _ as _inherits, a as _createSuper, b as _classCallCheck, c as _defineProperty, d as _assertThisInitialized, e as _createClass } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { a as directories, M as MQ_Breakpoints, C as CSSUtil } from './dependency-8ea69cb4.js';
import { n as noop_1 } from './noop-469b0e21.js';
import { o as objectHasOwn } from './object-has-own-6b83c90b.js';

/**
 * 向上查找属性
 * @param {HTMLElement} elem 
 * @param {string} attr 
 * @param {HTMLElement} root 
 */
function lookupAttr(elem, attr, root) {
  let value;

  while (elem) {
    value = elem.getAttribute(attr);
    elem = value ? null : elem.parentElement;
    if (elem === root) return value;
  }

  return value;
}

var Extra = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children,
      style = props.style;
  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames('extra', className),
    ref: ref,
    style: style
  }, children);
});

var Pane = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  // 儿子去睡觉吧，爹以后再也不去找小桃红了，等你长大了，让她给你当小妾 ... ... 哈哈哈哈哈。。。。。。大笑
  var adder = props.adder,
      className = props.className,
      children = props.children,
      dref = props.dref,
      extra = props.extra,
      isWrapper = props.isWrapper,
      proxy = props.proxy,
      onClick = props.onClick,
      style = props.style;
  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames('pane', className),
    children: [/*#__PURE__*/React__default.createElement('div', {
      className: isWrapper ? 'wrapper' : 'action',
      key: 'wrp',
      onClick: proxy ? onClick : null,
      ref: dref
    }, children), adder ? adder : null, extra ? /*#__PURE__*/React__default.createElement(Extra, {
      key: 'ext'
    }, extra) : null],
    ref: ref,
    style: style
  });
});

if (window.DEV) {
  Pane.propTypes = {
    adder: propTypes.any,
    extra: propTypes.any,
    isWrapper: propTypes.bool,
    proxy: propTypes.bool
  };
}

var Tab = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      dataIndex = props.dataIndex,
      onClick = props.onClick,
      style = props.style;
  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames('i', className),
    'data-index': dataIndex,
    onClick: onClick,
    style: style,
    ref: ref
  }, children);
});

if (window.DEV) {
  Tab.propTypes = {
    index: propTypes.oneOfType([propTypes.string, propTypes.number]),
    onClick: propTypes.func,
    style: propTypes.object
  };
}

var Content = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      style = props.style;
  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames('cnt', className),
    ref: ref,
    style: style
  }, children);
});

if (window.DEV) {
  Content.propTypes = {
    className: propTypes.string,
    children: propTypes.any,
    style: propTypes.object
  };
}

var Item = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      style = props.style;
  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames('i', className),
    ref: ref,
    style: style
  }, children);
});

if (window.DEV) {
  Item.propTypes = {
    index: propTypes.oneOfType([propTypes.string, propTypes.number])
  };
}

var Tabs = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Tabs, _React$PureComponent);

  var _super = _createSuper(Tabs);

  function Tabs(props) {
    var _this;

    _classCallCheck(this, Tabs);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "setIndex", function (index) {
      if (index == null) {
        return;
      }

      _this.setState({
        index: index
      }, function () {
        _this.props.onChange(index);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function (index) {
      return function (e) {
        e.stopPropagation();

        _this.setIndex(index);
      };
    });

    _this.state = {
      index: props.index,
      prior: props.index
    };
    _this.paneRef = null;
    return _this;
  }

  _createClass(Tabs, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          extra = _this$props.extra,
          mode = _this$props.mode,
          size = _this$props.size,
          style = _this$props.style;
      var activeIndex = this.state.index;
      return /*#__PURE__*/React__default.createElement('div', {
        className: classnames(CSSUtil.tab, mode, className),
        style: style
      }, React__default.Children.map(children, function (N, nKey) {
        if (!N) return null;
        var isPane;

        switch (N.type) {
          case Pane:
            {
              isPane = true;
              break;
            }

          case Content:
            break;

          default:
            return null;
        }

        var _N$props = N.props,
            children = _N$props.children,
            proxy = _N$props.proxy;
        var onProxy = isPane && proxy ? function (e) {
          e.stopPropagation();

          _this2.setIndex(lookupAttr(e.target, 'data-index', _this2.paneRef));
        } : null;
        return /*#__PURE__*/React__default.cloneElement(N, {
          extra: isPane ? /*#__PURE__*/React__default.createElement(Extra, {
            className: size
          }, N.props.extra || extra) : null,
          key: nKey,
          dref: isPane ? function (elem) {
            return _this2.paneRef = elem;
          } : null,
          onClick: onProxy
        }, React__default.Children.map(children, function (M, mKey) {
          if (!M) return null;
          var isTab;

          switch (M.type) {
            case Tab:
              {
                isTab = true;
                break;
              }

            case Item:
              break;

            default:
              return null;
          }

          var _M$props = M.props,
              className = _M$props.className,
              index = _M$props.index;
          var name = index || mKey;
          var isActive = activeIndex == name;
          var activeClassName = CSSUtil.activate(isActive);

          if (isTab) {
            return /*#__PURE__*/React__default.cloneElement(M, {
              className: classnames(className, size, activeClassName),
              dataIndex: onProxy ? name : null,
              key: mKey,
              onClick: onProxy ? null : _this2.onClick(name)
            });
          }

          return isActive ? /*#__PURE__*/React__default.cloneElement(M, {
            className: classnames(className, size, activeClassName),
            key: mKey
          }) : null;
        }));
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, nextState) {
      if (!objectHasOwn(nextProps, 'index')) return nextState;
      var propsIndex = nextProps.index;
      if (propsIndex == null) return nextState;
      var priorIndex = nextState.prior;
      return priorIndex != propsIndex ? {
        index: propsIndex,
        prior: propsIndex
      } : nextState;
    }
  }]);

  return Tabs;
}(React__default.PureComponent);
Tabs.Pane = Pane;
Tabs.Tab = Tab;
Tabs.Content = Content;
Tabs.Item = Item;
Tabs.defaultProps = {
  index: 0,
  mode: directories[1],
  onChange: noop_1,
  size: 'md'
};

if (window.DEV) {
  Tabs.propTypes = {
    mode: propTypes.oneOf(directories),
    index: propTypes.oneOfType([propTypes.string, propTypes.number]),
    onChange: propTypes.func,
    size: propTypes.oneOf(MQ_Breakpoints)
  };
}

export { Content as C, Item as I, Pane as P, Tab as T, Tabs as a };
