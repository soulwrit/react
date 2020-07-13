import '@writ/scss/components/grid.scss';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import percentage from '@writ/utils/percentage';
import { CSSUtil, dirs } from '../dependency';
export { Grid };

const Grid = props => {
   const { cell, children, className, dir, grid, gutter, margin, order, padding, span, style, } = props;
   const isGrid = grid !== false;
   const isBuiltIns = cell === 9 || cell == null;
   const isVertical = dir === dirs[2] || dir === dirs[3];

   const ratio = span > 0 ? span : React.Children.count(children);
   const space = padding || padding === 0 ? padding : gutter / 2;
   const styled = Object.assign({}, style);

   if (!isBuiltIns && !isGrid) {
      styled.flexBasis = percentage(ratio / cell);
      styled[isVertical ? 'height' : 'width'] = styled.flexBasis;
      styled.padding = space;
      styled.margin = margin;
      styled.order = order;
   }

   return React.createElement('div', {
      className: classnames({
         [CSSUtil.grid]: isGrid,
         [CSSUtil.grid + ratio]: !isGrid && isBuiltIns,
         i: !isGrid,
      }, className, dir),
      children: React.Children.map(children, (Item, index) => {
         if (!Item) return;
         if (Item.type !== Grid) {
            return Item;
         }
         const props = Item.props;

         return React.cloneElement(Item, {
            cell: props.cell || cell,
            key: index,
            flex: props.flex === true,
            grid: props.grid === true,
            span: props.span || ratio,
         });
      }),
      style: styled,
   });
};
Grid.Cell = Grid;
Grid.defaultProps = {
   gutter: 16,
};
if (window.DEV) {
   Grid.propTypes = {
      cell: PropTypes.number, // 列数量 
      dir: PropTypes.oneOf(dirs), // 列的走向，在float时无效
      flex: PropTypes.bool, // 使用 flex 布局， 反之使用 float 布局
      grid: PropTypes.bool, // 当前列是否定位为一个栅格容器
      gutter: PropTypes.number, // 列间隔
      order: PropTypes.number, // 列排序
      margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 外边距
      padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 内边距
      span: PropTypes.number, // 列数量  
   }
}