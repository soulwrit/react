import { _ as _inherits, a as _createSuper, b as _classCallCheck, c as _defineProperty, d as _assertThisInitialized, e as _createClass, i as _typeof, h as _objectSpread2 } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { M as MQ_Breakpoints, t as theme, C as CSSUtil } from './dependency-8ea69cb4.js';
import { Editable } from './editable.js';
import { a as assertConsole } from './assert-console-9d788aa1.js';

/**
 * 数组遍历
 * @param {array} array
 * @param {function} callback 
 */

function each(array, callback) {
  if (typeof callback !== 'function') {
    throw new Error('Array each callback must be a function.');
  }

  for (let i = 0; i < array.length; i++) {
    switch (callback(array[i], i, array)) {
      case true:
        continue;

      case false:
        return;
    }
  }
}

var arrayEach = each;

var ElegantEditor = /*#__PURE__*/function (_React$Component) {
  _inherits(ElegantEditor, _React$Component);

  var _super = _createSuper(ElegantEditor);

  function ElegantEditor(props) {
    var _this;

    _classCallCheck(this, ElegantEditor);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "onHeaderRef", function (element) {
      _this.headerRef = element;
    });

    _defineProperty(_assertThisInitialized(_this), "onEditorRef", function (element) {
      _this.editorRef = element;
    });

    _defineProperty(_assertThisInitialized(_this), "onFooterRef", function (element) {
      _this.footerRef = element;
    });

    _this.state = {
      builtIns: null
    };

    _this.loadBuiltIns(props.builtInsLoad);

    _this.headerRef = null;
    _this.editorRef = null;
    _this.footerRef = null;
    _this.master = {
      refs: {
        header: _this.headerRef,
        editor: _this.editorRef,
        footer: _this.footerRef
      },
      builtIns: _this.state.builtIns,
      builtInsLoad: props.builtInsLoad,
      toolbar: props.toolbar,
      iconStyle: props.iconStyle
    };
    return _this;
  }

  _createClass(ElegantEditor, [{
    key: "loadBuiltIns",
    value: function loadBuiltIns(builtInsLoad) {
      var _this2 = this;

      if (builtInsLoad) {
        return import('./default-fee1340d.js').then(function (res) {
          _this2.setState({
            builtIns: res["default"]
          });
        })["catch"](function (err) {
          return assertConsole(false, err);
        });
      }
    }
    /**
     * @param {Array} builtIns 
     * @param {Array} toolbar 
     */

  }, {
    key: "customMade",
    value: function customMade(builtIns, toolbar) {
      if (toolbar.length === 0) return builtIns;
      var results = [];
      toolbar.forEach(function (item) {
        if (!item) {
          return;
        }

        switch (_typeof(item)) {
          case 'string':
            {
              arrayEach(builtIns, function (value) {
                if (value.name === item) {
                  return results.push(value);
                }
              });
            }
            break;

          case 'object':
            {
              var included;
              arrayEach(builtIns, function (value) {
                if (item.override && value.name === item.name) {
                  included = true;
                  return results.push(Object.assign(value, item));
                }
              });

              if (included == null) {
                results.push(item);
              }
            }
            break;
        }
      });
      return results;
    }
  }, {
    key: "getToolbar",
    value: function getToolbar() {
      var _this3 = this;

      var toolbar = this.props.toolbar;

      if (this.props.builtInsLoad) {
        if (!this.state.builtIns) {
          return this.props.builtInsLoading;
        }

        toolbar = this.customMade(this.state.builtIns, toolbar);
      }

      this.master.toolbar = toolbar;
      return toolbar.map(function (option, index) {
        return option.visible === false ? null : /*#__PURE__*/React__default.createElement('div', _objectSpread2({
          className: classnames('i', option.className, CSSUtil.disable(option.disabled)),
          children: option.view(_this3.master, option.props) || null,
          key: index
        }, option.props));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      return /*#__PURE__*/React__default.createElement('div', {
        className: classnames(CSSUtil.elegantEditor, props.theme, props.className),
        children: [/*#__PURE__*/React__default.createElement('div', {
          key: 0,
          className: classnames('hd', props.size),
          children: this.getToolbar(),
          ref: this.onHeaderRef
        }), /*#__PURE__*/React__default.createElement(Editable, {
          className: 'bd',
          key: 1,
          onChange: props.onChange,
          onRef: this.onEditorRef,
          size: props.size,
          theme: null,
          value: props.value
        }), props.foot ? /*#__PURE__*/React__default.createElement('div', {
          className: classnames('ft', props.size),
          children: (typeof props.foot === 'function' ? props.foot(this.master) : props.foot) || null,
          key: 2,
          ref: this.onFooterRef
        }) : null],
        style: props.style
      });
    }
  }]);

  return ElegantEditor;
}(React__default.Component);

ElegantEditor.defaultProps = {
  builtInsLoad: true,
  builtInsLoading: '正在加载默认的内置菜单，请稍等 ... ...',
  size: 'md',
  theme: 'muted',
  toolbar: []
};

if (window.DEV) {
  ElegantEditor.propTypes = {
    builtInsLoad: propTypes.bool,
    builtInsLoading: propTypes.any,
    foot: propTypes.any,
    toolbar: propTypes.arrayOf(propTypes.shape([propTypes.string, {
      disabled: propTypes.bool,
      name: propTypes.string.isRequired,
      override: propTypes.bool,
      view: propTypes.func.isRequired,
      visible: propTypes.bool
    }])),
    size: propTypes.oneOf(MQ_Breakpoints),
    theme: propTypes.oneOf(theme),
    iconStyle: propTypes.object
  };
}

export { ElegantEditor };
