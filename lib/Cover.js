import '@writ/scss/components/cover.scss';
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import percentage from '@writ/utils/percentage';
import holdImage from './Common/HoldImage';
import { CSSUtil } from '../dependency';
export { Cover };

const Cover = props => {
   const { className, ratio, style, width, height, bgSize, children, title, alt, src } = props;
   const [imgSrc, setImgSrc] = useState(src);

   useEffect(() => {
      if (imgSrc === holdImage || imgSrc == null) {
         return;
      }
      const image = new Image();

      image.onload = () => {
         setImgSrc(imgSrc);
         image.onerror = image.onload = null;
      };
      image.onerror = () => {
         setImgSrc(holdImage);
         image.onerror = image.onload = null;
      };
      image.src = imgSrc;
   }, []);

   const nextProps = ratio > 0 ? {
      children,
      className: classnames(CSSUtil.cover, 'ratio', className),
      style: Object.assign({
         paddingBottom: percentage(ratio),
         backgroundImage: `url("${src ? src : holdImage}")`,
         backgroundSize: bgSize
      }, style),
      title,
   } : {
         children: React.createElement('img', { src, alt }),
         className: classnames(CSSUtil.cover, className),
         style: Object.assign({ width, height }, style)
      };

   return React.createElement('div', nextProps);
}

Cover.defaultProps = {
   src: holdImage
};

if (window.DEV) {
   Cover.propTypes = {
      bgSize: PropTypes.string,
      height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      onError: PropTypes.func,
      ratio: PropTypes.number,
      src: PropTypes.string,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
   };
}