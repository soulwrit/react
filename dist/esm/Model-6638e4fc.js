import { i as _typeof } from './_rollupPluginBabelHelpers-b0f6ca49.js';

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
 * 绑定值到model
 * @param {Model} model 
 * @param {any} value 
 */


function updateModel(model, value) {
  if (!isValidModel(model)) return;
  model.value = value;
  return true;
}
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

export { Model as M, updateModel as u, watchModel as w };
