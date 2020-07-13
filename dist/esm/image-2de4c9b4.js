import { createElement } from 'react';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _ref = /*#__PURE__*/createElement("path", {
  fill: "#777",
  d: "M554.667 680.021V341.333h128L512 170.667 341.333 341.333h128v338.688z"
});

var _ref2 = /*#__PURE__*/createElement("path", {
  fill: "#777",
  d: "M853.333 768H170.667V426.667H85.333v384A42.667 42.667 0 00128 853.333h768a42.667 42.667 0 0042.667-42.666v-384h-85.334V768z"
});

function SvgUpload(props) {
  return /*#__PURE__*/createElement("svg", _extends({
    viewBox: "0 0 1024 1024",
    width: "1em"
  }, props), _ref, _ref2);
}

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

var _ref$1 = /*#__PURE__*/createElement("path", {
  fill: "#777",
  d: "M469.333 170.667V512h-128L512 682.667 682.667 512h-128V170.667z"
});

var _ref2$1 = /*#__PURE__*/createElement("path", {
  fill: "#777",
  d: "M853.333 768H170.667V426.667H85.333v384A42.667 42.667 0 00128 853.333h768a42.667 42.667 0 0042.667-42.666v-384h-85.334V768z"
});

function SvgDownload(props) {
  return /*#__PURE__*/createElement("svg", _extends$1({
    viewBox: "0 0 1024 1024",
    width: "1em"
  }, props), _ref$1, _ref2$1);
}

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

var _ref$2 = /*#__PURE__*/createElement("path", {
  fill: "#777",
  d: "M0 128v768h1024V128H0zm944 688H80V208h864v608zM704 368c0 53.024 42.976 96 96 96s96-42.976 96-96-42.976-96-96-96-96 42.976-96 96m184 392L696 472l-128 96-240-304-192 496h752z"
});

function SvgImage(props) {
  return /*#__PURE__*/createElement("svg", _extends$2({
    viewBox: "0 0 1024 1024",
    width: "1em"
  }, props), _ref$2);
}

export { SvgUpload as S, SvgDownload as a, SvgImage as b };
