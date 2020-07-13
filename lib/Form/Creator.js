import { Model } from './Model';

/**
 * @constructor
 * @param {object} models 
 * @param {object} values
 */
export function Creator(models, values) {
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
    const fields = this.fields;
    for (const name in fields) {
        const model = fields[name];

        if (model.reset === false) {
            continue;
        }
        typeof model.reset === 'function'
            ? model.reset(model)
            : typeof handle === 'function'
                ? handle(model)
                : (model.value = '');
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
    name in this.fields ? (this.fields[name].value = value) : void 0;
}

/**
 * 表单字段model设置
 * @param {object} models 
 * @param {object} values 
 * @public
 * @method
 */
function model(models, values) {
    models = models && typeof models === 'object' ? models : {};
    values = values && typeof values === 'object' ? values : {};

    for (const name in models) {
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
    values = typeof values === 'object' ? values : {};
    const fields = this.fields;

    for (const name in values) {
        const value = values[name];
        if (name in fields) {
            fields[name].value = value;
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
    const json = {};
    const fields = this.fields;

    for (const name in fields) {
        json[name] = modelValidate(name, fields[name], this);
    }

    reset && this.reset(reset);

    return json;
}

function modelValidate(name, model, ctx) {
    const { value, required, validate, message, placeholder } = model;

    if (!required && !validate) {

        return value;
    }

    try {
        let errMsg = message || placeholder || ' Invalid value.';

        if (typeof value === 'undefined') {
            throw new Error(errMsg);
        }

        if (validate instanceof RegExp && !validate.test(value)) {
            throw new Error(errMsg);
        }

        if (typeof validate === 'function') {
            let ret = validate(value, ctx);

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