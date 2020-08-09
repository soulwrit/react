import { i as _typeof, f as _slicedToArray } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default, { useState, useRef } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';
import { n as noop_1 } from './noop-469b0e21.js';

/**
 * @param {Object}   model 
 * @param {String}   model.default 初始值
 * @param {String}   model.label label
 * @param {String}   model.message 错误提示信息
 * @param {String}   model.placeholder 占位符
 * @param {String}   model.required 必填
 * @param {Object}   model.validate 验证器
 * @param {function} model.reset 字段重置器 
 */
function Model(model, value) {
  if (!(this instanceof Model)) {
    throw new Error('Model is a class constructor!');
  }

  model = _typeof(model) === 'object' && model ? model : {
    "default": model
  };
  this._value = value || model["default"];
  this._dispatch = null;
  this.label = model.label;
  this.message = model.message;
  this.placeholder = model.placeholder;
  this.required = !!model.required;
  this.reset = model.reset;
  this.validate = model.validate;
  Object.defineProperties(this, {
    value: {
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        this._value = value;
        this.dispatch();
      }
    },
    length: {
      get: function get() {
        return this._value != null ? this._value.toString().length : 0;
      }
    }
  });
}

Model.prototype.dispatch = function updateValue() {
  if (this._dispatch == null) return;

  this._dispatch(this._value);
};

Model.prototype.watch = function listenValue(dispatch) {
  this._dispatch = dispatch;
};
/**
 * 安装 state 到 model
 * @param {Model} model 
 * @param {function} dispatch 
 */

var watchModel = function watchModel(model, dispatch, value) {
  if (!isValidModel(model) || typeof dispatch !== 'function') return;
  model._value = value;
  model.watch(dispatch);
};
/**
 * 是否为 Model
 * @param {Model} model 
 */

function isValidModel(model) {
  return model instanceof Model;
}

var Group = function Group(props) {
  var active = props.active,
      children = props.children,
      model = props.model,
      _onChange = props.onChange;

  var _useState = useState(active),
      _useState2 = _slicedToArray(_useState, 2),
      checked = _useState2[0],
      setChecked = _useState2[1];

  if (model) {
    watchModel(model, setChecked);
  }

  return React__default.Children.map(children, function (Item, index) {
    if (Item.type !== Checkbox) {
      throw new Error('Only `Checkbox` used in `Checkbox.Group`.');
    }

    var name = Item.props.name;
    var mark = !!name ? name : index;
    var idx = checked.indexOf(mark);
    return /*#__PURE__*/React__default.cloneElement(Item, {
      key: index,
      checked: idx > -1,
      onChange: function onChange(status) {
        var values = [].concat(checked);
        status ? values.push(mark) : values.splice(idx, 1);

        if (model) {
          model.value = values;
        } else {
          setChecked(values);
        }

        _onChange && _onChange(values);
      }
    });
  });
};

var Checkbox = function Checkbox(props) {
  var name = props.name,
      value = props.value,
      disabled = props.disabled,
      dref = props.dref,
      children = props.children,
      useLabel = props.useLabel,
      onChange = props.onChange,
      checked = props.checked,
      style = props.style;

  var _useState3 = useState(checked),
      _useState4 = _slicedToArray(_useState3, 2),
      status = _useState4[0],
      setStatus = _useState4[1];

  var ref = useRef(dref);

  var handleChange = function handleChange(e) {
    var active = e.target.checked;
    e.stopPropagation();
    setStatus(active);
    onChange && onChange(active);
  };

  var handleClick = function handleClick(e) {
    e.stopPropagation();
    ref.current.click();
  };

  return /*#__PURE__*/React__default.createElement(useLabel ? 'label' : 'span', {
    className: classnames(CSSUtil.checkbox, CSSUtil.disable(disabled), CSSUtil.check(status)),
    style: style
  }, /*#__PURE__*/React__default.createElement('input', {
    type: "checkbox",
    name: name,
    disabled: disabled,
    defaultChecked: status,
    onChange: handleChange,
    ref: ref
  }), /*#__PURE__*/React__default.createElement('span', {
    className: 'state',
    onClick: !useLabel ? handleClick : null
  }), (value || children) && /*#__PURE__*/React__default.createElement('span', {
    className: 'value'
  }, value || children));
};

Checkbox.Group = Group;
Checkbox.defaultProps = {
  onChange: noop_1
};
Group.defaultProps = {
  onChange: noop_1,
  active: []
};

if (window.DEV) {
  Checkbox.propTypes = {
    checked: propTypes.bool,
    children: propTypes.any,
    disabled: propTypes.bool,
    dref: propTypes.func,
    name: propTypes.string.isRequired,
    onChange: propTypes.func,
    style: propTypes.object,
    value: propTypes.any,
    useLabel: propTypes.bool
  };
  Group.propTypes = {
    active: propTypes.array,
    children: propTypes.element,
    model: propTypes.instanceOf(Model),
    onChange: propTypes.func
  };
}

export { Checkbox };
