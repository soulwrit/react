import isImage from '@writ/utils/is-image';
import extname from '@writ/utils/extname';
import { code as codes, status } from './statuses';

function defineAccessor(target, name, getter, setter) {
    var value = {};

    if (typeof getter === 'function') value.get = getter;
    if (typeof setter === 'function') value.set = setter;
    Object.defineProperty(target, name, value);
}

/**
 * @param {codes} code 
 * @param {status.upload} option 
 */
function Status(code, option) {
    defineAccessor(this, 'status', () => this._code, code => this._code = code);
    defineAccessor(this, 'wait', () => this._code === codes.wait);
    defineAccessor(this, 'doing', () => this._code === codes.doing);
    defineAccessor(this, 'ok', () => this._code === codes.ok);
    defineAccessor(this, 'not', () => this._code === codes.not);
    defineAccessor(this, 'redo', () => this._code === codes.redo);
    defineAccessor(this, 'done', () => this._code === codes.done);
    defineAccessor(this, 'statusName', () => option[this._code][0]);
    defineAccessor(this, 'statusText', () => option[this._code][1]);

    this._code = code;
    this.abort = null;
    this.progress = null;
    this.status = this._code;
}

/** 
 * 模拟一个文件，便于管理
 * @param {File} file 
 * @param {string} code 
 */
function FakeFile(file, code) {
    this.path = file; // 映射原始文件
    this.name = file.name;
    this.size = file.size || 0;
    this.isImage = isImage(file);
    this.ext = file.ext || extname(file.name);
 
    // 已经上传的文件，等待下载与上传
    this.upload = new Status(code, status.upload);
    this.download = new Status(codes.wait, status.download);
    this.remove = new Status(codes.wait, status.remove);
    this.status = this.upload;
}

/**
 * @param {Array} fileList 已经上传的文件 默认状态为 done
 */
export function FileStack(fileList, code) {
    this.stack = [];
    this.get = function (noCopy) {
        return noCopy ? this.stack : [].concat(this.stack);
    }
    this.set = function (file, code) {
        if (typeof file !== 'object' || !file) {
            throw new Error('FileStack.set Param(`file`) must be an Object.');
        }
        (Array.isArray(file) ? file : [file]).forEach(value => {
            if (value instanceof FakeFile) {
                throw new Error('File is already in stack.');
            }

            if (typeof value !== 'object' || !value) {
                throw new Error('Invalid File, it must instanceof `native File`');
            }

            return this.stack.push(new FakeFile(value, code));
        });
    }
    this.remove = function (file) {
        if (file == null) return;

        const stack = this.stack;
        const clean = function (file) {
            if (!file) return;
            file.upload = null;
            file.remove = null;
            file.download = null;
        };

        if (typeof file === 'number') {
            return clean(stack.splice(file, 1)[0]);
        }
        if (typeof file !== 'object' || !file) {
            throw new Error('FileStack.remove Param(`file`) must be an object.');
        }

        const files = Array.isArray(file) ? file : [file];

        for (let i = 0; i < stack.length; i++) {
            if (files.indexOf(stack[i]) > -1) {
                clean(stack.splice(i, 1)[0]);
            }
        }
    }
    this.clear = function () {
        this.stack = [];
    }
    this.set(fileList || [], code);
}