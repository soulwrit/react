import { createElement, } from 'react';
import context from './Context';  
import { createManager } from './Manager';

export function createViewBox(Component, config) {
    const ProviderWrapper = props => {
        const nextProps = Object.assign({}, config, props);
        const vbm = createManager();

        return createElement(context.Provider, {
            value: vbm,
        }, createElement(Component, nextProps));
    };

    return ProviderWrapper;
}