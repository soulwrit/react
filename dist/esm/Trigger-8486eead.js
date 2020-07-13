import { a as _inherits, b as _createSuper, d as _classCallCheck, _ as _defineProperty, e as _assertThisInitialized, c as _createClass } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as contains } from './dom-contains-5179471e.js';
import { o as objectHasOwn } from './object-has-own-6b83c90b.js';
import { r as raf } from './raf-4503f6a0.js';
import { a as assert_1 } from './assert-cc694573.js';

function isMethod(obj, name) {
  return objectHasOwn(obj, name) && typeof obj[name] === 'function';
}

var isMethod_1 = isMethod;

/**
 * 是否为相同坐标
 * @param {object} coord 
 */
function isEqualCoord(coord, other) {
  if (coord == null || other == null) return false;
  const x1 = parseInt(coord.left || coord.x);
  const y1 = parseInt(coord.top || coord.y);
  const x2 = parseInt(other.left || other.x);
  const y2 = parseInt(other.top || other.y);
  return x1 === x2 && y1 === y2;
}

var coordEqual = isEqualCoord;

//     const names = [
//         'calcCoord', 'closeOnEsc', 'closeOnOutsideClick',
//         'escape', 'equalCoord',
//         'onClose', 'onOpen', 'onKeyUp', 'onResize',
//         'resetOnTopResize', 'visible'
//     ];
//     mixin = typeof mixin === 'object' && mixin ? mixin : {};
//     names.forEach(prop => {
//         if (hasOwn(props, prop)) {
//             mixin[prop] = props[prop];
//         }
//     });
//     return mixin;
// }

var Trigger = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Trigger, _React$PureComponent);

  var _super = _createSuper(Trigger);

  function Trigger(props) {
    var _this;

    _classCallCheck(this, Trigger);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "setCoord", function (callback) {
      var point = _this.pointRef.current;
      var layer = _this.layerRef.current;
      if (!point || !layer) return;

      try {
        var pRect = point.getBoundingClientRect();
        var lRect = layer.getBoundingClientRect();

        var coord = _this.props.calcCoord(pRect, lRect);

        _this.coord = coord;

        _this.setState({
          coord: coord
        }, callback);
      } catch (error) {
        // 报告错误
        assert_1.report(error);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setVisible", function (visible) {
      _this.setState({
        visible: visible
      }, function () {
        if (visible) {
          if (_this.props.equalCoord && coordEqual(_this.state.coord, _this.coord)) {
            return isMethod_1(_this.props, 'onOpen') && _this.props.onOpen();
          }

          console.log(_this.coord, _this.state.coord);

          _this.setCoord(function () {
            isMethod_1(_this.props, 'onOpen') && _this.props.onOpen();
          });
        } else {
          isMethod_1(_this.props, 'onClose') && _this.props.onClose();
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onOpen", function (e) {
      e && e.stopPropagation();
      e && e.nativeEvent && e.nativeEvent.stopImmediatePropagation();

      if (_this.state.visible) {
        return;
      }

      _this.setVisible(true);
    });

    _defineProperty(_assertThisInitialized(_this), "onClose", function (e) {
      e && e.stopPropagation();

      if (!_this.state.visible) {
        return;
      }

      _this.setVisible(false);
    });

    _defineProperty(_assertThisInitialized(_this), "onOutsideClick", function (e) {
      var isPointClicked = contains(_this.pointRef.current, e.target);
      var isLayerClicked = contains(_this.layerRef.current, e.target);

      if (isPointClicked || isLayerClicked || !_this.state.visible) {
        return false;
      }

      _this.setVisible(false);
    });

    _defineProperty(_assertThisInitialized(_this), "onResize", function (e) {
      if (_this.state.visible) {
        raf(function () {
          _this.setCoord();

          isMethod_1(_this.props, 'onResize') && _this.props.onResize(e);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (e) {
      if (_this.state.visible) {
        raf(function () {
          if (isMethod_1(_this.props, 'escape') && e.keyCode === _this.props.escape) {
            return _this.setVisible(false);
          }

          isMethod_1(_this.props, 'onKeyUp') && _this.props.onKeyUp(e);
        });
      }
    });

    _this.state = {
      visible: !!props.visible,
      coord: props.coord
    };
    _this.coord = _this.state.coord;
    _this.pointRef = /*#__PURE__*/React__default.createRef();
    _this.layerRef = /*#__PURE__*/React__default.createRef();
    return _this;
  }

  _createClass(Trigger, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          closeOnEsc = _this$props.closeOnEsc,
          closeOnOutsideClick = _this$props.closeOnOutsideClick,
          resetOnTopResize = _this$props.resetOnTopResize;
      resetOnTopResize && window.addEventListener('resize', this.onResize, false);
      closeOnOutsideClick && document.body.addEventListener('click', this.onOutsideClick, false);
      closeOnEsc && window.addEventListener('keyup', this.onKeyUp, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props2 = this.props,
          closeOnEsc = _this$props2.closeOnEsc,
          closeOnOutsideClick = _this$props2.closeOnOutsideClick,
          resetOnTopResize = _this$props2.resetOnTopResize;
      resetOnTopResize && window.removeEventListener('resize', this.onResize, false);
      closeOnOutsideClick && document.body.removeEventListener('click', this.onOutsideClick);
      closeOnEsc && window.removeEventListener('keyup', this.onKeyUp);
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children({
        close: this.onClose,
        open: this.onOpen,
        coord: this.state.coord,
        visible: this.state.visible,
        layer: this.layerRef,
        trigger: this.pointRef
      });
    }
  }]);

  return Trigger;
}(React__default.PureComponent);
Trigger.defaultProps = {
  closeOnEsc: true,
  closeOnOutsideClick: true,
  escape: 27,
  equalCoord: true,
  resetOnTopResize: true
};

if (window.DEV) {
  Trigger.propTypes = {
    children: propTypes.func.isRequired,
    // trigger 子元素
    closeOnEsc: propTypes.bool,
    // 按键 ESC 执行关闭
    closeOnOutsideClick: propTypes.bool,
    // 点击layer区域之外的地方 执行关闭
    escape: propTypes.number,
    // ESC 按键对应的 keyCode 或者 key
    equalCoord: propTypes.bool,
    // 对比定位坐标是否相同
    onClose: propTypes.func,
    // layer 被关闭后执行的函数
    onOpen: propTypes.func,
    // layer被打开后执行的函数
    onKeyUp: propTypes.func,
    // 当发生 keyUp 事件是执行的函数
    onResize: propTypes.func,
    // layer 在窗口大小发生大化时，重新复位以后而执行的函数  
    resetOnTopResize: propTypes.bool,
    // 在window大小发生变化时，是否对layer进行复位
    calcCoord: propTypes.func.isRequired,
    // 必须时一个函数，用于计算layer的位置，这个函数传出了 trigger和 layer 的 rect 信息
    visible: propTypes.bool // 初始化时，是否显示layer，由于本组件是非受控组件，因此不接受 props.visible 控制

  };
}

export { Trigger as T };
