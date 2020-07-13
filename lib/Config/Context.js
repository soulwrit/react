import React from 'react';
import { DEFAULT } from './Default';
export const ConfigContext = React.createContext(DEFAULT);
ConfigContext.displayName = 'gc';
export const ConfigProvider = ConfigContext.Provider;
export const ConfigConsumer = ConfigContext.Consumer;
export function withConfigConsumer(currentConfig) {
    return function withConfigConsumerWrapper(Component) {
        const Wrapper = function Wrapper(props) {
            return React.createElement(ConfigConsumer, null, function (configProps) {
                return React.createElement(Component, Object.assign({}, currentConfig, configProps, props));
            });
        };

        const cons = Component.constructor;
        const name = cons && cons.displayName || Component.name || 'Component';
        Wrapper.displayName = "withConfigConsumer(".concat(name, ")");
        return Wrapper;
    };
}