import { _ as _defineProperty, j as _typeof, a as _inherits, b as _createSuper, c as _createClass, d as _classCallCheck, e as _assertThisInitialized, i as _objectSpread2, f as _slicedToArray } from './_rollupPluginBabelHelpers-1d124520.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { a as assertConsole } from './assert-console-9d788aa1.js';

/**
 * 执行函数
 * @param {function} func 
 * @param {string|Error} err
 */


function assertCall(func, err) {
  err = new Error(err);

  if (typeof func === 'function') {
    err.name = 'AssertEx';
    return func.call(null, err);
  }

  assertConsole(false, err);
}

var assertCall_1 = assertCall;

/**
 * 规范化错误
 * @param {Error} err
 */

function error(err) {
  var i = 0;
  var e = new Error();
  var args = Array.prototype.slice.call(arguments, 1);

  if (err instanceof Error) {
    for (const key in err) {
      if (err.hasOwnProperty(key)) {
        e[key] = err[key];
      }
    }
  }

  e.name = 'FetchError';
  e.message = e.message.replace(/\$\d+/g, meta => args ? args[i++] : meta);
  return e;
}

/**
 * 检测环境中 fetch 执行的所需
 */

function check() {
  if (!window.URL) {
    throw error('Could not find the object `URL`.');
  }

  if (!window.URLSearchParams) {
    throw error('Could not find the object `URLSearchParams`.');
  }

  if (!window.AbortController) {
    throw error('Could not find the object `AbortController`.');
  }

  if (!window.ReadableStream) {
    throw error('Could not find the object `ReadableStream`.');
  }
}

check();

/**
 * 无数据请求
 * @param {string} method 
 * @private
 */

function isNobodyRequest(method) {
  return /^(get|head)$/i.test(method);
}

var requestIsNobody = isNobodyRequest;

/**
 * 浏览器是否支持 ReadableStream
 */

function hasReadableStream() {
  return typeof Response !== 'undefined' && typeof ReadableStream !== 'undefined';
} // 上传进度速度表


function getSpeedmeter() {
  if (Progress.speedometer) return Progress.speedometer;
  var tick = 1;
  var maxTick = 65535;
  var resolution = 4;

  var inc = function () {
    tick = tick + 1 & maxTick;
  };

  var timer = setInterval(inc, 1000 / resolution | 0);
  if (timer.unref) timer.unref();

  Progress.speedometer = function speedometer(seconds) {
    var size = resolution * (seconds || 5);
    var buffer = [0];
    var pointer = 1;
    var last = tick - 1 & maxTick;
    return function (delta) {
      var dist = tick - last & maxTick;
      if (dist > size) dist = size;
      last = tick;

      while (dist--) {
        if (pointer === size) pointer = 0;
        buffer[pointer] = buffer[pointer === 0 ? size - 1 : pointer - 1];
        pointer++;
      }

      if (delta) buffer[pointer - 1] += delta;
      var top = buffer[pointer - 1];
      var btm = buffer.length < size ? 0 : buffer[pointer === size ? 0 : pointer];
      return buffer.length < resolution ? top : (top - btm) * resolution / buffer.length;
    };
  };

  return Progress.speedometer;
}
/**
 * 处理进度
 * @param {number} length 
 * @param {number} progressDelay 
 * @param {number} progress.percentage 下载百分比
 * @param {number} progress.transferred 已传输数据（单位byte）
 * @param {number} progress.length 数据总长度
 * @param {number} progress.remaining 剩余未下载
 * @param {number} progress.eta 预计剩余时间
 * @param {number} progress.runtime 已经消耗时间
 * @param {number} progress.delta 未知
 * @param {number} progress.speed 处理速度
 */


