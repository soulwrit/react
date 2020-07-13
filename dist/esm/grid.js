import { _ as _defineProperty } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { d as dirs, C as CSSUtil } from './dependency-8ea69cb4.js';
import { p as percentage_1 } from './percentage-d3aa3789.js';

var Grid = function Grid(props) {
  var _classnames;

  var cell = props.cell,
      children = props.children,
      className = props.className,
      dir = props.dir,
      grid = props.grid,
      gutter = props.gutter,
      margin = props.margin,
      order = props.order,
      padding = props.padding,
      span = props.span,
      style = props.style;
  var isGrid = grid !== false;
  var isBuiltIns = cell === 9 || cell == null;
  var isVertical = dir === dirs[2] || dir === dirs[3];
  var ratio = span > 0 ? span : React__default.Children.count(children);
  var space = padding || padding === 0 ? padding : gutter / 2;
  var styled = Object.assign({}, style);

  if (!isBuiltIns && !isGrid) {
    styled.flexBasis = percentage_1(ratio / cell);
    styled[isVertical ? 'height' : 'width'] = styled.flexBasis;
    styled.padding = space;
    styled.margin = margin;
    styled.order = order;
  }

  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames((_classnames = {}, _defineProperty(_classnames, CSSUtil.grid, isGrid), _defineProperty(_classnames, CSSUtil.grid + ratio, !isGrid && isBuiltIns), _defineProperty(_classnames, "i", !isGrid), _classnames), className, dir),
    children: React__default.Children.map(children, function (Item, index) {
      if (!Item) return;

      if (Item.type !== Grid) {
        return Item;
      }

      var props = Item.props;
      return /*#__PURE__*/React__default.cloneElement(Item, {
        cell: props.cell || cell,
        key: index,
        flex: props.flex === true,
        grid: props.grid === true,
        span: props.span || ratio
      });
    }),
    style: styled
  });
};

Grid.Cell = Grid;
Grid.defaultProps = {
  gutter: 16
};

if (window.DEV) {
  Grid.propTypes = {
    cell: propTypes.number,
    // 列数量 
    dir: propTypes.oneOf(dirs),
    // 列的走向，在float时无效
    flex: propTypes.bool,
    // 使用 flex 布局， 反之使用 float 布局
    grid: propTypes.bool,
    // 当前列是否定位为一个栅格容器
    gutter: propTypes.number,
    // 列间隔
    order: propTypes.number,
    // 列排序
    margin: propTypes.oneOfType([propTypes.number, propTypes.string]),
    // 外边距
    padding: propTypes.oneOfType([propTypes.number, propTypes.string]),
    // 内边距
    span: propTypes.number // 列数量  

  };
}

export { Grid };
