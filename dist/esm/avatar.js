import { f as _slicedToArray } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default, { useState, useEffect } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil, M as MQ_Breakpoints } from './dependency-8ea69cb4.js';
import { h as holdImage } from './HoldImage-a3d534a8.js';

var Avatar = function Avatar(props) {
  var className = props.className,
      dref = props.dref,
      height = props.height,
      onError = props.onError,
      onClick = props.onClick,
      radius = props.radius,
      size = props.size,
      src = props.src,
      style = props.style,
      width = props.width;

  var _useState = useState(src),
      _useState2 = _slicedToArray(_useState, 2),
      imgSrc = _useState2[0],
      setImgSrc = _useState2[1];

  var srcIsReactElement = /*#__PURE__*/React__default.isValidElement(src);
  var nextProps = {
    className: classnames(CSSUtil.avatar, CSSUtil.join(CSSUtil.avatar, size), className),
    onClick: onClick,
    ref: dref,
    style: Object.assign({
      borderRadius: radius,
      width: width,
      height: height
    }, style)
  };

  if (srcIsReactElement === false) {
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
        onError && onError(new Error('Avatar Not Found.'));
      };

      image.src = imgSrc;
    }, [imgSrc]);
    nextProps.style.backgroundImage = "url(".concat(imgSrc, ")");
  } else {
    nextProps.children = src;
  }

  return /*#__PURE__*/React__default.createElement('div', nextProps);
};

Avatar.defaultProps = {
  size: 'md'
};

if (window.DEV) {
  var TYPE_NS = propTypes.oneOfType([propTypes.string, propTypes.number]);
  Avatar.propTypes = {
    dref: propTypes.func,
    height: TYPE_NS,
    onError: propTypes.func,
    radius: TYPE_NS,
    size: propTypes.oneOf(['1x', '2x'].concat(MQ_Breakpoints)),
    src: propTypes.oneOfType([propTypes.string, propTypes.element]),
    width: TYPE_NS
  };
}

export { Avatar };