function Progress(length, progressDelay = 1000) {
  this.length = parseInt(length, 10) || 0;
  this.transferred = 0;
  this.speed = 0;
  this.streamSpeed = getSpeedmeter(this.speed || 5000);
  this.initial = false;
  this.progressDelay = progressDelay;
  this.eventStart = 0;
  this.percentage = 0;

  this.getRemaining = function () {
    return parseInt(this.length, 10) - parseInt(this.transferred, 10);
  };

  this.getEta = function () {
    return this.length >= this.transferred ? this.getRemaining() / this.speed * 1000000000 : 0;
  };

  this.flow = function (chunk, onProgress) {
    const chunkLength = chunk.length;
    this.transferred += chunkLength;
    this.speed = this.streamSpeed(chunkLength);
    this.percentage = Math.round(this.transferred / this.length * 100);

    if (!this.initial) {
      this.eventStart = Date.now();
      this.initial = true;
    }

    if (this.length >= this.transferred || Date.now() - this.eventStart > this.progressDelay) {
      this.eventStart = Date.now();
      const progress = {
        length: this.length,
        transferred: this.transferred,
        speed: this.speed,
        eta: this.getEta()
      };

      if (this.length) {
        progress.remaining = this.getRemaining();
        progress.percentage = this.percentage;
      }

      onProgress(progress);
    }
  };
}
/**
 * 下载进度处理
 * @param {object} option 
 * @param {number} option.progressDelay
 * @param {number} option.contentLength
 * @param {function} option.onProgress
 * @param {function} option.onError
 */


function getProgress(option) {
  return function (res) {
    if (!hasReadableStream()) {
      return res;
    }

    const length = res.headers.get('content-length') || option.contentLength;
    const progress = new Progress(length, option.progressDelay);
    const reader = res.body.getReader();
    const stream = new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({
            done,
            value
          }) => {
            if (done) {
              option.onProgress({
                length: progress.length,
                transferred: progress.transferred,
                speed: progress.speed,
                eta: progress.getEta(),
                remaining: progress.getRemaining(),
                percentage: progress.percentage
              });
              controller.close();
              return;
            }

            if (value) {
              progress.flow(value, option.onProgress);
            }

            controller.enqueue(value);
            push();
          }).catch(err => {
            option.onError(err, res);
          });
        }

        push();
      }

    });
    return new Response(stream, res);
  };
}

function progressStep(size) {
  let s = size;
  const u = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB", "BB", "NB", "DB", "CB"];

  for (let i = 0; i < u.length; i++) {
    const spec = Math.pow(1024, i);

    if (size < 100 * spec) {
      s = size / spec;
      break;
    }
  }

  const ten = s / 5;
  return (s > 15 ? s / 100 / ten : s / 100).toFixed(2) / 1;
}

function progressSpeedmeter(size) {
  var k = progressStep(size);
  var i = k / 21;
  var end = 0.98;
  return function (s) {
    var start = s;

    if (start >= end) {
      return end;
    }

    start += k;
    k -= i;

    if (k < 0.001) {
      k = 0.001;
    }

    return start;
  };
}

/**
 * 上传进度 
 * @param {number} length 
 * @param {function} onProgress 
 * @param {number} delay 
 */

function fakeProgress(length, onProgress, delay) {
  const ret = res => res;

  if (length > 0) {
    const startTime = Date.now();
    const progress = {
      length,
      // 文件总长度
      transferred: 0,
      // 已发送
      runtime: startTime,
      // 已耗时
      percentage: 0 // 已上传的占比 

    };
    const speedometer = progressSpeedmeter(length);

    const getProgress = function (percent) {
      progress.percentage = percent;
      progress.runtime = Date.now() - startTime;
      progress.transferred = length * progress.percentage;
      onProgress(progress);
    };

    const timer = setInterval(function () {
      getProgress(speedometer(progress.percentage));
    }, delay > 30 ? delay : 30);

    ret.end = function () {
      getProgress(1);
      clearInterval(timer);
    };
  } else {
    ret.end = function () {};
  }

  return ret;
}

