import { i as _typeof, g as _objectWithoutProperties, h as _objectSpread2 } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { d as dirs, C as CSSUtil } from './dependency-8ea69cb4.js';
import { M as Model } from './Model-51346cf8.js';
import { o as objectHas } from './object-has-5ccd463c.js';

var getLength = function getLength(value) {
  return value.toString().trim().length;
};
/**
 * @constructor
 * @param {object} models 
 * @param {object} values
 */


function Creator(models, values, name) {
  if (!(this instanceof Creator)) {
    throw new Error('Creator is a constructor!');
  }

  this.name = name || 'unkown';
  this.fields = Object.create(null);
  this.setModel(models, values);
}

Creator.prototype.error = function defineError(name, message) {
  var errMsg = (window.DEV ? "".concat(this.name, ".").concat(name, ": ") : '') + message;
  return new Error(errMsg);
};
/**
 * 清空表单 
 * @public
 */


Creator.prototype.reset = function reset(name) {
  if (this.resetField(name) === true) {
    return;
  }

  var fields = this.fields;

  for (var _name in fields) {
    this.resetField(_name);
  }
};
/**
 * 重置某个字段的值
 * @param {string} name
 */


Creator.prototype.resetField = function resetField(name) {
  if (!objectHas(this.fields, name)) {
    return false;
  }

  var model = this.fields[name];

  if (model.reset === false) {
    return false;
  }

  if (typeof model.reset === 'function') {
    model.reset(model, this.fields);
    return true;
  }

  model.value = '';
  return true;
};
/**
 * 获取表单指定字段的值
 * @param {string} name 字段名称
 */


Creator.prototype.get = function getFieldValue(name) {
  return objectHas(this.fields, name) ? this.fields[name].value : '';
};
/**
 * 设置指定表单字段的值
 * @param {string} name 表单字段名
 * @param {*} value 指定值
 */


Creator.prototype.set = function setFieldValue(name, value) {
  objectHas(this.fields, name) && (this.fields[name].value = value);
};
/**
 * 表单字段model设置
 * @param {object} models 
 * @param {object} values 
 * @public
 * @method
 */


Creator.prototype.setModel = function setModel(models, values) {
  models = models && _typeof(models) === 'object' ? models : {};
  values = values && _typeof(values) === 'object' ? values : {};

  for (var name in models) {
    if (objectHas(models, name)) {
      this.fields[name] = new Model(models[name], values[name]);
    }
  }
};
/**
 * 表单字段model设置
 * @param {object} models 
 * @param {object} values 
 * @public
 * @method
 */


Creator.prototype.setValue = function setValue(values) {
  values = values && _typeof(values) === 'object' ? values : {};

  for (var name in values) {
    if (objectHas(values, name) && objectHas(models, name)) {
      this.fields[name].value = values[name];
    }
  }
};
/**
 * 校验指定字段
 * @param {string} name - 字段名
 * @returns {string} 返回字段值
 */


Creator.prototype.checkField = function (name) {
  if (!objectHas(this.fields, name)) {
    throw this.error(name, ' does not exist');
  }

  var _this$fields$name = this.fields[name],
      required = _this$fields$name.required,
      validate = _this$fields$name.validate,
      message = _this$fields$name.message,
      placeholder = _this$fields$name.placeholder,
      value = _this$fields$name.value;
  var errMsg = message || placeholder || 'is required.';

  if (required === true && (value == null || getLength(value) === 0)) {
    throw this.error(name, errMsg);
  }

  if (validate instanceof RegExp && !validate.test(value)) {
    throw this.error(name, errMsg);
  }

  if (typeof validate === 'function') {
    var ret = validate(value, this);

    if (ret === false) {
      throw this.error(name, errMsg);
    }

    if (typeof ret === 'string' || ret instanceof Error) {
      throw this.error(name, ret);
    }
  }

  return value;
};
/**
 * 表单字段值json 
 * @returns {Object} 表单字段值组成的 json 
 */


Creator.prototype.json = function toJson(reset) {
  var json = {};
  var fields = this.fields;

  for (var name in fields) {
    json[name] = this.checkField(name);
  }

  !!reset && this.reset(reset);
  return json;
};

