import { _ as _defineProperty, i as _typeof, a as _inherits, b as _createSuper, d as _classCallCheck, c as _createClass, f as _slicedToArray } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default, { useContext, useState, useEffect } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';
import { n as noop_1 } from './noop-469b0e21.js';
import { o as objectHasOwn } from './object-has-own-6b83c90b.js';
import ReactDOM from 'react-dom';
import { a as assert_1 } from './assert-cc694573.js';
import { T as Trigger } from './Trigger-8486eead.js';
import { g as getViewportHeight } from './dom-viewport-height-640d289b.js';

/**
 * 生成指定长度的 hash 值
 * @param {number} length 
 */

function createHash(length) {
  if (!length || typeof length != 'number') {
    return;
  }

  var ar = '1234567890abcdefghijklmnopqrstuvwxyz';
  var hs = [];
  var hl = Number(length);
  var al = ar.length;

  for (var i = 0; i < hl; i++) {
    hs.push(ar[Math.floor(Math.random() * al)]);
  }

  return hs.join('');
}

var hashCreator = createHash;

var Context = /*#__PURE__*/React__default.createContext(null);

var Head = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var _classnames;

  var arrow = props.arrow,
      className = props.className,
      close = props.close,
      open = props.open,
      render = props.render,
      style = props.style;

  var _useContext = useContext(Context),
      values = _useContext.values,
      theme = _useContext.theme,
      multiple = _useContext.multiple,
      disabled = _useContext.disabled,
      size = _useContext.size,
      inb = _useContext.inb,
      placeholder = _useContext.placeholder,
      visible = _useContext.visible;

  console.log(values, 'Head--->');
  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames(CSSUtil.select, (_classnames = {}, _defineProperty(_classnames, theme, !disabled), _defineProperty(_classnames, "disabled", disabled), _defineProperty(_classnames, "inb", inb), _classnames), className),
    ref: ref,
    onClick: visible || disabled ? null : open,
    style: style
  }, /*#__PURE__*/React__default.createElement('div', {
    className: classnames('hd', size)
  }, /*#__PURE__*/React__default.createElement('div', {
    className: classnames('tit', {
      single: !multiple
    })
  }, values.length === 0 ? placeholder : values.map(function (option, key) {
    return render ? render(option, close, open) : /*#__PURE__*/React__default.createElement(React__default.Fragment, {
      key: key
    }, _typeof(option) === 'object' ? option.label : option);
  })), arrow ? typeof arrow === 'function' ? arrow(visible) : arrow : /*#__PURE__*/React__default.createElement('span', {
    className: classnames('arrow', {
      flip: visible
    })
  })));
});

/**
 * @desc 多选时，Option 非受控，状态由内部维护
 * @param {object} props 
 * @param {any} props.children 子元素
 * @param {string} props.className 添加给 `Option` 的类名
 * @param {boolean} props.disabled 是否禁用
 * @param {string} props.label 显示在选中框里的内容，只能是非引用类型
 * @param {function} props.render 当前子元素渲染函数
 * @param {boolean} props.selected 是否选中
 * @param {string} props.value 用于代表当前选项，当不提供时优先取 `text`，`text`不存在时取`children`
 */

var Option = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Option, _React$PureComponent);

  var _super = _createSuper(Option);

  function Option(props) {
    var _this;

    _classCallCheck(this, Option);

    _this = _super.call(this);
    _this.state = {
      selected: props.selected
    };
    return _this;
  }

  _createClass(Option, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          disabled = _this$props.disabled,
          label = _this$props.label,
          render = _this$props.render,
          selected = _this$props.selected,
          style = _this$props.style,
          value = _this$props.value;
      var _this$context = this.context,
          multiple = _this$context.multiple,
          onSelect = _this$context.onSelect;
      var status = multiple ? this.state.selected : selected;
      return /*#__PURE__*/React__default.createElement('div', {
        className: classnames('i', className, {
          disabled: disabled,
          selected: status
        }),
        onClick: disabled ? null : function (e) {
          var isChecked = !status;
          e.stopPropagation();
          multiple && _this2.setState({
            selected: isChecked
          });
          onSelect && onSelect(isChecked, {
            label: label,
            value: value
          });
        },
        style: style
      }, render ? render(label, value, status) : children != null ? children : label);
    }
  }]);

  return Option;
}(React__default.PureComponent);