const types = [FormData, URLSearchParams, Blob, ArrayBuffer, Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
/**
 * 数据类型
 * @param {any} param
 */

function isJSON(param) {
  if (types.some(ctr => param instanceof ctr)) {
    return false;
  }

  return true;
}

/**
 * @param {URLSearchParams} search 
 * @param {any} data 
 */

function addQuery(search, data) {
  switch (typeof data) {
    case 'object':
      if (Array.isArray(data)) {
        search.append('[]', data);
      } else {
        for (const key in data) {
          search.append(key, data[key]);
        }
      }

      break;

    case 'function':
      break;

    default:
      if (data != null) {
        search.append('_', data);
      }

      break;
  }
}

const OPTION = {
  //* [string](GET)
  //  请求的方式, 例如: `GET`,`POST`
  method: 'GET',
  //* [Headers|object] 
  // 请求头部, 需要用到 Headers 对象，有些 headers 已经被禁用了
  // see https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name
  headers: undefined,
  //* [Blob|BufferSource|FormData|URLSearchParams|USVString]
  // 请求的的body体，需要发送的数据
  // `GET` 或 `HEAD` 不能包含数据
  body: undefined,
  //* [String](no-cors)
  // 请求的模式，可选值： `cors`,`no-cors`,or `same-origin`
  mode: 'no-cors',
  //* [String](same-origin)
  // 发起有凭证的请求，可选值： `omit`, `same-origin`, or `include`
  // 当提供此项时，在当前domain下，会自动发送cookies， 从Chrome 50开始兼容
  // 这个属性是 `FederatedCredential` 或 `PasswordCredentials`的实例
  credentials: 'same-origin',
  //* [String]()
  // 请求使用的缓存方式,可选值：`default`, `no-store`, `reload`, `no-cache`, `force-cache`, `only-if-cached`
  // see https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
  cache: 'default',
  //* [String](follow)
  // 重定向模式， 可选值：follow，error，manual
  // `follow` 自动跟踪重定向的URL
  // `error` 当产生重定向时报出一个错误
  // `manual` 手动处理请求的重定向
  redirect: 'follow',
  //* [String](client)
  // 规格化`USVString`，可选值 `no-referrer` , `client` or a `URL`
  referrer: 'client',
  //* [String](origin)
  // 指定 referrer HTTP 的头的值, 可能是以下值：
  // `no-referrer`, `no-referrer-when-downgrade`, `origin`, `origin-when-cross-origin`, `unsafe-url`.
  referrerPolicy: 'origin',
  //* [String]()
  // 请求包含完整的 `subresource` (e.g. sha256-....)
  integrity: undefined,
  //* [Boolean](false)
  // 是否允许请求在页面`outlive`时持久，其功能替换了 `Navigator.sendBeacon()` 的API
  keepalive: false,
  //* [AbortSignal]
  // 请求终止信道
  // 需要 `AbortSignal` 对象实例, 允许用你手动停止请求，可以使用 `AbortController` 对象来提供 `AbortSignal` 实例
  signal: null
}; // 自定义的默认配置

const CONFIG = {
  /** @type {object}  服务器 IP列表，默认同源*/
  host: {
    default: location
  },

  /** @type {string|URLSearchParams} 传递给URL的参数 */
  query: undefined,

  /** @type {OPTION} url 请求发送的之前, 你可以在提供请求的终止功能 */
  onBefore(opt) {},

  /** @type {Response} res 请求返回成功 */
  onSuccess(res) {},

  /** @type {Body} res 请求处理成功 */
  onOK(res) {
    return res.json();
  },

  /** @type {Error} err 请求出错时 */
  onError(err) {
    return err;
  },

  /** @type {function}  请求最终处理 */
  onFinally() {},

  /** @type {object} 请求处理的进度 */
  onProgress() {},

  /** @type {number} 默认的 contentLength 文件上传时必选*/
  contentLength: 0,

  /** @type {number} 进度条触发(计算)延迟 */
  progressDelay: 10,

  /** @type {number} 请求超时时间*/
  timeout: 50000,

  /** @type {Error} err 请求的超时 */
  onTimeout() {},

  /** @type {boolean} 是否伪造进度条 */
  download: false
};
/**
 * 合并请求的配置
 * @param {CONFIG} opts - 请求配置
 */

function getOption(opts) {
  let obj = typeof opts === 'function' ? opts(CONFIG, OPTION) : opts; // 包含 空字符串 false 0 undefined null

  if (!obj) throw error('Request Option Missing.');
  if (obj instanceof URL) obj = {
    url: obj
  };
  if (typeof obj === 'string') obj = {
    url: obj
  };

  if (typeof obj !== 'object') {
    throw error('Invalid Option - It must an object.');
  }

  const url = obj.url || obj.action;

  if (!url && typeof url !== 'string' && !(url instanceof URL)) {
    throw error('Request URL must be provided.');
  }

  const def = Object.assign({}, obj);
  def.host = !CONFIG.host[obj.host] ? CONFIG.host.default : obj.host;
  def.action = new URL(url, def.host);
  def.contentLength = obj.contentLength >= 0 ? obj.contentLength : CONFIG.contentLength;
  def.getBody = typeof obj.getBody === 'string' ? obj.getBody : CONFIG.getBody;
  def.progressDelay = obj.progressDelay >= 0 ? obj.progressDelay : CONFIG.progressDelay;
  def.method = typeof obj.method === 'string' ? obj.method : OPTION.method;
  def.onBefore = typeof obj.onBefore === 'function' ? obj.onBefore : CONFIG.onBefore;
  def.onError = typeof obj.onError === 'function' ? obj.onError : CONFIG.onError;
  def.onSuccess = typeof obj.onSuccess === 'function' ? obj.onSuccess : CONFIG.onSuccess;
  def.onFinally = typeof obj.onFinally === 'function' ? obj.onFinally : CONFIG.onFinally;
  def.onOK = typeof obj.onOK === 'function' ? obj.onOK : CONFIG.onOK;
  def.onProgress = typeof obj.onProgress === 'function' ? obj.onProgress : CONFIG.onProgress;
  def.onTimeout = typeof obj.onTimeout === 'function' ? obj.onTimeout : CONFIG.onTimeout;
  def.timeout = obj.timeout >= 0 ? obj.timeout : CONFIG.timeout;
  def.download = obj.download === true;
  return def;
}
/**
 * 请求发起
 * @param {CONFIG} option - 请求使用的参数.
 * @param {any} param  - 传递的数据.
 * @return {Promise<resolve(data)><reject(err)>} 
 */


function request(option, param) {
  option = getOption(option);
  const action = option.action;
  const controller = new AbortController();
  const opt = {};

  for (const key in OPTION) {
    opt[key] = key in option ? option[key] : OPTION[key];
  }

  param = opt.body || param;
  addQuery(action.searchParams, option.query);

  if (requestIsNobody(opt.method)) {
    addQuery(action.searchParams, param);
  } else if (isJSON(param)) {
    opt.body = JSON.stringify(param);
  } else {
    opt.body = param;
  }

  opt.signal = controller.signal;

  if (option.onBefore(opt, controller) === false) {
    return Promise.reject(error('The request has been cancelled.')).catch(err => option.onError(err));
  }

  const onProgress = option.download ? getProgress(option) : fakeProgress(option.contentLength, option.onProgress, option.progressDelay);

  const fakeProgressEnd = () => {
    option.download ? void 0 : onProgress.end();
  };

  const onBody = res => {
    try {
      fakeProgressEnd();
      if (option.onSuccess(res)) return res;

      if (res.ok) {
        return option.onOK(res);
      }
    } catch (error) {
      throw error;
    }

    throw error(res instanceof Response ? `url(${res.url}) method(${res.type}) status(${res.status}) statusText(${res.statusText})` : 'Unknown Request Error.');
  };

  const onError = err => {
    fakeProgressEnd();
    option.onError(err);
  };

  const onTimeout = err => {
    fakeProgressEnd();
    option.onTimeout(err);
  };

  const fetchPromise = fetch(action, opt).then(onProgress).then(onBody).catch(onError).finally(() => {
    option.onFinally();
    opt.body = null; // 释放body
  });
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(error('fetch timeout: $1', option.timeout));
    }, option.timeout);
  }).catch(onTimeout);
  return Promise.race([fetchPromise, timeoutPromise]);
} // 包装两个常用的方法

