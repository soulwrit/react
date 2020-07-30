import { createElement, useReducer, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Context } from './Slot/Context';
import { reducer } from './Slot/reducer';
export const SlotProvider = props => {
    const state = Object.create(null);
    const [slots, dispatch] = useReducer(reducer, state);

    return createElement(Context.Provider, {
        value: {
            slots,
            dispatch
        }
    }, props.children);
}
export const SlotInstall = props => {
    const { name } = props;
    const { slots } = useContext(Context);

    return slots[name] || null;
}
export const Slot = props => {
    const { name, children, } = props;
    const { dispatch } = useContext(Context);
   
    useEffect(() => {
        dispatch({
            type: 'set',
            node: children,
            name: name,
            // onReady
        });
    }, [children]);

    return null;
}
Slot.Install = SlotInstall;
if (window.DEV) {
    Slot.propTypes = {
        children: PropTypes.any,
        name: PropTypes.string.isRequired,
        // onReady: PropTypes.func
    };
    SlotInstall.propTypes = {
        name: PropTypes.string.isRequired,
    };
    SlotProvider.propTypes = {
        children: PropTypes.any
    };
}