_defineProperty(Option, "contextType", Context);

Option.defaultProps = {
  selected: false
};

if (window.DEV) {
  Option.propTypes = {
    children: propTypes.any,
    label: propTypes.oneOfType([propTypes.string, propTypes.number]),
    onSelect: propTypes.func,
    render: propTypes.func,
    selected: propTypes.bool,
    value: propTypes.oneOfType([propTypes.string, propTypes.number])
  };
}

function normalize(item, serial) {
  if (item == null) return;

  switch (_typeof(item)) {
    case 'number':
    case 'string':
      return {
        value: item,
        label: item
      };

    case 'object':
      var value = objectHasOwn(item, 'value') ? item.value : void 0;
      var label = objectHasOwn(item, 'label') ? item.label : value;

      if (value) {
        return {
          value: value,
          label: label || value
        };
      }

      if (label) {
        return {
          value: label,
          label: label
        };
      }

      if (serial != null) {
        return {
          value: serial,
          label: label || serial
        };
      }
  }

  return serial != null ? {
    value: serial,
    label: serial
  } : void 0;
}
function toValue(initial) {
  var tmp = [];
  if (initial == null) return tmp;

  if (Array.isArray(initial)) {
    initial.forEach(function (obj) {
      var item = normalize(obj);

      if (item) {
        tmp.push(item);
      }
    });
    return tmp;
  }

  var item = normalize(initial);

  if (item) {
    tmp.push(item);
  }

  return tmp;
}
function inValue(array, value, index) {
  for (var i = 0, item; i < array.length; i++) {
    item = array[i];

    if (item.value === value || item.label === value) {
      return index ? i : true;
    }
  }

  return index ? -1 : false;
}

/**
 * 选项分组
 * @param {object} props 
 * @param {ReactNode} props.children 组内子元素，只能时 `Option`
 * @param {String} props.className 组的类名
 * @param {function} props.onSelect `Option`选中函数，这个函数将会传递给`Option`
 * @param {string} props.size 标题的间距
 * @param {object} props.style 分组的样式
 * @param {...any} props.title 分组的标题
 */

var Optgroup = function Optgroup(props) {
  var children = props.children,
      className = props.className,
      style = props.style,
      serial = props.serial,
      title = props.title;

  var _useContext = useContext(Context),
      size = _useContext.size,
      values = _useContext.values;

  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames('grp', className),
    style: style
  }, /*#__PURE__*/React__default.createElement('div', {
    className: classnames('tit', size)
  }, title), React__default.Children.map(children, function (child, index) {
    assert_1.nuil(child, 'Invalid `Optgroup` child element.');
    assert_1.truly(child.type === Option, 'Only `Option` can be used in `Optgroup`.');

    var _normalize = normalize(child.props, serial + index),
        value = _normalize.value,
        label = _normalize.label;

    var isSelected = inValue(values, value);
    return /*#__PURE__*/React__default.cloneElement(child, {
      key: index,
      label: label,
      selected: isSelected,
      value: value
    });
  }));
};
Optgroup.defaultProps = {};

if (window.DEV) {
  Optgroup.propTypes = {
    children: propTypes.node,
    className: propTypes.string,
    size: propTypes.string,
    style: propTypes.object,
    title: propTypes.any
  };
}