function promisify(fn) {
  return new Promise(resolve => {
    var args = Array.prototype.slice.call(arguments, 1);
    return typeof fn === 'function' ? resolve(fn.apply(null, args)) : resolve(fn);
  });
}

var promisify_1 = promisify;

function extname() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var temp = url.split('/');
  var filename = temp[temp.length - 1];
  var filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
}

var extname_1 = extname;

function IsImageFile(type) {
  return !!type && type.indexOf('image/') === 0;
}

function IsImageDataURL(url) {
  return /^data:image\//.test(url);
}

function IsImageExtname(ext) {
  return /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(ext);
}

function isImage(file) {
  switch (typeof file) {
    case 'string':
      return IsImageFile(file) || IsImageDataURL(file) || IsImageExtname(file);

    case 'object':
      if (file instanceof File) {
        return IsImageFile(file.type);
      }

      let url = file.dataURL;
      let ext = file.ext || extname_1(url);

      if (IsImageDataURL(url) || IsImageExtname(ext)) {
        return true;
      }

      if (/^data:/.test(url)) {
        return false;
      }

      if (ext) {
        return false;
      }

      return true;

    default:
      return false;
  }
}

var isImage_1 = isImage;

var _upload, _download, _remove;

var code = {
  wait: 'WAIT',
  doing: 'DOING',
  ok: 'OK',
  not: 'NOT',
  redo: 'REDO',
  done: 'DONE'
};
var status = {
  upload: (_upload = {}, _defineProperty(_upload, code.wait, ['warning', '未上传', '上传']), _defineProperty(_upload, code.doing, ['primary', '上传中', '中止']), _defineProperty(_upload, code.ok, ['success', '上传成功', '']), _defineProperty(_upload, code.not, ['danger', '上传失败', '重试']), _defineProperty(_upload, code.redo, ['fatal', '重新上传', '重试']), _defineProperty(_upload, code.done, ['muted', '已上传', '']), _upload),
  download: (_download = {}, _defineProperty(_download, code.wait, ['warning', '下载']), _defineProperty(_download, code.doing, ['primary', '下载中']), _defineProperty(_download, code.ok, ['success', '下载成功']), _defineProperty(_download, code.not, ['danger', '下载失败']), _defineProperty(_download, code.redo, ['fatal', '重新下载']), _defineProperty(_download, code.done, ['muted', '已下载']), _download),
  remove: (_remove = {}, _defineProperty(_remove, code.wait, ['warning', '删除']), _defineProperty(_remove, code.doing, ['primary', '删除中']), _defineProperty(_remove, code.ok, ['success', '删除成功']), _defineProperty(_remove, code.not, ['danger', '删除失败']), _defineProperty(_remove, code.redo, ['fatal', '重新删除']), _defineProperty(_remove, code.done, ['muted', '已删除']), _remove)
};

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


