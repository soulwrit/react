import { _ as _defineProperty, f as _slicedToArray } from './_rollupPluginBabelHelpers-62f9ecef.js';
import { createContext, useReducer, createElement, useContext, useEffect } from 'react';
import { p as propTypes } from './index-c0558b2a.js';

var Context = /*#__PURE__*/createContext(null);
Context.displayName = 'slot(react)';

var reducer = function reducer(state, action) {
  var newState;

  switch (action.type) {
    case 'set':
      newState = _defineProperty({}, action.name, action.node);
      break;
  }

  return Object.assign({}, state, newState);
};

var SlotProvider = function SlotProvider(props) {
  var state = Object.create(null);

  var _useReducer = useReducer(reducer, state),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      slots = _useReducer2[0],
      dispatch = _useReducer2[1];

  return /*#__PURE__*/createElement(Context.Provider, {
    value: {
      slots: slots,
      dispatch: dispatch
    }
  }, props.children);
};
var SlotInstall = function SlotInstall(props) {
  var name = props.name;

  var _useContext = useContext(Context),
      slots = _useContext.slots;

  return slots[name] || null;
};
var Slot = function Slot(props) {
  var name = props.name,
      children = props.children;

  var _useContext2 = useContext(Context),
      dispatch = _useContext2.dispatch;

  useEffect(function () {
    dispatch({
      type: 'set',
      node: children,
      name: name // onReady

    });
  }, [children]);
  return null;
};
Slot.Install = SlotInstall;

if (window.DEV) {
  Slot.propTypes = {
    children: propTypes.any,
    name: propTypes.string.isRequired // onReady: PropTypes.func

  };
  SlotInstall.propTypes = {
    name: propTypes.string.isRequired
  };
  SlotProvider.propTypes = {
    children: propTypes.any
  };
}

export { Slot, SlotInstall, SlotProvider };
