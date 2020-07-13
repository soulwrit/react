import { j as _typeof } from './_rollupPluginBabelHelpers-1d124520.js';

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
  this._dispatch = [];
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

        this._dispatch.forEach(function (dispatch) {
          return dispatch(value);
        });
      }
    },
    dispatch: {
      set: function set(fn) {
        if (typeof fn !== 'function') {
          throw new Error('Model dispatch must be a function.');
        }

        if (this._dispatch.indexOf(fn) === -1) {
          this._dispatch.push(fn);
        }
      }
    },
    undispatch: {
      set: function set(fn) {
        var index = this._dispatch.indexOf(fn);

        if (index > -1) {
          this._dispatch.splice(index, 1);
        }
      }
    },
    size: {
      get: function get() {
        return (typeof this._value === 'undefined' ? '' : this._value).toString().length;
      }
    }
  });
}

export { Model as M };