function Status(code$1, option) {
  var _this = this;

  defineAccessor(this, 'status', function () {
    return _this._code;
  }, function (code) {
    return _this._code = code;
  });
  defineAccessor(this, 'wait', function () {
    return _this._code === code.wait;
  });
  defineAccessor(this, 'doing', function () {
    return _this._code === code.doing;
  });
  defineAccessor(this, 'ok', function () {
    return _this._code === code.ok;
  });
  defineAccessor(this, 'not', function () {
    return _this._code === code.not;
  });
  defineAccessor(this, 'redo', function () {
    return _this._code === code.redo;
  });
  defineAccessor(this, 'done', function () {
    return _this._code === code.done;
  });
  defineAccessor(this, 'statusName', function () {
    return option[_this._code][0];
  });
  defineAccessor(this, 'statusText', function () {
    return option[_this._code][1];
  });
  this._code = code$1;
  this.abort = null;
  this.progress = null;
  this.status = this._code;
}
/** 
 * 模拟一个文件，便于管理
 * @param {File} file 
 * @param {string} code 
 */


function FakeFile(file, code$1) {
  this.path = file; // 映射原始文件

  this.name = file.name;
  this.size = file.size || 0;
  this.isImage = isImage_1(file);
  this.ext = file.ext || extname_1(file.name); // 已经上传的文件，等待下载与上传

  this.upload = new Status(code$1, status.upload);
  this.download = new Status(code.wait, status.download);
  this.remove = new Status(code.wait, status.remove);
  this.status = this.upload;
}
/**
 * @param {Array} fileList 已经上传的文件 默认状态为 done
 */


function FileStack(fileList, code) {
  this.stack = [];

  this.get = function (noCopy) {
    return noCopy ? this.stack : [].concat(this.stack);
  };

  this.set = function (file, code) {
    var _this2 = this;

    if (_typeof(file) !== 'object' || !file) {
      throw new Error('FileStack.set Param(`file`) must be an Object.');
    }

    (Array.isArray(file) ? file : [file]).forEach(function (value) {
      if (value instanceof FakeFile) {
        throw new Error('File is already in stack.');
      }

      if (_typeof(value) !== 'object' || !value) {
        throw new Error('Invalid File, it must instanceof `native File`');
      }

      return _this2.stack.push(new FakeFile(value, code));
    });
  };

  this.remove = function (file) {
    if (file == null) return;
    var stack = this.stack;

    var clean = function clean(file) {
      if (!file) return;
      file.upload = null;
      file.remove = null;
      file.download = null;
    };

    if (typeof file === 'number') {
      return clean(stack.splice(file, 1)[0]);
    }

    if (_typeof(file) !== 'object' || !file) {
      throw new Error('FileStack.remove Param(`file`) must be an object.');
    }

    var files = Array.isArray(file) ? file : [file];

    for (var i = 0; i < stack.length; i++) {
      if (files.indexOf(stack[i]) > -1) {
        clean(stack.splice(i, 1)[0]);
      }
    }
  };

  this.clear = function () {
    this.stack = [];
  };

  this.set(fileList || [], code);
}

