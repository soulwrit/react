import { a as _inherits, b as _createSuper, d as _classCallCheck, _ as _defineProperty, e as _assertThisInitialized, c as _createClass, i as _typeof } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { n as noop_1 } from './noop-469b0e21.js';
import { a as assert_1 } from './assert-cc694573.js';
import { r as raf } from './raf-4503f6a0.js';

var barProps = {
  x: {
    client: 'clientX',
    clientSize: 'clientWidth',
    dir: 'left',
    min: 'minHeight',
    offset: 'offsetLeft',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    trackSize: 'height'
  },
  y: {
    client: 'clientY',
    clientSize: 'clientHeight',
    dir: 'top',
    min: 'minWidth',
    offset: 'offsetTop',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    trackSize: 'width'
  }
};

var Scrollor = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Scrollor, _React$PureComponent);

  var _super = _createSuper(Scrollor);

  function Scrollor() {
    var _this;

    _classCallCheck(this, Scrollor);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "onWindowReisize", function () {
      raf(function () {
        _this.init();

        _this.onScroll();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onReadyStateChange", function () {
      if (document.readyState === 'complete') {
        _this.init();

        _this.setStartPos();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveRef", function (elememt) {
      _this.el = elememt;
    });

    _defineProperty(_assertThisInitialized(_this), "onScroll", function () {
      raf(function () {
        var el = _this.el;
        var _this$refs = _this.refs,
            xTrack = _this$refs.xTrack,
            yTrack = _this$refs.yTrack;
        var scrollLeft = el.scrollLeft,
            scrollHeight = el.scrollHeight,
            scrollTop = el.scrollTop,
            scrollWidth = el.scrollWidth;
        var top = void 0;
        var left = void 0;

        if (yTrack) {
          top = Math.round(scrollTop / scrollHeight * yTrack.clientHeight);
        }

        if (xTrack) {
          left = Math.round(scrollLeft / scrollWidth * xTrack.clientWidth);
        }

        _this.setState({
          top: top,
          left: left
        }, function () {
          _this.props.onScroll(_this.state);
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getTrackMouseDown", function (axis) {
      return function (e) {
        var el = _this.el;

        var bar = _this.refs["".concat(axis, "Bar")];

        var track = _this.refs["".concat(axis, "Track")];

        var _barProps$axis = barProps[axis],
            client = _barProps$axis.client,
            clientSize = _barProps$axis.clientSize,
            scroll = _barProps$axis.scroll,
            scrollSize = _barProps$axis.scrollSize;
        var elSize = el[scrollSize];
        var trackSize = track[clientSize];
        var barSize = bar[clientSize];
        var maxDis = trackSize - barSize || 1;
        var curr = e[client] - barSize;

        if (curr >= maxDis) {
          curr = maxDis;
        } else if (curr <= 0) {
          curr = 0;
        }

        el[scroll] = Math.round(curr / trackSize * elSize);
      };
    });

    _this.state = {
      width: void 0,
      height: void 0,
      top: void 0,
      left: void 0,
      scrollWidth: void 0,
      scrollHeight: void 0
    };
    return _this;
  }

  _createClass(Scrollor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
      document.addEventListener('readystatechange', this.onReadyStateChange);
      window.addEventListener('resize', this.onWindowReisize, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('readystatechange', this.onReadyStateChange);
      window.removeEventListener('resize', this.onWindowReisize, false);
    }
  }, {
    key: "init",
    value: function init() {
      var _this$el = this.el,
          clientWidth = _this$el.clientWidth,
          clientHeight = _this$el.clientHeight,
          scrollWidth = _this$el.scrollWidth,
          scrollHeight = _this$el.scrollHeight;
      var sizeX = clientWidth / scrollWidth;
      var sizeY = clientHeight / scrollHeight;
      assert_1.ok(Number.isNaN(sizeX), 'Invalid scroll x size.');
      assert_1.ok(Number.isNaN(sizeY), 'Invalid scroll y size.');
      this.setState({
        width: sizeX >= 1 ? void 0 : sizeX * 100 + '%',
        height: sizeY >= 1 ? void 0 : sizeY * 100 + '%',
        scrollWidth: scrollWidth,
        scrollHeight: scrollHeight
      });
    }
  }, {
    key: "setStartPos",
    value: function setStartPos() {
      var start = this.props.start;
      var el = this.el;

      switch (_typeof(start)) {
        case 'string':
          if (start.includes('bottom')) {
            el.scrollTop = el.scrollHeight;
          }

          if (start.includes('right')) {
            el.scrollLeft = el.scrollWidth;
          }

          break;

        case 'object':
          el.scrollTop = start.top;
          el.scrollLeft = start.left;
          break;
      }
    }
  }, {
    key: "getBarMouseDown",
    value: function getBarMouseDown(axis) {
      var _this2 = this;

      return function (e) {
        if (e.ctrlKey || e.button === 2) {
          return;
        }

        e.stopPropagation();
        var _barProps$axis2 = barProps[axis],
            client = _barProps$axis2.client,
            offset = _barProps$axis2.offset,
            clientSize = _barProps$axis2.clientSize,
            scroll = _barProps$axis2.scroll,
            scrollSize = _barProps$axis2.scrollSize;
        var el = _this2.el;
        var elSize = el[scrollSize];
        var currentTarget = e.currentTarget;
        var barSize = currentTarget[clientSize];
        var trackSize = currentTarget.parentElement[clientSize];
        var maxDis = trackSize - barSize || 1;
        var dis = e[client] - currentTarget[offset]; // console.log('Down Client', e[client]);
        // console.log('Down Offset', currentTarget[offset]);
        // console.log('Down Dis   ', dis);

        var onMouseMove = function onMouseMove(e) {
          raf(function () {
            var curr = e[client] - dis; // console.log('Move Client', e[client]);
            // console.log('Move Dis   ', dis);
            // console.log('Move Curr  ', curr);

            if (curr >= maxDis) {
              curr = maxDis;
            } else if (curr <= 0) {
              curr = 0;
            } // console.log('Move Current', curr);


            el[scroll] = Math.round(curr / trackSize * elSize);
          });
        };

        var onMouseUp = function onMouseUp() {
          document.removeEventListener('mousemove', onMouseMove, false);
          document.removeEventListener('mouseup', onMouseUp, false);
          document.onselectstart = null;
        };

        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('mouseup', onMouseUp, false);

        document.onselectstart = function () {
          return false;
        };
      };
    }
  }, {
    key: "getBar",
    value: function getBar(axis) {
      var _barStyle;

      var barProp = barProps[axis];
      var barSize = this.state[barProp.size];
      if (!barSize) return;
      var _this$props = this.props,
          barClassName = _this$props.barClassName,
          bgColor = _this$props.bgColor,
          min = _this$props.min,
          size = _this$props.size,
          trackClassName = _this$props.trackClassName;
      var barPos = this.state[barProp.dir];
      var barStyle = (_barStyle = {}, _defineProperty(_barStyle, barProp.dir, barPos), _defineProperty(_barStyle, barProp.size, barSize), _defineProperty(_barStyle, barProp.min, min), _defineProperty(_barStyle, "backgroundColor", bgColor), _barStyle);

      var trackStyle = _defineProperty({}, barProp.trackSize, size);

      return /*#__PURE__*/React__default.createElement('div', {
        className: classnames('track', axis, trackClassName),
        onMouseDown: this.getTrackMouseDown(axis),
        ref: "".concat(axis, "Track"),
        style: trackStyle
      }, /*#__PURE__*/React__default.createElement('div', {
        className: classnames('bar', barClassName),
        onMouseDown: this.getBarMouseDown(axis),
        ref: "".concat(axis, "Bar"),
        style: barStyle
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          className = _this$props2.className,
          offset = _this$props2.offset,
          _native = _this$props2["native"],
          size = _this$props2.size,
          stress = _this$props2.stress,
          viewXOffset = _this$props2.viewXOffset;
      var scrollWidth = this.state.scrollWidth;
      var wrapStyle = offset >= 0 && offset !== 17 ? {
        paddingBottom: offset,
        paddingRight: offset,
        marginRight: -offset,
        marginBottom: -offset
      } : null;
      var viewStyle = scrollWidth ? {
        width: scrollWidth,
        paddingRight: viewXOffset || size
      } : null;
      return _native ? children : /*#__PURE__*/React__default.createElement('div', {
        className: classnames('scr', className, {
          stress: stress
        })
      }, /*#__PURE__*/React__default.createElement('div', {
        children: /*#__PURE__*/React__default.createElement('div', {
          className: 'view',
          style: viewStyle,
          children: children
        }),
        className: 'wrap',
        ref: this.saveRef,
        onScroll: this.onScroll,
        style: wrapStyle
      }), this.getBar('x'), this.getBar('y'));
    }
  }]);

  return Scrollor;
}(React__default.PureComponent);
Scrollor.defaultProps = {
  barClassName: void 0,
  bgColor: void 0,
  className: void 0,
  "native": false,
  min: 24,
  offset: 17,
  onScroll: noop_1,
  stress: true,
  size: void 0,
  start: void 0,
  trackClassName: void 0,
  viewXOffset: void 0
};

if (window.DEV) {
  Scrollor.propTypes = {
    barClassName: propTypes.string,
    // 滚动块的类名
    bgColor: propTypes.string,
    // 滚动块的背景色
    className: propTypes.string,
    // 滚动容器的类名
    "native": propTypes.bool,
    // 是否使用原生滚动条
    min: propTypes.oneOfType([propTypes.number, propTypes.string]),
    // 滚动块的最小(可视大小)
    offset: propTypes.number,
    // 浏览器默认的滚动条大小
    onScroll: propTypes.func,
    // 滚动事件
    size: propTypes.oneOfType([propTypes.number, propTypes.string]),
    // 轨道的大小
    stress: propTypes.bool,
    // 应激性
    start: propTypes.oneOfType([propTypes.string, propTypes.object]),
    // 初始定位
    trackClassName: propTypes.string,
    // 滚动轨道的类名
    viewXOffset: propTypes.number // 内容区右侧内间距

  };
}

export { Scrollor };
