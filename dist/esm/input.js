import { g as _objectWithoutProperties, h as _objectSpread2, _ as _inherits, a as _createSuper, e as _createClass, b as _classCallCheck, c as _defineProperty, d as _assertThisInitialized } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { M as MQ_Breakpoints, t as theme, C as CSSUtil } from './dependency-8ea69cb4.js';
import { n as noop_1 } from './noop-469b0e21.js';
import { o as objectHasOwn } from './object-has-own-6b83c90b.js';
import { M as Model, u as updateModel, w as watchModel } from './Model-51346cf8.js';

var CssFloat = function CssFloat(props) {
  var children = props.children,
      className = props.className,
      dir = props.dir,
      rest = _objectWithoutProperties(props, ["children", "className", "dir"]);

  return children == null ? null : /*#__PURE__*/React__default.isValidElement(children) ? /*#__PURE__*/React__default.cloneElement(children, _objectSpread2({
    className: classnames(dir, children.props.className, className)
  }, rest)) : /*#__PURE__*/React__default.createElement('span', {
    className: classnames(dir, className)
  }, children);
};
CssFloat.defaultProps = {
  dir: 'fl'
};

if (window.DEV) {
  CssFloat.propTypes = {
    dir: propTypes.oneOf(['fl', 'fr'])
  };
}

var getType = function getType(multiple) {
  return multiple === true ? 'textarea' : 'input';
};

var NativeInput = /*#__PURE__*/React__default.forwardRef(function (_ref, ref) {
  var multiple = _ref.multiple,
      value = _ref.value,
      rest = _objectWithoutProperties(_ref, ["multiple", "value"]);

  return /*#__PURE__*/React__default.createElement(getType(multiple), _objectSpread2(_objectSpread2({}, rest), {}, {
    ref: ref,
    defaultValue: value
  }));
});

var rmPwdValue = function rmPwdValue(type, el) {
  if (type === 'password') {
    if (el.hasAttribute('value')) {
      el.removeAttribute('value');
    }
  }
};

