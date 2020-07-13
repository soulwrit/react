import { i as _typeof, g as _objectWithoutProperties, h as _objectSpread2 } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { d as dirs, C as CSSUtil } from './dependency-8ea69cb4.js';
import { M as Model } from './Model-6a5cfb7c.js';

/**
 * @constructor
 * @param {object} models 
 * @param {object} values
 */

function Creator(models, values) {
  if (!(this instanceof Creator)) {
    throw new Error('Creator is a constructor!');
  }

  this.fields = Object.create(null);
  this.model(models, values);
}
Creator.prototype.on = on;
Creator.prototype.reset = reset;
Creator.prototype.get = get;
Creator.prototype.set = set;
Creator.prototype.value = value;
Creator.prototype.json = json;
Creator.prototype.model = model;
/**
 * 监听表单某字段变化
 * @param {string} name 字段名称
 * @param {function} func 监听函数
 * @public
 * @method
 */

function on(name, func) {
  if (name in this.fields) {
    this.fields[name].dispatch = func;
  }
}
/**
 * 清空表单
 * @param {function?} handle 
 * @public
 * @method
 */


function reset(handle) {
  var fields = this.fields;

  for (var name in fields) {
    var _model = fields[name];

    if (_model.reset === false) {
      continue;
    }

    typeof _model.reset === 'function' ? _model.reset(_model) : typeof handle === 'function' ? handle(_model) : _model.value = '';
  }
}
/**
 * 获取表单指定字段的值
 * @param {string} name 字段名称
 * @public
 * @method
 */


function get(name) {
  return name in this.fields ? this.fields[name].value : void 0;
}
/**
 * 设置指定表单字段的值
 * @param {string} name 表单字段名
 * @param {*} value 指定值
 * @public
 * @method
 */


function set(name, value) {
  name in this.fields ? this.fields[name].value = value : void 0;
}
/**
 * 表单字段model设置
 * @param {object} models 
 * @param {object} values 
 * @public
 * @method
 */


function model(models, values) {
  models = models && _typeof(models) === 'object' ? models : {};
  values = values && _typeof(values) === 'object' ? values : {};

  for (var name in models) {
    this.fields[name] = new Model(models[name], values[name]);
  }
}
/**
 * 表单字段赋值
 * @param {object} values 字段值集合
 * @public
 * @method
 */


function value(values) {
  values = _typeof(values) === 'object' ? values : {};
  var fields = this.fields;

  for (var name in values) {
    var _value = values[name];

    if (name in fields) {
      fields[name].value = _value;
    }
  }
}
/**
 * 表单字段值json
 * @param {Function?} reset 在json化之后的是否执行reset或reset的函数
 * @public
 * @method
 * @returns {Object} 表单字段组成的 json
 */


function json(reset) {
  var json = {};
  var fields = this.fields;

  for (var name in fields) {
    json[name] = modelValidate(name, fields[name], this);
  }

  reset && this.reset(reset);
  return json;
}

function modelValidate(name, model, ctx) {
  var value = model.value,
      required = model.required,
      validate = model.validate,
      message = model.message,
      placeholder = model.placeholder;

  if (!required && !validate) {
    return value;
  }

  try {
    var errMsg = message || placeholder || ' Invalid value.';

    if (typeof value === 'undefined') {
      throw new Error(errMsg);
    }

    if (validate instanceof RegExp && !validate.test(value)) {
      throw new Error(errMsg);
    }

    if (typeof validate === 'function') {
      var ret = validate(value, ctx);

      if (typeof ret === 'string') {
        throw new Error(ret);
      }

      if (ret === false) {
        throw new Error(errMsg);
      }

      if (ret instanceof Error) {
        throw ret;
      }
    }
  } catch (error) {
    error.message = '[' + name + '] ' + error.message;
    throw error;
  }

  return value;
}

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
 * @returns {Creator} 
 */

function create(models, values) {
  return new Creator(models, values);
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
