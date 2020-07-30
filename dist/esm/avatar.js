import { f as _slicedToArray } from './_rollupPluginBabelHelpers-62f9ecef.js';
import { useState, useEffect, forwardRef, createElement } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil, M as MQ_Breakpoints } from './dependency-8ea69cb4.js';
import { h as holdImage } from './HoldImage-a3d534a8.js';

var useImage = function useImage(src, defaultSrc, errorSrc, onError) {
  var _useState = useState(defaultSrc),
      _useState2 = _slicedToArray(_useState, 2),
      img = _useState2[0],
      setImg = _useState2[1];

  useEffect(function () {
    if (src == null) return;
    var image = new Image();

    image.onload = function () {
      setImg(src);
      image.onerror = image.onload = null;
    };

    image.onerror = function () {
      setImg(errorSrc || defaultSrc);
      onError && onError(new Error("Image(".concat(src, ") Not Found.")));
    };

    image.src = src;
  }, [src]);
  return [img, setImg];
};

var Avatar = /*#__PURE__*/forwardRef(function (props, ref) {
  var alt = props.alt,
      className = props.className,
      draggable = props.draggable,
      defaultSrc = props.defaultSrc,
      errorSrc = props.errorSrc,
      height = props.height,
      icon = props.icon,
      onError = props.onError,
      onClick = props.onClick,
      radius = props.radius,
      scale = props.scale,
      size = props.size,
      src = props.src,
      srcSet = props.srcSet,
      style = props.style,
      width = props.width;

  var _useImage = useImage(src, defaultSrc, errorSrc, onError),
      _useImage2 = _slicedToArray(_useImage, 1),
      imgSrc = _useImage2[0];

  var nextProps = {
    className: classnames(CSSUtil.avatar, CSSUtil.join(CSSUtil.avatar, size), {
      scale: scale
    }, className),
    onClick: onClick,
    ref: ref,
    style: Object.assign({
      borderRadius: radius,
      width: width,
      height: height
    }, style)
  };
  var children;

  if (icon != null) {
    children = icon;
  } else if (srcSet != null) {
    children = /*#__PURE__*/createElement('img', {
      alt: alt,
      draggable: draggable,
      src: imgSrc,
      srcSet: srcSet
    });
  } else {
    children = props.children;
  }

  if (children != null) {
    return /*#__PURE__*/createElement('div', nextProps, children);
  }

  nextProps.style.backgroundImage = "url(".concat(imgSrc, ")");
  return /*#__PURE__*/createElement('div', nextProps);
});
Avatar.defaultProps = {
  draggable: false,
  defaultSrc: holdImage,
  children: void 0,
  errorSrc: void 0,
  size: 'md',
  scale: true
};

if (window.DEV) {
  var TYPE_NS = propTypes.oneOfType([propTypes.string, propTypes.number]);
  Avatar.propTypes = {
    defaultSrc: propTypes.string,
    className: propTypes.string,
    children: propTypes.string,
    errorSrc: propTypes.string,
    height: TYPE_NS,
    icon: propTypes.node,
    onClick: propTypes.func,
    onError: propTypes.func,
    radius: TYPE_NS,
    scale: propTypes.bool,
    size: propTypes.oneOf(['1x', '2x'].concat(MQ_Breakpoints)),
    src: propTypes.oneOfType([propTypes.string, propTypes.element]),
    style: propTypes.object,
    width: TYPE_NS
  };
}

export { Avatar };
