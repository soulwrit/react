import '@writ/scss/components/tooltip.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSUtil, MQ_Breakpoints, theme } from '../dependency';
import { Trigger } from './Common/Trigger';
import { RefBox } from './Common/RefBox';
import { getCoord } from './Tooltip/placements';

export function Tooltip(props) {
   const {
      calc, children, className,
      hoverable,
      placement, space, style,
      size, title, theme,

      // 传递给 Trigger 的 props
      closeOnEsc, closeOnOutsideClick, container,
      disabled, escape,
      onClose, onKeyUp, onOpen, onResize,
      resetOnTopResize,
      visible
   } = props;
   const calcCoord = calc || getCoord(placement, space);

   return React.createElement(Trigger, {
      closeOnEsc, closeOnOutsideClick,
      disabled, escape, onClose, onKeyUp, onOpen, onResize,
      resetOnTopResize, calcCoord, visible,
   }, action => {
      /*
         close: this.onClose,
         open: this.onOpen,
         coord: this.state.coord,
         visible: this.state.visible,
         layer: this.layerRef,
         trigger: this.pointRef,
      */
      const bindEvent = (props, nextProps) => {
         if (hoverable) {
            nextProps.onMouseEnter = props.onMouseEnter ? e => {
               if (props.onMouseEnter(e)) {
                  return;
               }
               action.open(e);
            } : action.open;

            nextProps.onMouseLeave = props.onMouseLeave ? e => {
               if (props.onMouseLeave(e)) {
                  return;
               }
               action.close(e);
            } : action.close;
         } else {
            nextProps.onClick = props.onClick ? e => {
               if (props.onClick(e)) {
                  return;
               }
               action.open(e);
            } : action.open;
         }

         return props;
      };

      return [
         React.createElement(RefBox, {
            bindEvent,
            children,
            key: 0,
            ref: action.trigger,
         }),
         action.visible ? ReactDOM.createPortal(
            React.createElement('div', {
               className: classnames(CSSUtil.tooltips, size, theme, placement, className),
               ref: action.layer,
               style: Object.assign({}, action.coord, style),
            }, React.createElement('div', {
               className: 'arrow',
            }), React.createElement('div', {
               className: 'inner',
               children: typeof title === 'function' ? title(action) : title
            })),
            container
         ) : null
      ];
   },
   );
}
Tooltip.defaultProps = {
   container: document.body,
   size: 'md',
   theme: 'dark',
   placement: 'top',
   title: 'tooltip title!',
   hoverable: true,
   space: 15
};
if (window.DEV) {
   Tooltip.propTypes = {
      children: PropTypes.any.isRequired,
      style: PropTypes.object,
      size: PropTypes.oneOf(MQ_Breakpoints),
      theme: PropTypes.oneOf(theme),
      title: PropTypes.any,
      visible: PropTypes.bool,
      hoverable: PropTypes.bool
   };
}
