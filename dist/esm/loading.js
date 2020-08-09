import { _ as _inherits, a as _createSuper, b as _classCallCheck, e as _createClass } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';

function int2positive(n, def) {
  return Number.isInteger(n) && n >= 0 ? n : def >= 0 ? def : 0; //  Number.isInteger(n) ? Math.abs(n * 1) : null;
}

var intToPositive = int2positive;

/**
 * 
 * @param {HTMLCanvasElement} cvs DOM元素
 * @param {Object} opt 
 * @param {number} opt.size 轨迹圆的直径 diameter
 * @param {number} opt.speed 移动圆移动角度
 * @param {number} opt.offset 移动圆移动基准角度
 * @param {number} opt.step 移动圆半径的坍缩值
 * @param {number} opt.block 移动圆的个数
 * @param {String} opt.rgb 移动圆的填充色
 * @param {String} opt.bgColor 背景色
 */

function trackball(cvs, opt) {
  opt = opt || {};
  var ctx = cvs.getContext("2d");
  var R = intToPositive(opt.size, 24);
  var speed = intToPositive(opt.speed, 10);
  var step = intToPositive(opt.step, 0.5);
  var offset = Number.isFinite(opt.offset) ? opt.offset : -30;
  var block = intToPositive(opt.block, 10);
  var rgb = typeof opt.rgb === 'string' ? opt.rgb : '0,123,255';
  var bgColor = typeof opt.bgColor === 'string' ? opt.bgColor : 'transparent';
  var C = R / 2;
  var maxR = R / block;
  var rr = C - maxR - 2;
  var max = Math.ceil(maxR / step);
  var angle = new Array(max);
  var style = new Array(max);
  var r = new Array(max);
  var timer, x, y, i;

  for (i = max - 1; i >= 0; i--) {
    r[i] = maxR - step * i;
    angle[i] = r[i] / rr / (Math.PI / 180) + i * offset;
    style[i] = 'rgba(' + rgb + ',' + (1 - 0.15 * i) + ')';
  }

  cvs.height = R;
  cvs.width = R;
  ctx.translate(C, C);
  timer = setInterval(function draw() {
    ctx.fillStyle = bgColor;
    ctx.clearRect(-C, -C, R, R);

    for (i = max - 1; i >= 0; i--) {
      x = rr * Math.cos(angle[i] * Math.PI / 180);
      y = rr * Math.sin(angle[i] * Math.PI / 180);
      ctx.beginPath();
      ctx.fillStyle = style[i];
      ctx.arc(x, y, r[i], 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.fill();
      angle[i] += speed;
    }
  }, 100);
  return function () {
    clearInterval(timer);
    timer = null;
  };
}

/**
 * 根据 length 生成数组
 * @param {Number} length 
 * @param {Function} generate 
 * @returns {Array}
 */

function arrayGenerate(length, generate) {
  var array = new Array(length);

  if (typeof generate === 'function') {
    for (let i = 0; i < length; i++) {
      array[i] = generate(i, array);
    }
  }

  return array;
}

var arrayGenerate_1 = arrayGenerate;

/** 
 * @param {HTMLCanvasElement} cvs 
 * @param {Object} opt 
 * @param {number} opt.block 花瓣的个数
 * @param {number} opt.height 花瓣的高度
 * @param {number} opt.width 花瓣的宽度
 * @param {number} opt.time 转动延迟时间
 * @param {number} opt.init 初始角度
 * @param {number} opt.diff 花瓣根部到圆心的距离
 * @param {number} opt.rgb 花瓣颜色
 * @param {number} opt.bgColor 背景色
 */

function sunflower(cvs, opt) {
  opt = opt || {};
  var block = intToPositive(opt.block, 6);
  var height = intToPositive(opt.height, 4);
  var width = intToPositive(opt.width, 2);
  var time = intToPositive(opt.time, 100);
  var radius = intToPositive(opt.init, 2);
  var diff = intToPositive(opt.diff, 2);
  var rgb = typeof opt.rgb === 'string' ? opt.rgb : '0,123,255';
  var bgColor = typeof opt.bgColor === 'string' ? opt.bgColor : 'transparent';
  var ctx = cvs.getContext("2d");
  var dx = height * 6;
  var dy = height * 6;
  var ox = dx / 2;
  var oy = dy / 2;
  var ry1 = dx / 2 - height * 2;
  var ry2 = dx / 2 - height - diff;
  var rx2 = width / 2;
  var style = arrayGenerate_1(block, i => 'rgba(' + rgb + ',' + +(i / block) + ')');
  var stop, timer;

  var start = function (radius) {
    if (stop) return;
    ctx.fillStyle = bgColor;
    ctx.rotate(Math.PI * 2 / block);

    for (var i = 1; i <= block; i++) {
      ctx.rotate(Math.PI * 2 / block);
      ctx.beginPath();
      ctx.fillStyle = style[i];
      ctx.arc(0, ry1, rx2, 0, Math.PI, true);
      ctx.arc(0, ry2, rx2, Math.PI, 0, true);
      ctx.closePath();
      ctx.fill();
    }

    timer = setTimeout(function () {
      ctx.clearRect(-ox, -oy, dx, dy);
      start();
    }, time);
  };

  cvs.height = dy;
  cvs.width = dx;
  ctx.translate(ox, oy);
  start();
  return function () {
    stop = true;
    if (timer) clearTimeout(timer);
  };
}

var Loading = /*#__PURE__*/function (_React$Component) {
  _inherits(Loading, _React$Component);

  var _super = _createSuper(Loading);

  function Loading() {
    _classCallCheck(this, Loading);

    return _super.apply(this, arguments);
  }

  _createClass(Loading, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.cvs) {
        this.clean = {
          1: trackball,
          2: sunflower
        }[this.props.type](this.cvs, this.props);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.clean) this.clean();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var children;

      switch (this.props.type) {
        case 1:
        case 2:
          children = [/*#__PURE__*/React__default.createElement('canvas', {
            ref: function ref(el) {
              return _this.cvs = el;
            },
            key: 0,
            className: 'cvs'
          }), /*#__PURE__*/React__default.createElement(React__default.Fragment, {
            key: 1,
            children: this.props.value || this.props.children
          })];
          break;

        case 0:
          children = /*#__PURE__*/React__default.createElement('div', {
            children: this.props.value || this.props.children,
            className: 'txt'
          });
      }

      return /*#__PURE__*/React__default.createElement('div', {
        className: classnames(CSSUtil.loading, this.props.className),
        children: children,
        style: this.props.style
      });
    }
  }]);

  return Loading;
}(React__default.Component);
Loading.defaultProps = {
  value: 'loading ... ',
  // error: 'Sorry, there was a problem loading the page.',
  type: 0
};

if (window.DEV) {
  Loading.propTypes = {
    value: propTypes.any,
    // error: PropTypes.any,
    type: propTypes.number
  };
}

export { Loading };
