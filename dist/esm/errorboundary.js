import { a as _inherits, b as _createSuper, d as _classCallCheck, c as _createClass } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';

var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  _inherits(ErrorBoundary, _React$Component);

  var _super = _createSuper(ErrorBoundary);

  function ErrorBoundary(props) {
    var _this;

    _classCallCheck(this, ErrorBoundary);

    _this = _super.call(this, props);
    _this.state = {
      error: null,
      errorInfo: null
    };
    return _this;
  }

  _createClass(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      }); // You can also log error messages to an error reporting service here
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.errorInfo) {
        // Error path
        return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("h2", null, "Something went wrong."), /*#__PURE__*/React__default.createElement("details", {
          style: {
            whiteSpace: 'pre-wrap'
          }
        }, this.state.error && this.state.error.toString(), /*#__PURE__*/React__default.createElement("br", null), this.state.errorInfo.componentStack));
      } // Normally, just render children


      return this.props.children;
    }
  }]);

  return ErrorBoundary;
}(React__default.Component);

export { ErrorBoundary };
