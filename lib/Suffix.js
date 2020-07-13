import '@writ/scss/components/suffix.scss';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import getScroll from '@writ/utils/dom-get-scroll';
import contains from '@writ/utils/dom-contains';
import scrollTo from '@writ/utils/dom-scroll-to';
import assert from '@writ/utils/assert';
import raf from '@writ/utils/raf';
import { CSSMotion } from './Common/CSSMotion';
import { BackTop } from './Suffix/BackTop';

export const Suffix = props => {
   const { backTop, children, className, isVertical, onScrollEnd, style, visibility, zIndex } = props;
   const [visible, setVisible] = useState(false);
   const pointRef = useRef();
   const wrapperRef = useRef();

   const getCurrent = () => {
      const { current } = backTop;
      assert.nuil(current, 'Scrolling Container must be a HTML Element.');
      return current;
   };

   useEffect(() => {
      const current = getCurrent();

      // 可以点击停止 
      let canceled = true;
      const options = {
         callback: () => {
            canceled = true;
            onScrollEnd && onScrollEnd();
         },
         cancel: () => canceled,
         duration: 2000,
         getContainer: () => current,
      };
      const handleClick = e => {
         if (canceled === true) {
            if (contains(pointRef.current, e.target)) {
               canceled = false;
               return scrollTo(0, options);
            }
         }
         canceled = true;
      };
      const handleScroll = () => {
         raf(() => {
            const current = getCurrent();
            const value = getScroll(current, isVertical);

            if (value >= visibility && !visible) {
               // 此处存在卡顿问题
               setVisible(true);
            } else {
               setVisible(false);
            }
         });
      };
      current.addEventListener('click', handleClick, false);
      current.addEventListener('scroll', handleScroll, false);

      return () => {
         current.removeEventListener('click', handleClick, false);
         current.removeEventListener('scroll', handleScroll, false);
      };
   }, []);

   return React.createElement(CSSMotion, {
      key: 'draw',
      active: 'fade',
      offset: 'in',
      display: true,
      onStart: () => true,
      onRef: () => wrapperRef.current,
      visible
   }, React.createElement('div', {
      style: Object.assign({ zIndex }, style),
      className: classnames('suf', className, {
         non: !visible
      }),
      ref: wrapperRef,
   }, children, backTop ? React.createElement(BackTop, {
      ref: pointRef
   }, 'UP') : null));
};

Suffix.defaultProps = {
   backTop: {
      current: window
   },
   isVertical: true,
   visibility: 50
};
if (window.DEV) {
   Suffix.propTypes = {
      backTop: PropTypes.object,
      isVertical: PropTypes.bool,
      onScrollEnd: PropTypes.func,
      visibility: PropTypes.number,
      zIndex: PropTypes.number,
   };
}