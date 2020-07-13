import { g as _objectWithoutProperties } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import { D as DEFAULT, C as ConfigContext } from './Context-859f32e3.js';

var ConfigProvider = function ConfigProvider(props) {
  var children = props.children,
      rest = _objectWithoutProperties(props, ["children"]);

  var config = Object.assign({}, DEFAULT, rest);
  return /*#__PURE__*/React__default.createElement(ConfigContext.Provider, {
    value: config
  }, children);
};

export { ConfigProvider };
