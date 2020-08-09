import { f as _slicedToArray, _ as _inherits, a as _createSuper, b as _classCallCheck, c as _defineProperty, d as _assertThisInitialized, e as _createClass, i as _typeof } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { M as MQ_Breakpoints } from './dependency-8ea69cb4.js';
import { n as noop_1 } from './noop-469b0e21.js';

/**
 * 是否为有限数字
 * @param {any} value 
 */
function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

var isNumeric_1 = isNumeric;

var dot = '.';
var minusDot = '-.';
var isMinusSign = function isMinusSign(_char) {
  return _char === '-';
};
var isDot = function isDot(_char2) {
  return _char2 === '.' || _char2 === '。';
};
var getDot = function getDot(_char3) {
  return isDot(_char3) ? '.' : '';
};
var getDotIndex = function getDotIndex(str) {
  return str.indexOf(dot);
};
var fixDotStart = function fixDotStart(str) {
  return str.startsWith(dot) ? '0'.concat(str) : str;
};
var fixMinusDotStart = function fixMinusDotStart(str) {
  return str.startsWith(minusDot) ? '-0'.concat(str.substr(1)) : str;
};
var formatNumber = function formatNumber(numeric, fmt) {
  if (typeof fmt !== 'string' || !fmt.trim()) return numeric;
  var regex = /\{(.+?)\}/g;
  var strNum = numeric.toString();
  var match,
      len = 0,
      ret = fmt;

  while (match = regex.exec(fmt)) {
    var temp = match[0];
    var meta = match[1];

    if (meta == null) {
      continue;
    }

    var _meta$split$map = meta.split(',').map(function (value) {
      return !value ? 0 : value;
    }),
        _meta$split$map2 = _slicedToArray(_meta$split$map, 2),
        start = _meta$split$map2[0],
        end = _meta$split$map2[1];

    if (end == null) {
      end = start;
      start = len;
      len = end - start;
    }

    var substr = strNum.substr(start, end);
    ret = ret.replace(temp, substr);
  }

  return ret;
};

