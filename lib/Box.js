import '@writ/scss/components/box.scss';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { CSSUtil } from '../dependency';
import { Row } from './Box/Row';
import { Col } from './Box/Col';
export { Box };
const Box = React.forwardRef((props, ref) => {
   const { className, children, gutter, style, } = props;

   return React.createElement('div', {
      className: classnames(CSSUtil.box, className),
      children: React.Children.map(children, Item => {
         if (Item.type === Row) {
            return React.cloneElement(Item, {
               gutter: Item.props.gutter || gutter
            });
         }
         return Item;
      }),
      ref,
      style
   });
});

Box.Row = Row;
Box.Col = Col;
Box.defaultProps = {
   gutter: 16,
};
if (window.DEV) {
   Box.propTypes = {
      className: PropTypes.string,
      gutter: PropTypes.number,  // 行间隔
      style: PropTypes.object
   };
}