import '@writ/scss/components/flex.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { dirs, CSSUtil } from '../dependency';
import { FlexItem } from './Flex/Item';
export { Flex, FlexItem };

const Flex = React.forwardRef(({
   alignContent, alignItems, alignSelf,
   basis,
   children, className,
   direction, dir, dref,
   grow, height, justifyContent,
   shrink, style, type,
   width, wrap,
   ...rest
}, ref) => {
   return React.createElement(type, {
      className: classnames(CSSUtil.flex, dir, className),
      ref: ref || dref,
      ...rest,
      style: Object.assign({
         alignContent: alignContent,
         alignItems: alignItems,
         alignSelf: alignSelf,
         flexBasis: basis,
         flexDirection: direction,
         flexGrow: grow,
         flexShrink: shrink,
         flexWrap: wrap,
         justifyContent: justifyContent,
         width: width,
         height: height
      }, style),
   }, children);
});

Flex.Item = FlexItem;
Flex.defaultProps = {
   type: 'div',
};

if (window.DEV) {
   Flex.propTypes = {
      // align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
      alignContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch']),
      // align-items属性定义项目在交叉轴上如何对齐。
      alignItems: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
      alignSelf: PropTypes.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
      basis: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
      children: PropTypes.node,
      className: PropTypes.string,
      // 效果同 direction
      dir: PropTypes.oneOf(dirs),
      // flex-direction属性决定主轴的方向（即项目的排列方向）。
      direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
      // DOM 索引
      dref: PropTypes.func,
      grow: PropTypes.number,
      height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      // justify-content属性定义了项目在主轴上的对齐方式。
      justifyContent: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
      shrink: PropTypes.number,
      // 元素类型
      type: PropTypes.string,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      // flex-wrap属性 默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。
      wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
   };
}