var Body = /*#__PURE__*/React__default.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      footer = _ref.footer,
      neck = _ref.neck;

  var _useContext = useContext(Context),
      coord = _useContext.coord,
      size = _useContext.size,
      visible = _useContext.visible,
      values = _useContext.values;

  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames(CSSUtil.select, 'closed', {
      open: visible
    }),
    ref: ref,
    style: coord
  }, neck ? /*#__PURE__*/React__default.createElement('div', {
    className: classnames('nk', size)
  }) : null, /*#__PURE__*/React__default.createElement('div', {
    className: 'bd'
  }, React__default.Children.map(children, function (child, index) {
    assert_1.nuil(child, 'Invalid `Select` child element.');

    switch (child.type) {
      case Option:
        var _normalize = normalize(child.props, index),
            value = _normalize.value,
            label = _normalize.label;

        var isSelected = inValue(values, value);
        return /*#__PURE__*/React__default.cloneElement(child, {
          key: index,
          label: label,
          selected: isSelected,
          value: value
        });

      case Optgroup:
        return /*#__PURE__*/React__default.cloneElement(child, {
          key: index,
          serial: index
        });

      default:
        assert_1["throw"]('Only `Optgroup` or `Option` can be used in `Select`.');
        break;
    }
  })), footer ? /*#__PURE__*/React__default.createElement('div', {
    className: classnames('ft', size)
  }, footer) : null);
});

function makeAlign() {
  var heightLimit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
  return function (pointRect, layerRect) {
    var visualHeight = getViewportHeight();
    var topValue = pointRect.y + pointRect.height;
    var HeightDifference = topValue + layerRect.height - visualHeight;
    return {
      top: topValue,
      left: pointRect.x,
      width: pointRect.width,
      height: HeightDifference >= 0 ? visualHeight - topValue - heightLimit : 'auto'
    };
  };
}

var Wrapper = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Wrapper, _React$PureComponent);

  var _super = _createSuper(Wrapper);

  _createClass(Wrapper, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (objectHasOwn(props, 'value')) {
        return {
          values: toValue(props.value)
        };
      }

      return state;
    }
  }]);

  function Wrapper(props) {
    var _this;

    _classCallCheck(this, Wrapper);

    _this = _super.call(this);
    _this.state = {
      values: toValue(props.defaultValue)
    };
    return _this;
  }

  _createClass(Wrapper, [{
    key: "setValues",
    value: function setValues(values) {
      var _this2 = this;

      console.log(values, '---->');
      this.setState({
        values: values
      }, function () {
        var _this2$props = _this2.props,
            model = _this2$props.model,
            onChange = _this2$props.onChange;

        if (model) {
          model.value = values;
        } // 监听选中值的变化 


        onChange(values);
      });
    }
  }, {
    key: "getSelector",
    value: function getSelector(close, multiple) {
      var _this3 = this;

      return function (selected, option) {
        var values = [].concat(_this3.state.values);

        if (multiple) {
          var index = inValue(values, option.value, true);

          if (index > -1) {
            if (!selected) {
              values.splice(index, 1);
            }
          } else {
            if (selected) {
              values.push(option);
            }
          }
        } else {
          values.length = 0;

          if (selected) {
            values[0] = option;
          }
        }

        _this3.setValues(values);

        !multiple && close();
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          arrow = _this$props.arrow,
          calc = _this$props.calc,
          children = _this$props.children,
          className = _this$props.className,
          footer = _this$props.footer,
          neck = _this$props.neck,
          render = _this$props.render,
          style = _this$props.style,
          inb = _this$props.inb,
          multiple = _this$props.multiple,
          placeholder = _this$props.placeholder,
          size = _this$props.size,
          theme = _this$props.theme,
          closeOnEsc = _this$props.closeOnEsc,
          closeOnOutsideClick = _this$props.closeOnOutsideClick,
          container = _this$props.container,
          disabled = _this$props.disabled,
          escape = _this$props.escape,
          onClose = _this$props.onClose,
          onKeyUp = _this$props.onKeyUp,
          onOpen = _this$props.onOpen,
          onResize = _this$props.onResize,
          resetOnTopResize = _this$props.resetOnTopResize,
          visible = _this$props.visible;
      var calcCoord = calc || makeAlign();
      return /*#__PURE__*/React__default.createElement(Trigger, {
        closeOnEsc: closeOnEsc,
        closeOnOutsideClick: closeOnOutsideClick,
        disabled: disabled,
        escape: escape,
        onClose: onClose,
        onKeyUp: onKeyUp,
        onOpen: onOpen,
        onResize: onResize,
        resetOnTopResize: resetOnTopResize,
        calcCoord: calcCoord,
        visible: visible
      }, function (_ref) {
        var visible = _ref.visible,
            close = _ref.close,
            open = _ref.open,
            coord = _ref.coord,
            layer = _ref.layer,
            trigger = _ref.trigger;
        var isHidden = disabled || !visible;
        var layerNode = isHidden ? null : /*#__PURE__*/React__default.createElement(Body, {
          children: children,
          footer: footer,
          neck: neck,
          ref: layer
        });
        var values = _this4.state.values;
        var onSelect = isHidden ? null : _this4.getSelector(close, multiple);
        console.log('-------------------------------------');
        console.log('this.state.values', values);
        return /*#__PURE__*/React__default.createElement(Context.Provider, {
          value: {
            coord: coord,
            disabled: disabled,
            multiple: multiple,
            inb: inb,
            onSelect: onSelect,
            placeholder: placeholder,
            size: size,
            theme: theme,
            values: values,
            visible: visible
          }
        }, /*#__PURE__*/React__default.createElement(Head, {
          arrow: arrow,
          className: className,
          close: close,
          open: open,
          ref: trigger,
          render: render,
          style: style
        }), !container ? layerNode : /*#__PURE__*/ReactDOM.createPortal(layerNode, container));
      });
    }
  }]);

  return Wrapper;
}(React__default.PureComponent);

