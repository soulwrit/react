import { _ as _inherits, a as _createSuper, b as _classCallCheck, c as _defineProperty, d as _assertThisInitialized, e as _createClass } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';
import { n as noop_1 } from './noop-469b0e21.js';

var Pager = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Pager, _React$PureComponent);

  var _super = _createSuper(Pager);

  function Pager() {
    var _this;

    _classCallCheck(this, Pager);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onJump", function (no) {
      return function (e) {
        var _this$props = _this.props,
            onChange = _this$props.onChange,
            pageNo = _this$props.pageNo,
            pageSize = _this$props.pageSize;
        var currentPageNo = pageNo;
        e.stopPropagation();

        switch (no) {
          case 'prev':
            --currentPageNo;
            break;

          case 'next':
            ++currentPageNo;
            break;

          default:
            currentPageNo = no;
            break;
        }

        onChange(currentPageNo, pageSize);
      };
    });

    return _this;
  }

  _createClass(Pager, [{
    key: "getItem",
    value: function getItem(num, text, kind) {
      var _this$props2 = this.props,
          itemRender = _this$props2.itemRender,
          pageNo = _this$props2.pageNo,
          pageSize = _this$props2.pageSize,
          total = _this$props2.total;
      var pageTotal = Math.ceil(total / pageSize);
      return /*#__PURE__*/React__default.createElement('li', {
        key: num,
        className: classnames('i', kind, pageNo === num ? 'active' : undefined, num === 'prev' && pageNo <= 1 || num === 'next' && pageNo >= pageTotal ? 'disabled' : undefined),
        onClick: this.onJump(num),
        children: itemRender(num, text || num) || text || num
      });
    } // 生成页码

  }, {
    key: "generateItems",
    value: function generateItems() {
      var _this$props3 = this.props,
          omit = _this$props3.omit,
          pageNo = _this$props3.pageNo,
          pageSize = _this$props3.pageSize,
          total = _this$props3.total;
      var pageTotal = Math.ceil(total / pageSize);
      var pages = [];

      if (pageTotal <= 7) {
        for (var i = 1; i <= pageTotal; i++) {
          pages[i] = this.getItem(i);
        }
      } else {
        var loopStart, loopEnd;

        if (pageNo > pageTotal - 5) {
          loopEnd = pageTotal;
          loopStart = loopEnd - 5;
        } else if (pageNo <= 4) {
          loopStart = 1;
          loopEnd = loopStart + 4;
        } else {
          loopStart = pageNo - 2;
          loopEnd = pageNo + 2;
        }

        if (pageNo >= 5) {
          pages.push(this.getItem(1), this.getItem('prev', omit));
        }

        for (var _i = loopStart; _i <= loopEnd; _i++) {
          pages[_i] = this.getItem(_i);
        }

        if (pageNo <= pageTotal - 5) {
          pages.push(this.getItem('next', omit), this.getItem(pageTotal));
        }
      }

      return pages;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          className = _this$props4.className,
          prev = _this$props4.prev,
          next = _this$props4.next,
          children = _this$props4.children,
          listClassNmae = _this$props4.listClassNmae,
          listStyle = _this$props4.listStyle,
          prep = _this$props4.prep,
          style = _this$props4.style;
      return /*#__PURE__*/React__default.createElement('div', {
        className: classnames(CSSUtil.pager, className),
        style: style
      }, prep, /*#__PURE__*/React__default.createElement('ul', {
        style: listStyle,
        className: listClassNmae
      }, this.getItem('prev', prev, 'prev'), this.generateItems(), this.getItem('next', next, 'next')), children);
    }
  }]);

  return Pager;
}(React__default.PureComponent);
Pager.defaultProps = {
  total: 0,
  // 数据总数
  pageNo: 1,
  // 当前页面数
  pageSize: 20,
  // 每页多少条
  omit: '•••',
  // 忽略占位符
  prev: '<',
  //上一页的图标 
  next: '>',
  // 下一页的图标
  onChange: noop_1,
  // 页码发生变化时使用
  itemRender: noop_1,
  // 自定义页面渲染函数
  prep: null // 前置给分页器的内容

};

if (window.DEV) {
  Pager.propTypes = {
    total: propTypes.number.isRequired,
    pageNo: propTypes.number.isRequired,
    pageSize: propTypes.number,
    omit: propTypes.any,
    prev: propTypes.any,
    next: propTypes.any,
    onChange: propTypes.func.isRequired,
    itemRender: propTypes.func,
    prep: propTypes.element
  };
}

export { Pager };
