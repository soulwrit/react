import { f as _slicedToArray, g as _objectWithoutProperties, h as _objectSpread2 } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default, { useState, useEffect } from 'react';
import './index-c0558b2a.js';
import './index-dc594463.js';
import './dependency-8ea69cb4.js';
import ReactDOM from 'react-dom';
import { P as ProgressBar } from './ProgressBar-f802d2a3.js';
export { P as ProgressBar } from './ProgressBar-f802d2a3.js';

var useProgress = function useProgress(initial, callback) {
  var _useState = useState(initial),
      _useState2 = _slicedToArray(_useState, 2),
      progress = _useState2[0],
      setProgress = _useState2[1];

  var setProgressWrapper = function setProgressWrapper(newValue, callback) {
    if (typeof callback === 'function') {
      callback(progress);
    }

    setProgress(newValue);
  };

  useEffect(function () {
    if (typeof callback === 'function') {
      callback(progress);
    }
  }, [progress]);
  return [progress, setProgressWrapper];
};

function getProgressSpeedmeter(step, end) {
  var k = step;
  var i = k / 21;
  var end = end || 0.98;
  return function (s) {
    var start = s;

    if (start >= end) {
      return end;
    }

    start += k;
    k -= i;

    if (k < 0.001) {
      k = 0.001;
    }

    return start;
  };
}

function getSharedProgressBar(option) {
  var HOC = function HOC(props) {
    var value = props.value,
        rest = _objectWithoutProperties(props, ["value"]);

    var _useProgress = useProgress(value),
        _useProgress2 = _slicedToArray(_useProgress, 2),
        progress = _useProgress2[0],
        setProgress = _useProgress2[1];

    useEffect(function () {
      context.setProgress = setProgress;
    }, []);
    return /*#__PURE__*/React__default.createElement(ProgressBar, _objectSpread2({
      value: progress
    }, rest));
  };

  var context = {
    delay: option.delay > 30 ? option.delay : 30,
    step: option.step || 0.05,
    wait: !!option.wait || true,
    autoStart: !!option.autoStart,
    instance: null,
    container: document.createElement('div'),
    mount: function mount() {
      delete option.autoStart;
      delete option.delay;
      delete option.step;
      delete option.wait;
      context.instance = /*#__PURE__*/React__default.createElement(HOC, option);
      ReactDOM.render(context.instance, context.container);
      document.body.appendChild(context.container);
    },
    unmount: function unmount() {
      ReactDOM.unmountComponentAtNode(context.container);
      document.body.removeChild(context.container);
    },
    run: function run() {
      var progress = context.speedometer(context.form);

      if (progress >= 1) {
        if (context.wait) {
          context.form = 0;
          context.puase();
          return;
        }

        return context.unmount();
      }

      context.setProgress(progress, function (progress) {
        if (typeof option.onEneded === 'function' && progress >= 1) {
          option.onEneded();
        } else if (typeof option.onProgress === 'function') {
          option.onProgress(progress);
        }
      });
    },
    go: function go(form, to, step) {
      context.puase();
      context.step = step || context.step;
      context.form = form;
      context.speedometer = getProgressSpeedmeter(context.step, to || 1);
      context.timer = setInterval(context.run, context.delay);
    },
    start: function start(form, step) {
      context.go(form, 1, step);
    },
    puase: function puase() {
      if (context.timer) {
        clearInterval(context.timer);
        context.timer = null;
      }
    },
    restart: function restart() {
      context.timer = setInterval(context.run, context.delay);
    },
    end: function end(to) {
      context.go(context.form || 0.98, to || 1);
    }
  };

  if (context.autoStart) {
    context.mount();
  }

  getSharedProgressBar = function wrapperFunc() {
    return context;
  };

  return getSharedProgressBar();
}

var getCommonProgressBar = getSharedProgressBar;

export { getCommonProgressBar };
