import { createElement } from 'react';
import PropTypes from 'prop-types';
import context from './Context';
import { createManager } from './Manager';

function Provider(props) {
    const { children, name, onChange } = props;
    const vbm = createManager(name, onChange);

    return createElement(context.Provider, {
        value: vbm,
    }, children);
}

Provider.defaultProps = {
    children: null,
    name: void 0,
    onChange: void 0
};
if (window.DEV) {
    Provider.propTypes = {
        children: PropTypes.any,
        name: PropTypes.string,
        onChange: PropTypes.func,
    };
}

export { Provider };