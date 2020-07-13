import '@writ/scss/components/box.scss';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import percentage from '@writ/utils/percentage';
import { CSSUtil, dirs } from '../dependency';
export { Box };

const Col = props => {
   const { children, className, cols, dref, gutter, span, title } = props;
   const style = Object.assign({}, props.style);
   const isDefaultCols = cols === Col.defaultProps.cols;

   if (!isDefaultCols) {
      style.width = percentage(span / cols);
   }

   if (gutter > 0) {
      style.padding = gutter;
   }

   if (props.move) style.marginLeft = percentage(props.move / cols);

   return React.createElement('div', {
      children,
      className: classnames(CSSUtil.col, isDefaultCols ? CSSUtil.join(CSSUtil.col, span) : void 0, className),
      ref: dref,
      style,
      title
   });
};

const Row = props => {
   const { className, children, cols, dir, dref, gutter, index, title, } = props;
   const childArray = React.Children.toArray(children);
   const space = gutter / 2;
   const style = Object.assign({}, props.style);

   if (index > 0) {
      style.marginTop = gutter;
   }

   return React.createElement('div', {
      className: classnames(CSSUtil.row, dir, className),
      children: childArray.map((Item, index) => {
         if (Item.type !== Col) {
            throw new Error('Only `Col` can be used in `Row`.');
         }

         return React.cloneElement(Item, {
            cols,
            key: index,
            gutter: space,
         });
      }),
      ref: dref,
      style,
      title,
   });
};

const Box = props => {
   const { className, children, dref, gutter, style, } = props;

   return React.createElement('div', {
      className: classnames(CSSUtil.box, className),
      children: React.Children.map(children, (Item, index) => {
         if (Item.type === Row) {
            return React.cloneElement(Item, { key: index, gutter, index });
         }

         return Item;
      }),
      ref: dref,
      style
   });
};

Box.Row = Row;
Box.Col = Col;
Box.defaultProps = {
   gutter: 16,
};
Row.defaultProps = {
   cols: 12,
   gutter: 16,

};
Col.defaultProps = {
   span: 1,
   move: 0,
   cols: 12
};
if (window.DEV) {
   Box.propTypes = {
      gutter: PropTypes.number,  // 行间隔
      dref: PropTypes.func
   };
   Row.propTypes = {
      cols: PropTypes.number,// 列总数  
      dir: PropTypes.oneOf(dirs), // 列的方向
      dref: PropTypes.func,
      gutter: PropTypes.number, // 列间距
   };
   Col.propTypes = {
      cols: PropTypes.number, // 列总数
      dref: PropTypes.func,
      move: PropTypes.number, // 偏移量
      span: PropTypes.number, // 列占比
   };
}