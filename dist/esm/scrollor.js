import { _ as _inherits, a as _createSuper, b as _classCallCheck, c as _defineProperty, d as _assertThisInitialized, e as _createClass, i as _typeof } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { a as assert_1 } from './assert-cc694573.js';
import { n as noop_1 } from './noop-469b0e21.js';
import { r as raf } from './raf-4503f6a0.js';

var barProps = {
  x: {
    client: 'clientX',
    dir: 'left',
    min: 'minHeight',
    offset: 'offsetLeft',
    offsetSize: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    trackSize: 'height'
  },
  y: {
    client: 'clientY',
    dir: 'top',
    min: 'minWidth',
    offset: 'offsetTop',
    offsetSize: 'offsetHeight',
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

    _defineProperty(_assertThisInitialized(_this), "setRef", function (elememt) {
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
        var top = undefined;
        var left = undefined;

        if (yTrack) {
          top = Math.round(scrollTop / scrollHeight * yTrack.offsetHeight);
        }

        if (xTrack) {
          left = Math.round(scrollLeft / scrollWidth * xTrack.offsetWidth);
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
            offsetSize = _barProps$axis.offsetSize,
            scroll = _barProps$axis.scroll,
            scrollSize = _barProps$axis.scrollSize;
        var elSize = el[scrollSize];
        var trackSize = track[offsetSize];
        var barSize = bar[offsetSize];
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

    _defineProperty(_assertThisInitialized(_this), "onContextMenu", function (e) {
      e.preventDefault();
      return false;
    });

    _this.state = {
      width: undefined,
      height: undefined,
      top: undefined,
      left: undefined
    };
    return _this;
  }

  _createClass(Scrollor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
      this.setStartPos();
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
    key: "UNSAFE_componentWillUpdate",
    value: function UNSAFE_componentWillUpdate(prevProps) {
      if (prevProps.children !== this.props.children) {
        this.onWindowReisize();
      }
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      raf(function () {
        var _this2$props = _this2.props,
            min = _this2$props.min,
            timeout = _this2$props.timeout;

        var calc = function calc() {
          try {
            var _this2$el = _this2.el,
                offsetWidth = _this2$el.offsetWidth,
                offsetHeight = _this2$el.offsetHeight,
                scrollWidth = _this2$el.scrollWidth,
                scrollHeight = _this2$el.scrollHeight; // 异步情况下，子元素没加入DOM中，导致滚地区没有大小，因此重复检测一下

            if (offsetHeight > 0 || offsetWidth > 0) {
              clearInterval(timer);
              timer = null;
            }

            var sizeX = offsetWidth / (scrollWidth || 1);
            var sizeY = offsetHeight / (scrollHeight || 1);
            assert_1.ok(Number.isNaN(sizeX), 'Invalid scroll x size.');
            assert_1.ok(Number.isNaN(sizeY), 'Invalid scroll y size.');
            var minX = (scrollWidth - offsetWidth) * sizeX;
            var minY = (scrollHeight - offsetHeight) * sizeY;

            _this2.setState({
              width: sizeX >= 1 || minX < min ? undefined : sizeX * 100 + '%',
              height: sizeY >= 1 || minY < min ? undefined : sizeY * 100 + '%'
            });
          } catch (error) {}
        };

        var sTime = Date.now();
        var timer = setInterval(function () {
          var eTime = Date.now();

          if (eTime - sTime > timeout) {
            // 超过10s 滚动条没有加载出来，就放弃初始计算
            clearInterval(timer);
            timer = null;
          }

          calc();
        }, 100);
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
      var _this3 = this;

      return function (e) {
        if (e.ctrlKey || e.button === 2) {
          return;
        }

        e.stopPropagation();
        var _barProps$axis2 = barProps[axis],
            client = _barProps$axis2.client,
            offset = _barProps$axis2.offset,
            offsetSize = _barProps$axis2.offsetSize,
            scroll = _barProps$axis2.scroll,
            scrollSize = _barProps$axis2.scrollSize;
        var el = _this3.el;
        var elSize = el[scrollSize];
        var currentTarget = e.currentTarget;
        var barSize = currentTarget[offsetSize];
        var trackSize = currentTarget.parentElement[offsetSize];
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
        onContextMenu: this.onContextMenu,
        onMouseDown: this.getTrackMouseDown(axis),
        ref: "".concat(axis, "Track"),
        style: trackStyle
      }, /*#__PURE__*/React__default.createElement('div', {
        className: classnames('bar', barClassName),
        onContextMenu: this.onContextMenu,
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
          viewClassName = _this$props2.viewClassName,
          _native = _this$props2["native"],
          offset = _this$props2.offset,
          onClick = _this$props2.onClick,
          onContextMenu = _this$props2.onContextMenu,
          size = _this$props2.size,
          stress = _this$props2.stress,
          viewRef = _this$props2.viewRef,
          viewXOffset = _this$props2.viewXOffset,
          viewYOffset = _this$props2.viewYOffset;
      var isDefaultOffset = offset >= 0 && offset === 17;
      var wrapStyle = {
        marginRight: isDefaultOffset ? undefined : -offset,
        marginBottom: isDefaultOffset ? undefined : -offset,
        overflowY: this.state.height == null ? 'hidden' : undefined,
        overflowX: this.state.width == null ? 'hidden' : undefined
      };
      var viewStyle = {
        paddingRight: viewXOffset || size,
        paddingBottom: viewYOffset || size
      };
      return _native ? children : /*#__PURE__*/React__default.createElement('div', {
        className: classnames('scr', className, {
          stress: stress
        }),
        onContextMenu: onContextMenu
      }, /*#__PURE__*/React__default.createElement('div', {
        className: 'wrapper',
        ref: this.setRef,
        onScroll: this.onScroll,
        style: wrapStyle
      }, /*#__PURE__*/React__default.createElement('div', {
        className: classnames('view', viewClassName),
        ref: viewRef,
        style: viewStyle,
        onClick: onClick
      }, children)), this.getBar('x'), this.getBar('y'));
    }
  }]);

  return Scrollor;
}(React__default.PureComponent);
Scrollor.defaultProps = {
  barClassName: undefined,
  bgColor: undefined,
  className: undefined,
  "native": false,
  min: 24,
  offset: 17,
  onContextMenu: noop_1,
  onScroll: noop_1,
  stress: true,
  size: undefined,
  start: undefined,
  trackClassName: undefined,
  viewRef: undefined,
  viewXOffset: undefined,
  viewYOffset: undefined,
  timeout: 10000
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
    onClick: propTypes.func,
    // 内容区点击事件
    onContextMenu: propTypes.func,
    // 右键菜单事件
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
    viewRef: propTypes.func,
    // 内容区的ref
    viewXOffset: propTypes.number,
    // 内容区右侧内间距
    viewYOffset: propTypes.number,
    // 内容区右侧内间距
    timeout: propTypes.number // 滚动条加载超时数

  };
}

export { Scrollor };
