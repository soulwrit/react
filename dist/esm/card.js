import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil, M as MQ_Breakpoints } from './dependency-8ea69cb4.js';

var Card = function Card(props) {
  var bodyStyle = props.bodyStyle,
      bordered = props.bordered,
      children = props.children,
      className = props.className,
      extra = props.extra,
      dref = props.dref,
      footer = props.footer,
      footerStyle = props.footerStyle,
      height = props.height,
      onClick = props.onClick,
      title = props.title,
      titleStyle = props.titleStyle,
      size = props.size,
      style = props.style,
      width = props.width;
  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames(CSSUtil.card, bordered ? 'border' : null, className),
    children: [title ? /*#__PURE__*/React__default.createElement('div', {
      key: 0,
      className: classnames('hd', size),
      children: [/*#__PURE__*/React__default.createElement('div', {
        className: 'tit',
        children: title,
        key: 0
      }), extra ? /*#__PURE__*/React__default.createElement('div', {
        className: 'ext',
        children: extra,
        key: 1
      }) : null],
      style: titleStyle
    }) : null, /*#__PURE__*/React__default.createElement('div', {
      key: 1,
      className: classnames('bd', size),
      children: children,
      style: bodyStyle
    }), footer ? /*#__PURE__*/React__default.createElement('div', {
      key: 2,
      className: classnames('ft', size),
      children: footer,
      style: footerStyle
    }) : null],
    onClick: onClick,
    ref: dref,
    style: Object.assign({
      width: width,
      height: height
    }, style)
  });
};

Card.defaultProps = {
  size: 'md' // 默认尺寸 

};

if (window.DEV) {
  var TYPE_NS = propTypes.oneOfType([propTypes.number, propTypes.string]);
  Card.propTypes = {
    bordered: propTypes.bool,
    bodyStyle: propTypes.object,
    extra: propTypes.any,
    footerAlign: propTypes.oneOf(['center', 'right']),
    footer: propTypes.any,
    height: TYPE_NS,
    size: propTypes.oneOf(MQ_Breakpoints),
    title: propTypes.any,
    titleStyle: propTypes.object,
    width: TYPE_NS
  };
}

export { Card };