var Wrapper = /*#__PURE__*/function (_React$Component) {
  _inherits(Wrapper, _React$Component);

  var _super = _createSuper(Wrapper);

  _createClass(Wrapper, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, nextState) {
      if (!objectHasOwn(nextProps, 'value')) {
        return nextState;
      }

      var propsValue = nextProps.value;

      if (propsValue == null) {
        return nextState;
      }

      return {
        value: propsValue
      };
    }
  }]);

  function Wrapper(props) {
    var _this;

    _classCallCheck(this, Wrapper);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "saveRef", function (ele) {
      return _this.input = ele;
    });

    _defineProperty(_assertThisInitialized(_this), "setValue", function (value) {
      _this.setState({
        value: value
      }, function () {
        rmPwdValue(_this.props.type, _this.input);

        _this.input.focus();

        _this.props.onChange(value);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
      var value = e.target.value;

      if (updateModel(_this.props.model, value)) {
        return;
      }

      _this.setValue(value);
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function (e) {
      var onBlur = _this.props.onBlur;
      rmPwdValue(_this.props.type, _this.input);

      if (onBlur) {
        onBlur(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function (e) {
      var onFocus = _this.props.onFocus;

      if (onFocus) {
        onFocus(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      var _this$props = _this.props,
          onKeyDown = _this$props.onKeyDown,
          onEnter = _this$props.onEnter;

      if (e.keyCode === 13 && onEnter) {
        if (onEnter(e)) return;
      }

      if (onKeyDown) {
        onKeyDown(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onReset", function () {
      if (updateModel(_this.props.model, '')) {
        return;
      }

      _this.setValue('');
    });

    var model = props.model,
        _value = props.value;
    var prior = model ? model.value : _value;
    _this.state = {
      value: prior || ''
    };
    _this.input = null;
    watchModel(model, _this.setValue, prior);
    return _this;
  }

  _createClass(Wrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.onRef();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(props) {
      if (props.model !== this.props.model) {
        watchModel(this.props.model, this.setValue, this.state.value);
      }
    }
  }, {
    key: "onRef",
    value: function onRef() {
      var onRef = this.props.onRef;

      if (onRef) {
        onRef(this.input);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          inf = _this$props2.inf,
          multiple = _this$props2.multiple,
          placeholder = _this$props2.placeholder,
          prefix = _this$props2.prefix,
          resize = _this$props2.resize,
          style = _this$props2.style,
          size = _this$props2.size,
          suffix = _this$props2.suffix,
          theme = _this$props2.theme,
          model = _this$props2.model,
          width = _this$props2.width,
          wrapper = _this$props2.wrapper,
          rest = _objectWithoutProperties(_this$props2, ["className", "inf", "multiple", "placeholder", "prefix", "resize", "style", "size", "suffix", "theme", "model", "width", "wrapper"]);

      var value = this.state.value;
      var styled = Object.assign({
        width: width
      }, style);
      var isPureInput = !prefix && !suffix;
      var inputProps = Object.assign({}, rest, {
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        placeholder: model && model.placeholder || placeholder,
        ref: this.saveRef,
        multiple: multiple,
        value: value
      });

      if (isPureInput) {
        inputProps.className = classnames(CSSUtil.input, size, theme, className);
        inputProps.style = styled;
        return /*#__PURE__*/React__default.createElement(NativeInput, inputProps);
      }

      inputProps.className = size;
      inputProps.style = Object.assign({
        resize: resize
      }, inputProps.style);
      var length = value.length;
      var prefixElement = typeof prefix === 'function' ? prefix({
        reset: this.onReset,
        setValue: this.setValue,
        className: size,
        length: length
      }) : /*#__PURE__*/React__default.createElement(CssFloat, {
        className: size
      }, prefix);
      var suffixElement = typeof suffix === 'function' ? suffix({
        reset: this.onReset,
        setValue: this.setValue,
        className: size,
        length: length
      }) : /*#__PURE__*/React__default.createElement(CssFloat, {
        className: size
      }, suffix);
      return /*#__PURE__*/React__default.createElement(wrapper, {
        className: classnames(CSSUtil.input, theme, {
          inf: inf
        }, className),
        style: styled
      }, prefixElement, /*#__PURE__*/React__default.createElement(CssFloat, null, /*#__PURE__*/React__default.createElement(NativeInput, inputProps)), suffixElement);
    }
  }]);

  return Wrapper;
}(React__default.Component);
Wrapper.defaultProps = {
  onChange: noop_1,
  size: 'md',
  theme: 'muted',
  width: '100%',
  wrapper: 'span',
  placeholder: 'Enter to here',
  inf: true
};

if (window.DEV) {
  Wrapper.propTypes = {
    model: propTypes.instanceOf(Model),
    multiple: propTypes.bool,
    onBlur: propTypes.func,
    onChange: propTypes.func,
    onEnter: propTypes.func,
    onFocus: propTypes.func,
    onKeyDown: propTypes.func,
    onRef: propTypes.func,
    prefix: propTypes.oneOfType([propTypes.any, propTypes.func]),
    size: propTypes.oneOf(MQ_Breakpoints),
    suffix: propTypes.oneOfType([propTypes.any, propTypes.func]),
    theme: propTypes.oneOf(theme),
    width: propTypes.oneOfType([propTypes.string, propTypes.number])
  };
}

var Input = function Input(props) {
  return /*#__PURE__*/React__default.createElement(Wrapper, Object.assign({}, props, {
    multiple: false
  }));
};

var Textarea = function Textarea(props) {
  return /*#__PURE__*/React__default.createElement(Wrapper, Object.assign({}, props, {
    multiple: true
  }));
};

Input.Textarea = Textarea;
Input.defaultProps = {
  type: 'text'
};

if (window.DEV) {
  Input.propTypes = {
    type: propTypes.string,
    resize: propTypes.string
  };
}

export { Input, Textarea };
