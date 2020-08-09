import './_rollupPluginBabelHelpers-cc1db274.js';
import React__default, { createElement } from 'react';
import './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import './dependency-8ea69cb4.js';
import { Flex, FlexItem } from './flex.js';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _ref = /*#__PURE__*/createElement("path", {
  fill: "#8a8a8a",
  d: "M0 64h1024v128H0zm384 192h640v128H384zm0 192h640v128H384zm0 192h640v128H384zM0 832h1024v128H0zm0-128V320l256 192z"
});

function SvgIndent(props) {
  return /*#__PURE__*/createElement("svg", _extends({
    className: "Indent_svg__icon",
    width: 16,
    height: 16,
    viewBox: "0 0 1024 1024"
  }, props), _ref);
}

var ToolBar = function ToolBar(props) {
  var children = props.children;
  return /*#__PURE__*/React__default.createElement(Flex, {
    className: classnames('tbar')
  }, /*#__PURE__*/React__default.createElement(FlexItem, {
    className: 'trigger'
  }, /*#__PURE__*/React__default.createElement(SvgIndent, {
    className: 'svgico x1'
  })), /*#__PURE__*/React__default.createElement(FlexItem, null, children), /*#__PURE__*/React__default.createElement(FlexItem, null, 'Extra'));
};

export { ToolBar };
