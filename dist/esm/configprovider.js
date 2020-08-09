import { g as _objectWithoutProperties } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default from 'react';
import { D as DEFAULT, C as ConfigContext } from './Context-2b6bec3a.js';

var ConfigProvider = function ConfigProvider(props) {
  var children = props.children,
      rest = _objectWithoutProperties(props, ["children"]);

  var config = Object.assign({}, DEFAULT, rest);
  return /*#__PURE__*/React__default.createElement(ConfigContext.Provider, {
    value: config
  }, children);
};

export { ConfigProvider };