var Item = function Item(props) {
  if (!props.show) return null;
  var children = props.children,
      className = props.className,
      dir = props.dir,
      extra = props.extra,
      extraClassName = props.extraClassName,
      label = props.label,
      labelClassName = props.labelClassName,
      mainClassName = props.mainClassName,
      model = props.model,
      required = props.required,
      style = props.style,
      useLabel = props.useLabel,
      isRow = props.isRow;
  var isRequired = required || model && model.required;
  var title = label || model && model.label;
  var type = useLabel ? 'label' : 'div';
  return /*#__PURE__*/React__default.createElement(type, {
    className: classnames('lbl', isRow ? CSSUtil.row : undefined, className),
    children: [title ? /*#__PURE__*/React__default.createElement('div', {
      key: 0,
      className: classnames('name', labelClassName),
      children: [/*#__PURE__*/React__default.createElement(React__default.Fragment, {
        key: 0
      }, title), isRequired ? /*#__PURE__*/React__default.createElement('b', {
        key: 1,
        className: 'required'
      }, '*') : null]
    }) : null, /*#__PURE__*/React__default.createElement('div', {
      key: 1,
      className: classnames('ctrl', mainClassName)
    }, children), extra ? /*#__PURE__*/React__default.createElement('div', {
      key: 2,
      className: classnames('extra', extraClassName)
    }, extra) : null],
    dir: dir,
    style: style
  });
};

Item.defaultProps = {
  dir: dirs[0],
  required: false,
  show: true,
  useLabel: true
};

if (window.DEV) {
  Item.propTypes = {
    label: propTypes.any,
    labelClassName: propTypes.string,
    extra: propTypes.any,
    extraClassName: propTypes.string,
    model: propTypes.instanceOf(Model),
    dir: propTypes.oneOf(dirs),
    required: propTypes.bool,
    show: propTypes.bool,
    useLabel: propTypes.bool
  };
}

function Form(props) {
  var className = props.className,
      children = props.children,
      labelClassName = props.labelClassName,
      mainClassName = props.mainClassName,
      dir = props.dir,
      _onSubmit = props.onSubmit,
      isRow = props.isRow,
      rest = _objectWithoutProperties(props, ["className", "children", "labelClassName", "mainClassName", "dir", "onSubmit", "isRow"]);

  return /*#__PURE__*/React__default.createElement('form', _objectSpread2({
    className: classnames(CSSUtil.form, className, isRow ? CSSUtil.row : undefined),
    children: React__default.Children.map(children, function (Child, index) {
      if (Child.type === Item) {
        var _props = Child.props;
        return /*#__PURE__*/React__default.cloneElement(Child, {
          key: index,
          dir: _props.dir || dir,
          className: classnames(isRow ? CSSUtil.join(CSSUtil.col, _props.span || 12) : undefined, _props.className),
          labelClassName: classnames(labelClassName, _props.labelClassName),
          mainClassName: classnames(mainClassName, _props.mainClassName)
        });
      }

      return Child;
    }),
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      if (_onSubmit) _onSubmit();
      return false;
    }
  }, rest));
}

Form.Item = Item;
Form.create = create;
Form.hoc = hoc;
Form.defaultProps = {
  dir: undefined,
  labelClassName: undefined,
  mainClassName: undefined,
  title: undefined,
  onSubmit: undefined,
  isRow: false
};
Form.propTypes = {
  dir: propTypes.oneOf(dirs),
  labelClassName: propTypes.string,
  mainClassName: propTypes.string,
  title: propTypes.string,
  onSubmit: propTypes.func,
  isRow: propTypes.bool
};
/**
 * 数据流管理
 * @param {Model} models 字段模型 ...
 * @param {object} values 字段值集合
 * @param {string} formName 表单字段的名称
 * @returns {Creator} 
 */

function create(models, values, formName) {
  return new Creator(models, values, formName);
}
/**
 * 数据流管理
 * @param {Model} models 字段模型
 * @param {object} values 字段值集合
 */


function hoc(models, values) {
  var form = new Creator(models, values);
  return function (Component, props) {
    return /*#__PURE__*/React__default.createElement(Component, Object.assign({
      form: form
    }, props));
  };
}

export { Form, create };
