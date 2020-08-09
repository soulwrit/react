import { _ as _inherits, a as _createSuper, b as _classCallCheck, c as _defineProperty, d as _assertThisInitialized, e as _createClass } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';
import { n as noop_1 } from './noop-469b0e21.js';

var PageTurn = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(PageTurn, _React$PureComponent);

  var _super = _createSuper(PageTurn);

  function PageTurn() {
    var _this;

    _classCallCheck(this, PageTurn);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onUp", function (e) {
      var _this$props = _this.props,
          onUp = _this$props.onUp,
          onChange = _this$props.onChange,
          pageNo = _this$props.pageNo,
          pageSize = _this$props.pageSize;
      var currentPageNo = pageNo;
      e.stopPropagation();
      --currentPageNo;

      if (currentPageNo <= 1) {
        currentPageNo = 1;
      }

      onUp(currentPageNo, pageSize);
      onChange(currentPageNo, pageSize);
    });

    _defineProperty(_assertThisInitialized(_this), "onDown", function (e) {
      var _this$props2 = _this.props,
          total = _this$props2.total,
          onDown = _this$props2.onDown,
          onChange = _this$props2.onChange,
          pageNo = _this$props2.pageNo,
          pageSize = _this$props2.pageSize;
      var currentPageNo = pageNo;
      var pageTotal = Math.ceil(total / pageSize);
      e.stopPropagation();
      ++currentPageNo;

      if (currentPageNo >= pageTotal) {
        currentPageNo = pageTotal;
      }

      onDown(currentPageNo, pageSize);
      onChange(currentPageNo, pageSize);
    });

    return _this;
  }

  _createClass(PageTurn, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          className = _this$props3.className,
          up = _this$props3.up,
          down = _this$props3.down,
          children = _this$props3.children,
          style = _this$props3.style,
          pageNo = _this$props3.pageNo,
          pageSize = _this$props3.pageSize,
          total = _this$props3.total;
      var pageTotal = Math.ceil(total / pageSize);
      return pageTotal === 0 ? null : /*#__PURE__*/React__default.createElement('div', {
        className: classnames('pagt', className),
        style: style
      }, /*#__PURE__*/React__default.createElement('span', {
        className: classnames('i', CSSUtil.disable(pageNo === 1)),
        onClick: this.onUp
      }, up), /*#__PURE__*/React__default.createElement('span', {
        className: 'txt'
      }, pageNo + '/' + pageTotal), /*#__PURE__*/React__default.createElement('span', {
        className: classnames('i', CSSUtil.disable(pageNo === pageTotal || pageTotal === 0)),
        onClick: this.onDown
      }, down), children && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, children));
    }
  }]);

  return PageTurn;
}(React__default.PureComponent);
PageTurn.defaultProps = {
  total: 0,
  // 数据总数
  pageNo: 1,
  // 当前页面数
  pageSize: 20,
  // 每页多少条 
  up: '<',
  // 向上的图标 
  down: '>',
  // 向下的图标
  onUp: noop_1,
  // 向上
  onDown: noop_1,
  // 向下 
  onChange: noop_1
};

if (window.DEV) {
  PageTurn.propTypes = {
    total: propTypes.number.isRequired,
    pageNo: propTypes.number.isRequired,
    pageSize: propTypes.number,
    up: propTypes.any,
    down: propTypes.any,
    onUp: propTypes.func,
    onDown: propTypes.func,
    onChange: propTypes.func
  };
}

export { PageTurn };
