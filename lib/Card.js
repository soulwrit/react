import '@writ/scss/components/card.scss';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { MQ_Breakpoints, CSSUtil } from '../dependency';
export { Card };

const Card = props => {
   const {
      bodyStyle, bordered, children, className, extra, dref, footer,
      footerStyle, height, onClick, title, titleStyle, size, style, width,
   } = props;

   return React.createElement('div', {
      className: classnames(CSSUtil.card, bordered ? 'border' : null, className),
      children: [
         title ? React.createElement('div', {
            key: 0,
            className: classnames('hd', size),
            children: [
               React.createElement('div', {
                  className: 'tit',
                  children: title,
                  key: 0
               }),
               extra ? React.createElement('div', {
                  className: 'ext',
                  children: extra,
                  key: 1
               }) : null,
            ],
            style: titleStyle
         }) : null,
         React.createElement('div', {
            key: 1,
            className: classnames('bd', size),
            children: children,
            style: bodyStyle
         }),
         footer ? React.createElement('div', {
            key: 2,
            className: classnames('ft', size),
            children: footer,
            style: footerStyle
         }) : null,
      ],
      onClick,
      ref: dref,
      style: Object.assign({ width, height }, style),
   });
};

Card.defaultProps = {
   size: 'md', // 默认尺寸 
};

if (window.DEV) {
   const TYPE_NS = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
   Card.propTypes = {
      bordered: PropTypes.bool,
      bodyStyle: PropTypes.object,
      extra: PropTypes.any,
      footerAlign: PropTypes.oneOf(['center', 'right']),
      footer: PropTypes.any,
      height: TYPE_NS,
      size: PropTypes.oneOf(MQ_Breakpoints),
      title: PropTypes.any,
      titleStyle: PropTypes.object,
      width: TYPE_NS,
   };
}