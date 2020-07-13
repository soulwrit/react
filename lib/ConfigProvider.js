import React from 'react';
import { ConfigContext } from './Config/Context';
import { DEFAULT } from './Config/Default';

export const ConfigProvider = props => {
    const { children, ...rest } = props;
    const config = Object.assign({}, DEFAULT, rest);

    return React.createElement(ConfigContext.Provider, {
        value: config
    }, children);
}
