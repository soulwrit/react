import React__default, { forwardRef, createElement, Children, cloneElement } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil, d as dirs } from './dependency-8ea69cb4.js';
import { a as assert_1 } from './assert-cc694573.js';
import { p as percentage_1 } from './percentage-d3aa3789.js';

var Col = /*#__PURE__*/forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      cols = props.cols,
      gutter = props.gutter,
      move = props.move,
      span = props.span,
      style = props.style;
  var styled = Object.assign({}, style);
  var isDefaultCols = cols === Col.defaultProps.cols;

  if (!isDefaultCols) {
    styled.width = percentage_1(span / cols);
  }

  if (gutter > 0) {
    styled.padding = gutter;
  }

  if (move) styled.marginLeft = percentage_1(move / cols);
  return /*#__PURE__*/createElement('div', {
    children: children,
    className: classnames(CSSUtil.col, isDefaultCols ? CSSUtil.join(CSSUtil.col, span) : void 0, className),
    ref: ref,
    style: styled
  });
});
Col.defaultProps = {
  className: void 0,
  span: 1,
  move: 0,
  cols: 12
};

if (window.DEV) {
  Col.propTypes = {
    className: propTypes.string,
    cols: propTypes.number,
    // 列总数
    move: propTypes.number,
    // 偏移量
    span: propTypes.number // 列占比

  };
}

var Row = /*#__PURE__*/forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children,
      cols = props.cols,
      dir = props.dir,
      gutter = props.gutter,
      style = props.style;
  var childArray = Children.toArray(children);
  var space = gutter / 2;
  return /*#__PURE__*/createElement('div', {
    className: classnames(CSSUtil.row, dir, className),
    children: childArray.map(function (Item) {
      assert_1.nuil(Item, 'Invalid element of `Row`.');
      assert_1.truly(Item.type === Col, 'Only `Col` can be used in `Row`.');
      return /*#__PURE__*/cloneElement(Item, {
        cols: cols,
        gutter: space
      });
    }),
    ref: ref,
    style: style
  });
});
Row.defaultProps = {
  cols: 12,
  gutter: 16
};

if (window.DEV) {
  Row.propTypes = {
    className: propTypes.string,
    cols: propTypes.number,
    // 列总数  
    dir: propTypes.oneOf(dirs),
    // 列的方向
    gutter: propTypes.number // 列间距

  };
}

var Box = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children,
      gutter = props.gutter,
      style = props.style;
  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames(CSSUtil.box, className),
    children: React__default.Children.map(children, function (Item) {
      if (Item.type === Row) {
        return /*#__PURE__*/React__default.cloneElement(Item, {
          gutter: Item.props.gutter || gutter
        });
      }

      return Item;
    }),
    ref: ref,
    style: style
  });
});
Box.Row = Row;
Box.Col = Col;
Box.defaultProps = {
  gutter: 16
};

if (window.DEV) {
  Box.propTypes = {
    className: propTypes.string,
    gutter: propTypes.number,
    // 行间隔
    style: propTypes.object
  };
}

export { Box };
