import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil, d as dirs } from './dependency-8ea69cb4.js';
import { p as percentage_1 } from './percentage-d3aa3789.js';

var Col = function Col(props) {
  var children = props.children,
      className = props.className,
      cols = props.cols,
      dref = props.dref,
      gutter = props.gutter,
      span = props.span,
      title = props.title;
  var style = Object.assign({}, props.style);
  var isDefaultCols = cols === Col.defaultProps.cols;

  if (!isDefaultCols) {
    style.width = percentage_1(span / cols);
  }

  if (gutter > 0) {
    style.padding = gutter;
  }

  if (props.move) style.marginLeft = percentage_1(props.move / cols);
  return /*#__PURE__*/React__default.createElement('div', {
    children: children,
    className: classnames(CSSUtil.col, isDefaultCols ? CSSUtil.join(CSSUtil.col, span) : void 0, className),
    ref: dref,
    style: style,
    title: title
  });
};

var Row = function Row(props) {
  var className = props.className,
      children = props.children,
      cols = props.cols,
      dir = props.dir,
      dref = props.dref,
      gutter = props.gutter,
      index = props.index,
      title = props.title;
  var childArray = React__default.Children.toArray(children);
  var space = gutter / 2;
  var style = Object.assign({}, props.style);

  if (index > 0) {
    style.marginTop = gutter;
  }

  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames(CSSUtil.row, dir, className),
    children: childArray.map(function (Item, index) {
      if (Item.type !== Col) {
        throw new Error('Only `Col` can be used in `Row`.');
      }

      return /*#__PURE__*/React__default.cloneElement(Item, {
        cols: cols,
        key: index,
        gutter: space
      });
    }),
    ref: dref,
    style: style,
    title: title
  });
};

var Box = function Box(props) {
  var className = props.className,
      children = props.children,
      dref = props.dref,
      gutter = props.gutter,
      style = props.style;
  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames(CSSUtil.box, className),
    children: React__default.Children.map(children, function (Item, index) {
      if (Item.type === Row) {
        return /*#__PURE__*/React__default.cloneElement(Item, {
          key: index,
          gutter: gutter,
          index: index
        });
      }

      return Item;
    }),
    ref: dref,
    style: style
  });
};

Box.Row = Row;
Box.Col = Col;
Box.defaultProps = {
  gutter: 16
};
Row.defaultProps = {
  cols: 12,
  gutter: 16
};
Col.defaultProps = {
  span: 1,
  move: 0,
  cols: 12
};

if (window.DEV) {
  Box.propTypes = {
    gutter: propTypes.number,
    // 行间隔
    dref: propTypes.func
  };
  Row.propTypes = {
    cols: propTypes.number,
    // 列总数  
    dir: propTypes.oneOf(dirs),
    // 列的方向
    dref: propTypes.func,
    gutter: propTypes.number // 列间距

  };
  Col.propTypes = {
    cols: propTypes.number,
    // 列总数
    dref: propTypes.func,
    move: propTypes.number,
    // 偏移量
    span: propTypes.number // 列占比

  };
}

export { Box };
