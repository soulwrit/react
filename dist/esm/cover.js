import { f as _slicedToArray } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default, { useState, useEffect } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';
import { h as holdImage } from './HoldImage-a3d534a8.js';
import { p as percentage_1 } from './percentage-d3aa3789.js';

var Cover = function Cover(props) {
  var className = props.className,
      ratio = props.ratio,
      style = props.style,
      width = props.width,
      height = props.height,
      bgSize = props.bgSize,
      children = props.children,
      title = props.title,
      alt = props.alt,
      src = props.src;

  var _useState = useState(src),
      _useState2 = _slicedToArray(_useState, 2),
      imgSrc = _useState2[0],
      setImgSrc = _useState2[1];

  useEffect(function () {
    if (imgSrc === holdImage || imgSrc == null) {
      return;
    }

    var image = new Image();

    image.onload = function () {
      setImgSrc(imgSrc);
      image.onerror = image.onload = null;
    };

    image.onerror = function () {
      setImgSrc(holdImage);
      image.onerror = image.onload = null;
    };

    image.src = imgSrc;
  }, []);
  var nextProps = ratio > 0 ? {
    children: children,
    className: classnames(CSSUtil.cover, 'ratio', className),
    style: Object.assign({
      paddingBottom: percentage_1(ratio),
      backgroundImage: "url(\"".concat(src ? src : holdImage, "\")"),
      backgroundSize: bgSize
    }, style),
    title: title
  } : {
    children: /*#__PURE__*/React__default.createElement('img', {
      src: src,
      alt: alt
    }),
    className: classnames(CSSUtil.cover, className),
    style: Object.assign({
      width: width,
      height: height
    }, style)
  };
  return /*#__PURE__*/React__default.createElement('div', nextProps);
};

Cover.defaultProps = {
  src: holdImage
};

if (window.DEV) {
  Cover.propTypes = {
    bgSize: propTypes.string,
    height: propTypes.oneOfType([propTypes.number, propTypes.string]),
    onError: propTypes.func,
    ratio: propTypes.number,
    src: propTypes.string,
    width: propTypes.oneOfType([propTypes.number, propTypes.string])
  };
}

export { Cover };
