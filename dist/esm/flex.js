import { g as _objectWithoutProperties, h as _objectSpread2 } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil, d as dirs } from './dependency-8ea69cb4.js';

var FlexItem = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var alignSelf = props.alignSelf,
      basis = props.basis,
      children = props.children,
      className = props.className,
      type = props.type,
      flex = props.flex,
      grow = props.grow,
      height = props.height,
      order = props.order,
      shrink = props.shrink,
      span = props.span,
      style = props.style,
      width = props.width,
      rest = _objectWithoutProperties(props, ["alignSelf", "basis", "children", "className", "type", "flex", "grow", "height", "order", "shrink", "span", "style", "width"]);

  return /*#__PURE__*/React__default.createElement(type, _objectSpread2(_objectSpread2({
    className: classnames('i', className),
    ref: ref
  }, rest), {}, {
    style: Object.assign({
      alignSelf: alignSelf,
      flex: "".concat(flex || span),
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      order: order,
      width: width,
      height: height
    }, style)
  }), children);
});
FlexItem.defaultProps = {
  // align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。
  // 默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
  alignSelf: void 0,
  // flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。
  // 浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小
  basis: void 0,
  // 类名
  className: void 0,
  // flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
  flex: void 0,
  // flex 项目的高度
  height: void 0,
  // flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
  grow: void 0,
  // order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
  order: void 0,
  // flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
  shrink: void 0,
  // flex 的别称
  span: void 0,
  // 元素类型
  type: 'div',
  // flex 项目的宽度
  width: void 0
};

if (window.DEV) {
  FlexItem.propTypes = {
    // align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。
    // 默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
    alignSelf: propTypes.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
    // flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。
    // 浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小
    basis: propTypes.oneOfType([propTypes.number, propTypes.oneOf(['auto'])]),
    // 类名
    className: propTypes.string,
    // flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
    flex: propTypes.oneOfType([propTypes.number, propTypes.string]),
    // flex 项目的高度
    height: propTypes.oneOfType([propTypes.number, propTypes.string]),
    // flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
    grow: propTypes.number,
    // order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
    order: propTypes.number,
    // flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
    shrink: propTypes.number,
    // flex 的别称
    span: propTypes.oneOfType([propTypes.number, propTypes.string]),
    // 元素类型
    type: propTypes.string,
    // flex 项目的宽度
    width: propTypes.oneOfType([propTypes.number, propTypes.string])
  };
}

var Flex = /*#__PURE__*/React__default.forwardRef(function (_ref, ref) {
  var alignContent = _ref.alignContent,
      alignItems = _ref.alignItems,
      alignSelf = _ref.alignSelf,
      basis = _ref.basis,
      children = _ref.children,
      className = _ref.className,
      direction = _ref.direction,
      dir = _ref.dir,
      dref = _ref.dref,
      grow = _ref.grow,
      height = _ref.height,
      justifyContent = _ref.justifyContent,
      shrink = _ref.shrink,
      style = _ref.style,
      type = _ref.type,
      width = _ref.width,
      wrap = _ref.wrap,
      rest = _objectWithoutProperties(_ref, ["alignContent", "alignItems", "alignSelf", "basis", "children", "className", "direction", "dir", "dref", "grow", "height", "justifyContent", "shrink", "style", "type", "width", "wrap"]);

  return /*#__PURE__*/React__default.createElement(type, _objectSpread2(_objectSpread2({
    className: classnames(CSSUtil.flex, dir, className),
    ref: ref || dref
  }, rest), {}, {
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
    }, style)
  }), children);
});
Flex.Item = FlexItem;
Flex.defaultProps = {
  type: 'div'
};

if (window.DEV) {
  Flex.propTypes = {
    // align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
    alignContent: propTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch']),
    // align-items属性定义项目在交叉轴上如何对齐。
    alignItems: propTypes.oneOf(['flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
    alignSelf: propTypes.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
    basis: propTypes.oneOfType([propTypes.number, propTypes.oneOf(['auto'])]),
    children: propTypes.node,
    className: propTypes.string,
    // 效果同 direction
    dir: propTypes.oneOf(dirs),
    // flex-direction属性决定主轴的方向（即项目的排列方向）。
    direction: propTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
    // DOM 索引
    dref: propTypes.func,
    grow: propTypes.number,
    height: propTypes.oneOfType([propTypes.number, propTypes.string]),
    // justify-content属性定义了项目在主轴上的对齐方式。
    justifyContent: propTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
    shrink: propTypes.number,
    // 元素类型
    type: propTypes.string,
    width: propTypes.oneOfType([propTypes.number, propTypes.string]),
    // flex-wrap属性 默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。
    wrap: propTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse'])
  };
}

export { Flex, FlexItem };
