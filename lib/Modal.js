import '@writ/scss/components/modal.scss';
import React, { useEffect, useRef, useState, useCallback, } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import assert from '@writ/utils/assert';
import hasOwn from '@writ/utils/object-has-own';

import { theme, CSSUtil, placements } from '../dependency';
import { CSSMotion } from './Common/CSSMotion';
import { getZIndex } from './Common/zIndex';
import { Mask } from './Mask';
export const Modal = props => {
   const {
      bodyClassName, bodyStyle,
      children, className, container,
      footer, footerStyle, footerClassName,
      headerStyle, headerClassName, height,
      mask, maskClosable, maskStyle,
      onClose, onHide, onHidden, onShow, onShown, placement,
      size, style, theme,
      title, times, timesClosable,
      visible, width
   } = props;
   const hasVisible = hasOwn(props, 'visible');

   if (hasVisible && title) {
      assert.falsly(!!onClose, '`Controller Modal` must via your close handle!');
   }
   const isControlled = hasVisible && onClose;
   const modalRef = useRef();
   const [isInitialed, setIsInitialed] = useState(false)
   const [opened, setOpened] = useState(true);
   const shown = isControlled ? visible : opened;
   const position = placement ? placement : 'middle';
   const onCloseWrapper = () => {
      if (isControlled) return onClose();
      setOpened(false);
   };
   const onStart = useCallback(() => {
      shown ? onShow && onShow() : isInitialed && onHide && onHide();
      if (style && placements.some(k => typeof style[k] !== 'undefined')) {
         return isInitialed;
      }
   }, [shown]);
   const onEnded = useCallback(() => {
      shown ? onShown && onShown() : onHidden && onHidden();
   }, [shown]);
   const onRef = useCallback(() => modalRef.current, [modalRef]);
   useEffect(() => {
      !isInitialed && setIsInitialed(true);
   }, []);

   return ReactDOM.createPortal([
      mask ? React.createElement(Mask, {
         key: 'mask',
         className: 'fixed',
         onClose: maskClosable ? onCloseWrapper : null,
         style: maskStyle,
         times: 0,
         visible: shown,
         zIndex: getZIndex()
      }) : null,
      React.createElement(CSSMotion,
         {
            active: position,
            key: 'body',
            offset: 'open',
            onStart,
            onEnded,
            onRef,
            visible: shown,
            display: true
         },
         React.createElement('div',
            {
               className: classnames(CSSUtil.modal, className),
               ref: modalRef,
               style: Object.assign({ width, height, zIndex: getZIndex() }, style),
            },
            title && React.createElement('div',
               {
                  className: classnames('hd', size, theme, headerClassName),
                  style: headerStyle,
               },
               React.createElement('div', {
                  className: 'tit'
               }, title),
               times && React.createElement('div', {
                  className: 'cls',
                  onClick: timesClosable ? onCloseWrapper : null,
                  [typeof times != 'string' ? 'children' : 'dangerouslySetInnerHTML']:
                     typeof times != 'string' ? times : { __html: times }
               })
            ),
            children && React.createElement('div', {
               className: classnames('bd', size, bodyClassName),
               style: bodyStyle,
            }, children),
            footer && React.createElement('div', {
               className: classnames('ft', size, footerClassName),
               style: footerStyle,
            }, footer)
         )
      ),
   ], container);
};

Modal.defaultProps = {
   times: '&times;',
   timesClosable: true,
   mask: true,
   maskClosable: true,
   placement: 'fade',
   size: 'md',
   width: 300,
   container: document.body
};

if (window.DEV) {
   const TYPE_NS = [PropTypes.string, PropTypes.number];
   Modal.propTypes = {
      bodyStyle: PropTypes.object,
      bodyClassName: PropTypes.string,

      theme: PropTypes.oneOf(theme),
      title: PropTypes.any,

      times: PropTypes.any,
      timesClosable: PropTypes.bool,

      mask: PropTypes.bool,
      maskClosable: PropTypes.bool,
      maskStyle: PropTypes.any,

      headerStyle: PropTypes.object,
      headerClassName: PropTypes.string,

      footer: PropTypes.any,
      footerStyle: PropTypes.object,
      footerClassName: PropTypes.string,

      onClose: PropTypes.func,
      onHidden: PropTypes.func,
      onShow: PropTypes.func,
      onShown: PropTypes.func,
      visible: PropTypes.bool,

      placement: PropTypes.oneOf(['top-start', 'top', 'top-end', 'right', 'bottom-start', 'bottom', 'bottom-end', 'left', 'middle', 'fade']),
      width: PropTypes.oneOfType(TYPE_NS),
      height: PropTypes.oneOfType(TYPE_NS),
      span: PropTypes.oneOfType(TYPE_NS),
   }
}