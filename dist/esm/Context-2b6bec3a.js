import React__default from 'react';

/**
 * @returns {Object}
 */
function getDefault() {
  var _URL = new URL(window.location),
      host = _URL.host;

  var lowerCaseHost = host.toLowerCase();
  var config = {
    appName: lowerCaseHost,
    appTitle: lowerCaseHost.concat(' 显示')
  };

  getDefault = function getDefault() {
    return config;
  };

  return getDefault();
}
var DEFAULT = getDefault();

var ConfigContext = /*#__PURE__*/React__default.createContext(DEFAULT);
ConfigContext.displayName = 'global-config';
var ConfigProvider = ConfigContext.Provider;
var ConfigConsumer = ConfigContext.Consumer;

export { ConfigContext as C, DEFAULT as D };