var InputNumber = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(InputNumber, _React$PureComponent);

  var _super = _createSuper(InputNumber);

  function InputNumber(props) {
    var _this;

    _classCallCheck(this, InputNumber);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "saveRef", function (elem) {
      return _this.input = elem;
    });

    _defineProperty(_assertThisInitialized(_this), "setNumeric", function (numeric) {
      var _this$props = _this.props,
          filter = _this$props.filter,
          max = _this$props.max,
          min = _this$props.min,
          onChange = _this$props.onChange,
          strict = _this$props.strict;

      if (strict) {
        if (numeric < min) {
          numeric = min;
        }

        if (numeric > max) {
          numeric = max;
        }
      } // 过滤器


      var filtered = filter(numeric);

      if (isNumeric_1(filtered)) {
        numeric = filtered;
      } // 格式器


      var formatted = _this.format(numeric);

      _this.setState({
        numeric: numeric
      }, function () {
        _this.input.value = _this.state.numeric; // 设置光标到末尾

        onChange(_this.state.numeric, formatted); // raf(() => {
        // });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onInput", function (e) {
      var input = e.target;
      var value = input.value;
      var strNum = value.toString();
      var length = strNum.length;
      var numeric = strNum.split('');

      for (var i = 0, dotIndex = -1; i < length; i++) {
        var currChar = strNum.charAt(i); // 负号

        if (i === 0 && isMinusSign(currChar)) {
          continue;
        } // 数字


        if (isNumeric_1(currChar)) {
          continue;
        } // 小数点


        if (dotIndex === -1 && isDot(currChar)) {
          dotIndex = i;
          numeric[i] = getDot(currChar);
          continue;
        }

        numeric[i] = '';
      }

      numeric = numeric.join('');

      if (_this.props.fixDot) {
        numeric = fixDotStart(numeric);
      }

      if (_this.props.fixMinusDot) {
        numeric = fixMinusDotStart(numeric);
      }

      if (_this.props.onInput(e, _this.setNumeric)) {
        return;
      }

      _this.setNumeric(numeric);
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      switch (e.keyCode) {
        case 40:
          // 向下
          _this.setStep(false);

          break;

        case 38:
          // 向上
          _this.setStep(true);

          break;
      }

      _this.props.onKeyDown(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onUpStep", function () {
      if (!_this.input) {
        return;
      }

      _this.setStep(true);
    });

    _defineProperty(_assertThisInitialized(_this), "onDownStep", function () {
      if (!_this.input) {
        return;
      }

      _this.setStep(false);
    });

    var initialValue = props.value || props.min;
    _this.state = {
      numeric: initialValue
    }; // 合法数字结束下标

    _this.index = 0; // input DOM 引用

    _this.input = null;
    _this.dotIndex = -1;
    return _this;
  }

  _createClass(InputNumber, [{
    key: "format",
    value: function format(numeric) {
      var formatter = this.props.formatter;

      switch (_typeof(formatter)) {
        case 'string':
          return formatNumber(numeric, formatter);

        case 'function':
          return formatter(numeric);
      } // {}

    }
  }, {
    key: "setStep",
    value: function setStep(isUp) {
      var numeric = isNumeric_1(this.state.numeric) ? this.state.numeric : 0;
      var precision = this.props.precision;
      var step = this.props.step;
      var strNum = numeric.toString().trim();
      var dotIndex = getDotIndex(strNum);

      if (step != null) {
        step = isUp ? step : -step;
      }

      if (isMinusSign(numeric)) {
        numeric = -0;
      }

      if (dotIndex === -1) {
        // int 类型 整数位进行计算
        if (step == null) {
          step = isUp ? 1 : -1;
        }

        numeric = Number.parseInt(numeric) + step;
        numeric = precision ? numeric.toFixed(precision) : numeric;
        return this.setNumeric(numeric);
      } // float 类型 小数末位进行计算
      // 精度不存在时，把用户输入的小数位当作精度


      precision = precision ? precision : strNum.substring(dotIndex + 1).length;

      if (step == null) {
        step = isUp ? Math.pow(10, -precision) : -Math.pow(10, -precision);
      }

      numeric = (Number.parseFloat(numeric) + step).toFixed(precision);
      this.setNumeric(numeric);
    } // this.dotIndex = strNum.indexOf(dot);
    // if (this.dotIndex === -1) {
    //     this.dotCount = 0;
    // }
    // for (this.index = value.length - 1; this.index >= 0; this.index--) {
    //     const currChar = strNum.charAt(this.index);
    //     // 负号
    //     if (this.index === 0 && isMinusSign(currChar)) {
    //         break;
    //     }
    //     // 数字
    //     if (isNumeric(currChar)) {
    //         break;
    //     }
    //     // 小数点
    //     if (isDot(currChar)) {
    //         if (this.dotCount === 0) {
    //             this.dotCount = 1;
    //             numeric = strNum.replace(currChar, getDot(currChar));
    //             break;
    //         }
    //         if (this.dotIndex === this.index) {
    //             break;
    //         }
    //     }
    //     numeric = strNum.substr(0, this.index);
    // }

  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          decrease = _this$props2.decrease,
          disabled = _this$props2.disabled,
          increase = _this$props2.increase,
          inb = _this$props2.inb,
          isVertical = _this$props2.isVertical,
          max = _this$props2.max,
          min = _this$props2.min,
          size = _this$props2.size;
      var numeric = this.state.numeric;
      var upButtonIsDisabled = disabled || numeric >= max;
      var downButtonIsDisabled = disabled || numeric <= min;
      return /*#__PURE__*/React__default.createElement('div', {
        className: classnames('iptn', {
          inb: inb,
          disabled: disabled,
          vertical: isVertical
        })
      }, decrease ? /*#__PURE__*/React__default.createElement('span', {
        className: classnames('decrease', size, {
          disabled: downButtonIsDisabled
        }),
        onClick: downButtonIsDisabled ? null : this.onDownStep
      }, decrease) : null, /*#__PURE__*/React__default.createElement('div', {
        className: 'enter'
      }, /*#__PURE__*/React__default.createElement('input', {
        autoComplete: 'off',
        className: size,
        defaultValue: numeric,
        disabled: disabled,
        max: max,
        min: min,
        onKeyDown: this.onKeyDown,
        onInput: this.onInput,
        ref: this.saveRef
      })), increase ? /*#__PURE__*/React__default.createElement('span', {
        className: classnames('increase', size, {
          disabled: upButtonIsDisabled
        }),
        onClick: upButtonIsDisabled ? null : this.onUpStep
      }, increase) : null);
    }
  }]);

  return InputNumber;
}(React__default.PureComponent);
InputNumber.defaultProps = {
  decrease: '-',
  disabled: false,
  filter: noop_1,
  fixDot: true,
  fixMinusDot: true,
  formatter: void 0,
  inb: true,
  isVertical: false,
  increase: '+',
  max: Infinity,
  min: -Infinity,
  onChange: noop_1,
  onKeyDown: noop_1,
  onInput: noop_1,
  precision: 0,
  size: 'xs',
  step: void 0,
  strict: true
};

if (window.DEV) {
  InputNumber.propTypes = {
    decrease: propTypes.any,
    // 递减按钮的文本
    disabled: propTypes.bool,
    // 是否禁用
    filter: propTypes.func,
    // 自定义值过滤器,将在 state 更新之前执行
    fixDot: propTypes.bool,
    //当输入 . 时，是否转换为 `0.`
    fixMinusDot: propTypes.bool,
    // 当输入 `-.`时，是否转为 `-0.`;
    formatter: propTypes.oneOfType([propTypes.string, propTypes.func]),
    // 按照执行格式展示输入内容
    inb: propTypes.bool,
    // 设置组件的 display 属性为 inline-block
    increase: propTypes.any,
    // 递加按钮的文本
    isVertical: propTypes.bool,
    // 垂直布局
    max: propTypes.number,
    // 输入数字的上限
    min: propTypes.number,
    // 输入数字的下限
    onChange: propTypes.func,
    //输入有效值时执行的函数
    onKeyDown: propTypes.func,
    // input 发生 onKeyDown 事件时执行的函数
    onInput: propTypes.func,
    // input 发生 onInput 事件时执行的函数
    precision: propTypes.number,
    // 输入小数时保留的有效数字的个数
    size: propTypes.oneOf(MQ_Breakpoints),
    // 组件的内边距
    // 递减或递加的步进值, 默认自动检测，
    // 当为整数类型时，step为(+-)1，
    // 当为浮点数时，step由用户输入的小数位决定, 例如 输入 0.9 则步进值为 0.1, 输入 1.09 步进值为 0.01
    step: propTypes.number,
    // 是否将输入值严格限制在集合 [min, max] 的范围内
    strict: propTypes.number
  };
}

export { InputNumber };