var InputFile = /*#__PURE__*/function (_React$Component) {
  _inherits(InputFile, _React$Component);

  var _super = _createSuper(InputFile);

  _createClass(InputFile, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      if ('fileList' in nextProps) {
        return {
          fileList: nextProps.fileList || []
        };
      }

      return null;
    }
  }]);

  function InputFile(props) {
    var _this;

    _classCallCheck(this, InputFile);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "bindFileInputRef", function (element) {
      return _this.fileInput = element;
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      if (!_this.fileInput) return;
      _this.fileInput.value = '';

      _this.fileInput.click();
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      if (e.key === 'Enter') _this.onClick();
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
      var files = Array.prototype.slice.call(e.target.files);

      if (_this.props.onChange && _this.props.onChange(files)) {
        return;
      }

      if (!_this.props.multiple) {
        _this.fileStack.clear(); // 单文件模式


        if (files.length > 1) {
          files.splice(1);
        }
      }

      _this.fileStack.set(files, code.wait);

      _this.setState({
        fileList: _this.fileStack.get()
      }, function () {
        if (_this.props.upload.auto) {
          if (_this.props.upload.bulk) {
            return console.log('Not Supported.');
          }

          _this.state.fileList.forEach(function (file) {
            return _this.upload(file);
          });
        }
      });
    });

    _this.fileInput = null;
    _this.fileStack = new FileStack(props.value, code.done);
    _this.state = {
      fileList: _this.fileStack.get(),
      render: props.render
    };

    _this.loadView(!!props.render, props.type);

    return _this;
  }

  _createClass(InputFile, [{
    key: "loadView",
    value: function loadView(isCustomized, key) {
      var _this2 = this;

      if (isCustomized === false) {
        var render;

        switch (key) {
          case 'picture':
            render = import('./Picture-faeb1b4c.js');
            break;

          case 'dragbox':
            render = import('./Dragbox-6fdda2bd.js');
            break;

          case 'list':
          default:
            render = import('./List-cd4307ac.js');
            break;
        }

        return render.then(function (res) {
          _this2.setState({
            render: res["default"]
          });
        })["catch"](function (err) {
          return assertConsole(false, err);
        });
      }
    }
  }, {
    key: "request",
    // 数据请求
    value: function request$1(file, key) {
      var _this3 = this;

      if (!this.props[key]) {
        return assertConsole(false, '请提供与'.concat(key).concat('对应的处理方案！'));
      }

      var props = this.props;
      var _props$key = props[key],
          method = _props$key.method,
          action = _props$key.action,
          body = _props$key.body,
          onBefore = _props$key.onBefore,
          onError = _props$key.onError,
          onOK = _props$key.onOK,
          onProgress = _props$key.onProgress,
          onAbort = _props$key.onAbort,
          option = _props$key.option,
          dataType = _props$key.dataType;
      var status = file[key];
      var required = [promisify_1(action, file), promisify_1(body, file, props)];
      return Promise.all(required).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            action = _ref2[0],
            body = _ref2[1];

        var rOption = {};
        var fetchOpt = Object.assign({
          headers: props.headers,
          mode: typeof props.cors === 'boolean' ? 'cors' : props.cors
        }, option);

        for (var _key in fetchOpt) {
          if (fetchOpt.hasOwnProperty(_key)) {
            rOption[_key] = fetchOpt[_key];
          }
        }

        rOption.action = action;
        rOption.body = body;
        rOption.download = key === 'download';
        rOption.contentLength = file.size;
        rOption.method = method || 'post';

        rOption.onOK = function (res) {
          return res[dataType || props.dataType || 'json']();
        };

        rOption.onBefore = function (opt, controller) {
          var befored = onBefore ? onBefore(opt, file) : void 0;
          status.status = code.doing;

          status.abort = function (callback) {
            status.abort = null;
            controller.abort();
            status.status = code.not;
            status.progress = null;

            _this3.setState({
              fileList: _this3.fileStack.get()
            }, function () {
              if (onAbort) onAbort(file);
              typeof callback === 'function' ? callback() : null;
            });
          };

          _this3.setState({
            fileList: _this3.fileStack.get()
          }, function () {
            if (befored === false) {
              status.abort();
            }
          });

          if (befored === false) {
            status.abort();
            return false; // 由用户取消 
          }
        };

        rOption.onProgress = function (progress) {
          status.progress = progress;

          _this3.setState({
            fileList: _this3.fileStack.get()
          }, function () {
            if (onProgress) onProgress(file);
          });
        };

        return request(rOption).then(function (ret) {
          status.abort = null;
          status.progress = null;

          if (onOK) {
            ret = onOK(ret, file);
          }

          if (ret) {
            var timer = setTimeout(function () {
              clearTimeout(timer);
              status.status = code.ok;

              if (key === 'remove') {
                _this3.fileStack.remove(file); // 从fileList中删除该文件

              }

              _this3.setState({
                fileList: _this3.fileStack.get()
              }, function () {
                if (key === 'upload') {
                  file.path = Object.assign({
                    name: file.name
                  }, ret);
                }
              });
            }, 100);
          } else {
            status.status = code.not;
            throw new Error('User Defined Expection.');
          }
        })["catch"](function (err) {
          status.abort = null;
          status.progress = null;
          status.status = code.not;

          _this3.setState({
            fileList: _this3.fileStack.get()
          }, function () {
            if (onError) return onError(err, file);
            assertConsole(false, err);
          });
        });
      });
    } // 图片预览

  }, {
    key: "preview",
    value: function preview(file) {
      if (this.props.preview) {
        this.props.preview(file);
      }
    } // 文件上传

  }, {
    key: "upload",
    value: function upload(file) {
      if (!(file.path instanceof File)) {
        // 已经上传过了 
        return assertCall_1(this.props.upload && this.props.upload.onError, '`FakeFile` not map to native `File` instance.');
      }

      file.status = file.upload; // 文件已经上传 文件上传成功

      if (file.upload.done || file.upload.ok) {
        return;
      } // 文件上传中, 中止


      if (file.upload.doing) {
        return file.upload.abort();
      } // 开始上传


      return this.request(file, 'upload');
    } // 文件下载

  }, {
    key: "download",
    value: function download(file) {
      file.status = file.download; // 避免重复下载，当文件已经下载了，就返回一个错误

      if (file.download.ok || file.download.done) {
        return assertCall_1(this.props.download && this.props.download.onError, '文件已经下载到了本地，请不要重复下载！');
      } // 文件正子啊下载中，中止下载


      if (file.download.doing) {
        return file.download.abort();
      } // 文件已经删除或者正在删除，不能下载


      if (file.remove.ok || file.remove.done || file.remove.doing) {
        return assertCall_1(this.props.download && this.props.download.onError, '文件正在删除，或者已删除，无法下载');
      } // 文件加入 fileList 但没有上传，不能下载


      if (file.upload.wait) {
        return assertCall_1(this.props.download && this.props.download.onError, '文件还没有上传，无法下载，可以尝试预览或本地浏览！');
      } // 文件正在上传或者上传出错，不能下载


      if (file.upload.doing || file.upload.not) {
        return assertCall_1(this.props.download && this.props.download.onError, '文件正在上传或者上传失败，无法从服务器下载！');
      } // 已经上传至服务器空间, 从服务端下载


      if (file.upload.done || file.upload.ok) {
        return this.request(file, 'download');
      }
    } // 文件删除

  }, {
    key: "remove",
    value: function remove(file) {
      var _this4 = this;

      file.status = file.remove; // 文件正在删除中, [中止删除]

      if (file.remove.doing) {
        return file.remove.abort();
      } // 上传中, 先终止上传


      if (file.upload.doing) {
        if (!!(this.props.remove || {}).force) {
          return file.upload.abort();
        }

        return assertCall_1(this.props.remove && this.props.remove.onError, '文件正在上传中，不可删除');
      } // 下载中,说明文件已经上传至服务器，需要先终止下载


      if (file.download.doing) {
        if (!!(this.props.remove || {}).force) {
          return file.download.abort(function () {
            return _this4.request(file, 'remove');
          });
        }

        return assertCall_1(this.props.remove && this.props.remove.onError, '文件正在下载中，不可删除');
      } // 已经上传至服务器空间, 从服务端删除 


      if (file.upload.done || file.upload.ok) {
        return this.request(file, 'remove');
      } // 从fileStack中移除当前文件


      this.fileStack.remove(file);
      this.setState({
        fileList: this.fileStack.get()
      }, function () {
        if (_this4.props.remove && _this4.props.remove.onOK) {
          return _this4.props.remove.onOK(file);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var render = this.state.render || props.render;
      var inputProps = {
        accept: props.accept,
        directory: props.directory ? 'directory' : null,
        multiple: props.multiple,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        onChange: this.onChange,
        ref: this.bindFileInputRef,
        style: {
          display: 'none'
        },
        tabIndex: '0',
        type: 'file',
        webkitdirectory: props.directory ? 'webkitdirectory' : null,
        name: props.name,
        key: 'input'
      };
      return typeof render === 'function' ? render.call(this, props, inputProps) : props.children;
    }
  }]);

  return InputFile;
}(React__default.Component);

