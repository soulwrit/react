import '@writ/scss/components/toast.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import hasOwn from '@writ/utils/object-has-own';
import { createContainer, removeContainer } from './Toast/container';
import { getKey } from './Toast/getKey';
import { mergeProps } from './Toast/defaultProps';
import { Layer } from './Toast/Layer';
import { Toast } from './Toast/Toast';
export function toast(content, type, options) {
   const key = getKey();
   const props = { type, value: content};
   
   mergeProps(options, props, true);

   const userOnClose = props.onClose;
   const position = props.position;
   
   props.key = key;
   props.onClose = function onEnd() {
      console.log('Toast Unmount.');
      bridge.instance.remove(element);
      typeof userOnClose === 'function' && userOnClose();
   };

   const [container, bridge] = createContainer(position);
   const element = React.createElement(Toast, props);

   if (hasOwn(bridge, 'instance')) {
      bridge.instance.add(element);
   } else {
      ReactDOM.render(React.createElement(Layer, {
         first: element,
         onRef: instance => {
            bridge.instance = instance;
         },
         unmonut: () => {
            console.log('Layer Unmount.');
            removeContainer(position);
         }
      }), container);
   }
}
toast.secondary = function secondary(content, options) {
   toast(content, 'secondary', options);
}
toast.error = function error(content, options) {
   toast(content, 'error', options);
}
toast.info = function info(content, options) {
   toast(content, 'info', options);
}
toast.success = function success(content, options) {
   toast(content, 'success', options);
}
toast.warn = function warning(content, options) {
   toast(content, 'warning', options);
}
toast.fatal = function danger(content, options) {
   toast(content, 'danger', options);
}
toast.darken = function dark(content, options) {
   toast(content, 'dark', options);
}
toast.config = function config(options) {
   void mergeProps(options);
}