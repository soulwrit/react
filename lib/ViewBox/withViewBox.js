import { createElement } from 'react';
import context from './Context';
export function withViewBox(Component, config) {
    function ComponentWrapper(props) {
        return createElement(context.Consumer, null, vbm => {
            const nextProps = Object.assign({}, config, props, { vbm });

            return createElement(Component, nextProps);
        });
    }
    ComponentWrapper.displayName = `withViewBox(${Component.displayName || Component.name})`;

    return ComponentWrapper;
} 