InputFile.defaultProps = {
  name: 'file',
  type: 'list',
  icon: true
};

if (window.DEV) {
  var requestType = {
    action: propTypes.oneOfType([propTypes.string, propTypes.func]).isRequired,
    // 请求的URL
    body: propTypes.oneOfType([propTypes.Object, propTypes.func]).isRequired,
    // 请求时附带的参数
    method: propTypes.string,
    // 请求使用的http方法
    onAbort: propTypes.func,
    // 请求被中止
    onBefore: propTypes.func,
    // 请求开始执行前
    onError: propTypes.func,
    // 请求产生错误
    onOK: propTypes.func.isRequired,
    // 请求执行成功
    option: propTypes.object,
    // fetch请求时的配置参数
    dataType: propTypes.oneOf(['arrayBuffer', 'blob', 'json', 'text', 'formData']) // 返回值处理类型

  };
  var upRequestType = propTypes.shape(_objectSpread2({
    auto: propTypes.bool,
    // 是否自动上传
    bulk: propTypes.bool
  }, requestType));
  var dnRequestType = propTypes.shape(_objectSpread2({
    bulk: propTypes.bool
  }, requestType));
  var rmRequestType = propTypes.shape(_objectSpread2({
    bulk: propTypes.bool,
    // 批量删除
    // 如果为true，则文件正在下载中时，用户点击删除，将强行中止下载，执行删除；
    // 反之，则退出提示正在执行的操作
    force: propTypes.force
  }, requestType));
  InputFile.propTypes = {
    accept: propTypes.string,
    // 同 input 的 accept 属性
    directory: propTypes.bool,
    // 同 input 的 directory 属性
    name: propTypes.string,
    // input file 字段名称
    multiple: propTypes.bool,
    // 多文件模式，同 input 的 multiple 属性
    onChange: propTypes.func,
    // input file 产生变化时的相应 
    upload: propTypes.objectOf(upRequestType).isRequired,
    // 文件上传
    download: propTypes.objectOf(dnRequestType),
    // 文件下载
    remove: propTypes.objectOf(rmRequestType),
    // 文件删除
    preview: propTypes.func,
    // 图片预览
    value: propTypes.array,
    // 默认的 fileList
    fileList: propTypes.array,
    // 用于受控模式，管理文件列表
    message: propTypes.any,
    // 提示信息，可友好提醒用户 
    readonly: propTypes.bool,
    // 只读模式
    disabled: propTypes.bool,
    // 禁用模式
    type: propTypes.oneOf('list', 'picture', 'dragbox'),
    // 视图类型
    render: propTypes.func,
    // 自定义视图,
    showFileSize: propTypes.bool,
    // 显示文件大小
    showStatusText: propTypes.bool,
    // 显示请求过程中的状态文本
    headers: propTypes.object,
    // 请求头
    cors: propTypes.bool,
    // 是否跨域
    dataType: requestType.dataType,
    // 期待的http返回值格式
    icon: propTypes.bool,
    // 是否启用 icon 代替按钮文本
    getPath: propTypes.func // 返回文件相对于服务器的路径函数

  };
}

export { InputFile as I, code as c };