_defineProperty(Wrapper, "contextType", Context);

/**
 * 没有实现原生 select 的两个快捷键行为: 按shift连选 按ctrl点选
 * @param {object} props 
 * @param {function} props.calc 定位计算器
 * @param {ReactNode} props.children 子元素
 * @param {string} props.className 类名
 * @param {...any} props.footer 底部
 * @param {object} props.model 用于表单抓取数据
 * @param {boolean} props.multiple 是否多选
 * @param {function} props.onChange 选中选项时执行的函数
 * @param {...string} props.placeholder 没有选中项时展示的占位
 * @param {function} props.render 用于渲染每个选中项
 * @param {string} props.size 内间距
 * @param {object} props.style 样式
 * @param {string} props.theme 外观状态
 * @param {array} props.value 选中值
 */

var Select = function Select(props) {
  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      inited = _useState2[0],
      setInited = _useState2[1];

  var _useState3 = useState(hashCreator(24)),
      _useState4 = _slicedToArray(_useState3, 2),
      appKey = _useState4[0],
      setAppKey = _useState4[1];

  useEffect(function () {
    !inited && setInited(1);
  }, []);

  if (objectHasOwn(props, 'multiple')) {
    var multiple = props.multiple;
    useEffect(function () {
      inited && setAppKey(hashCreator(32));
    }, [multiple]);
  }

  return /*#__PURE__*/React__default.createElement(Wrapper, Object.assign({}, props, {
    key: appKey
  }));
};
Select.Option = Option;
Select.Optgroup = Optgroup;
Select.defaultProps = {
  container: document.body,
  onChange: noop_1,
  placeholder: '请选择',
  size: 'md',
  theme: 'muted',
  inb: true
};

if (window.DEV) {
  var valueType = PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]);
  Select.propTypes = {
    arrow: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    calc: PropTypes.func,
    defaultValue: valueType,
    disabled: PropTypes.bool,
    footer: PropTypes.any,
    inb: PropTypes.bool,
    model: PropTypes.instanceOf(Model),
    multiple: PropTypes.bool,
    neck: PropTypes.any,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    render: PropTypes.func,
    size: PropTypes.oneOf(MQ_Breakpoints),
    theme: PropTypes.oneOf(theme),
    value: valueType,
    visible: PropTypes.bool
  };
}

export { Select as S, hashCreator as h };
