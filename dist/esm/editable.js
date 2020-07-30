import { a as _inherits, b as _createSuper, d as _classCallCheck, _ as _defineProperty, e as _assertThisInitialized, c as _createClass } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { M as MQ_Breakpoints, t as theme, C as CSSUtil } from './dependency-8ea69cb4.js';

var Editable = /*#__PURE__*/function (_React$Component) {
  _inherits(Editable, _React$Component);

  var _super = _createSuper(Editable);

  function Editable(props) {
    var _this;

    _classCallCheck(this, Editable);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onCompositionStart", function () {
      _this.setState({
        show: false
      });

      _this.compositionEnd = false;
    });

    _defineProperty(_assertThisInitialized(_this), "onCompositionEnd", function () {
      _this.compositionEnd = true;
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function (e) {
      _this.setState({
        show: _this.isEmpty()
      });

      _this.props.onBlur && _this.props.onBlur(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function (e) {
      _this.props.onFocus && _this.props.onFocus(e);

      _this.element.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "onInput", function () {
      _this.value = _this.element.innerHTML;

      var isEmpty = _this.isEmpty();

      if (_this.state.show === true || isEmpty) {
        _this.setState({
          show: isEmpty
        });
      }

      _this.props.onInput && _this.props.onInput(_this.value);
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (e) {
      if (!_this.compositionEnd) {
        return;
      }

      _this.value = _this.element.innerHTML;
      _this.props.onKeyUp && _this.props.onKeyUp(e);
      _this.props.onChange && _this.props.onChange(_this.value);
    });

    _this.element = null;
    _this.compositionEnd = true;
    _this.value = props.value;
    _this.state = {
      show: _this.isEmpty()
    };
    return _this;
  }

  _createClass(Editable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.onRef && this.props.onRef(this.element);
    }
  }, {
    key: "editabled",
    value: function editabled() {
      return this.props.disabled === false && this.props.readonly === false;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return typeof this.value === 'undefined' || this.value === '' || /^\<br\>$/.test(this.value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;
      return /*#__PURE__*/React__default.createElement('div', {
        className: classnames(CSSUtil.editable, props.className),
        children: [/*#__PURE__*/React__default.createElement('div', {
          key: 0,
          className: classnames('i', props.theme, props.size),
          contentEditable: this.editabled(),
          onCompositionStart: this.onCompositionStart,
          onCompositionEnd: this.onCompositionEnd,
          onBlur: this.onBlur,
          onFocus: this.onFocus,
          onInput: this.onInput,
          onKeyUp: this.onKeyUp,
          onKeyDown: props.onKeyDown,
          ref: function ref(ele) {
            return _this2.element = ele;
          }
        }), this.state.show ? /*#__PURE__*/React__default.createElement('div', {
          key: 1,
          className: classnames('placeholder', props.size),
          children: props.placeholder,
          onClick: this.onFocus
        }) : null],
        style: props.style
      });
    }
  }]);

  return Editable;
}(React__default.Component);
Editable.defaultProps = {
  disabled: false,
  maxLength: Infinity,
  minLength: 0,
  placeholder: '请在此输入',
  readonly: false,
  size: 'md',
  theme: 'muted'
};

if (window.DEV) {
  Editable.propTypes = {
    disabled: propTypes.bool,
    maxLength: propTypes.number,
    minLength: propTypes.number,
    onChange: propTypes.func,
    onBlur: propTypes.func,
    onFocus: propTypes.func,
    onInput: propTypes.func,
    onKeyUp: propTypes.func,
    onKeyDown: propTypes.func,
    placeholder: propTypes.string,
    readonly: propTypes.bool,
    size: propTypes.oneOf(MQ_Breakpoints),
    theme: propTypes.oneOf(theme),
    value: propTypes.string,
    onRef: propTypes.func
  };
}

export { Editable };
