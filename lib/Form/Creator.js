import has from '@writ/utils/object-has';
import { Model } from './Model';
const getLength = value => value.toString().trim().length;

/**
 * @constructor
 * @param {object} models 
 * @param {object} values
 */
export function Creator(models, values, name) {
    if (!(this instanceof Creator)) {
        throw new Error('Creator is a constructor!');
    }

    this.name = name || 'unkown';
    this.fields = Object.create(null);
    this.setModel(models, values);
}

Creator.prototype.error = function defineError(name, message) {
    const errMsg = (window.DEV ? `${this.name}.${name}: ` : '') + message;

    return new Error(errMsg);
}

/**
 * 清空表单 
 * @public
 */
Creator.prototype.reset = function reset(name) {
    if (this.resetField(name) === true) {
        return;
    }
    const fields = this.fields;

    for (const name in fields) {
        this.resetField(name);
    }
}

/**
 * 重置某个字段的值
 * @param {string} name
 */
Creator.prototype.resetField = function resetField(name) {
    if (!has(this.fields, name)) {
        return false;
    }
    const model = this.fields[name];

    if (model.reset === false) {
        return false;
    }

    if (typeof model.reset === 'function') {
        model.reset(model, this.fields);
        return true;
    }

    model.value = '';
    return true;
}

/**
 * 获取表单指定字段的值
 * @param {string} name 字段名称
 */
Creator.prototype.get = function getFieldValue(name) {
    return has(this.fields, name) ? this.fields[name].value : '';
}

/**
 * 设置指定表单字段的值
 * @param {string} name 表单字段名
 * @param {*} value 指定值
 */
Creator.prototype.set = function setFieldValue(name, value) {
    has(this.fields, name) && (this.fields[name].value = value);
}

/**
 * 表单字段model设置
 * @param {object} models 
 * @param {object} values 
 * @public
 * @method
 */
Creator.prototype.setModel = function setModel(models, values) {
    models = models && typeof models === 'object' ? models : {};
    values = values && typeof values === 'object' ? values : {};

    for (const name in models) {
        if (has(models, name)) {
            this.fields[name] = new Model(models[name], values[name]);
        }
    }
}
/**
 * 表单字段model设置
 * @param {object} models 
 * @param {object} values 
 * @public
 * @method
 */
Creator.prototype.setValue = function setValue(values) {
    values = values && typeof values === 'object' ? values : {};

    for (const name in values) {
        if (has(values, name) && has(models, name)) {
            this.fields[name].value = values[name];
        }
    }
}

/**
 * 校验指定字段
 * @param {string} name - 字段名
 * @returns {string} 返回字段值
 */
Creator.prototype.checkField = function (name) {
    if (!has(this.fields, name)) {
        throw this.error(name, ' does not exist');
    }
    const { required, validate, message, placeholder, value } = this.fields[name];
    let errMsg = message || placeholder || 'is required.';

    if (required === true && (value == null || getLength(value) === 0)) {
        throw this.error(name, errMsg);
    }

    if (validate instanceof RegExp && !validate.test(value)) {
        throw this.error(name, errMsg);
    }

    if (typeof validate === 'function') {
        let ret = validate(value, this);

        if (ret === false) {
            throw this.error(name, errMsg);
        }

        if (typeof ret === 'string' || ret instanceof Error) {
            throw this.error(name, ret);
        }
    }

    return value;
}

/**
 * 表单字段值json 
 * @returns {Object} 表单字段值组成的 json 
 */
Creator.prototype.json = function toJson(reset) {
    const json = {};
    const fields = this.fields;

    for (const name in fields) {
        json[name] = this.checkField(name);
    }

    !!reset && this.reset(reset);

    return json;
} 