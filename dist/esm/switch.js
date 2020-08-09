import { f as _slicedToArray } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default, { useRef, useState, useEffect } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { M as MQ_Breakpoints } from './dependency-8ea69cb4.js';
import { n as noop_1 } from './noop-469b0e21.js';
import './raf-4503f6a0.js';
import './css-animate-4c1feb1b.js';
import { C as CSSAnimation } from './CSSAnimation-14e8fd9b.js';

var CSSToggle = function CSSToggle(_ref) {
  var active = _ref.active,
      children = _ref.children,
      offset = _ref.offset,
      _onEnded = _ref.onEnded,
      _onStart = _ref.onStart,
      onRef = _ref.onRef,
      visible = _ref.visible;
  return /*#__PURE__*/React__default.createElement(CSSAnimation, {
    onRef: onRef,

    /**@type {HTMLElement} */
    onStart: function onStart(elem) {
      if (visible) {
        !!active && elem.classList.add(active);
      } else {
        !!offset && elem.classList.add(offset);
      }

      _onStart && _onStart(elem);
    },

    /**@type {HTMLElement} */
    onEnded: function onEnded(elem) {
      if (visible) {
        !!offset && elem.classList.remove(offset);
      } else {
        !!active && elem.classList.remove(active);
      }

      _onEnded && _onEnded(elem);
    },
    flag: visible
  }, children);
};
CSSToggle.defaultProps = {};

if (window.DEV) {
  CSSToggle.propTypes = {
    active: propTypes.string,
    display: propTypes.bool,
    offset: propTypes.string,
    only: propTypes.bool,
    onEnter: propTypes.func,
    onEnded: propTypes.func,
    onRef: propTypes.func.isRequired,
    visible: propTypes.bool.isRequired
  };
}

var Switch = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var checked = props.checked,
      disabled = props.disabled,
      off = props.off,
      on = props.on,
      onChange = props.onChange,
      outer = props.outer,
      size = props.size;
  var innerRef = useRef();
  var prior = useRef(checked);

  var _useState = useState(checked),
      _useState2 = _slicedToArray(_useState, 2),
      isChecked = _useState2[0],
      setIsChecked = _useState2[1];

  var onChangeWrapper = function onChangeWrapper(e) {
    e.stopPropagation();
    setIsChecked(!isChecked);
    onChange(checked);
  };

  useEffect(function () {
    if (disabled) return;

    if (prior.current !== checked) {
      prior.current = checked;
      setIsChecked(checked);
      onChange(checked);
    }
  }, [checked, disabled]);

  if (outer) {
    return /*#__PURE__*/React__default.createElement(CSSToggle, {
      active: 'checked',
      offset: 'unchecked',
      onRef: function onRef() {
        return innerRef.current;
      },
      visible: isChecked
    }, /*#__PURE__*/React__default.createElement('span', {
      className: classnames('switch outer', isChecked ? 'checked' : 'unchecked', {
        disabled: disabled
      }),
      onClick: disabled ? null : onChangeWrapper,
      ref: innerRef
    }, on ? /*#__PURE__*/React__default.createElement('span', {
      className: 'truly'
    }, on) : null, /*#__PURE__*/React__default.createElement('span', {
      className: 'hold'
    }), off ? /*#__PURE__*/React__default.createElement('span', {
      className: 'false'
    }, off) : null));
  }

  return /*#__PURE__*/React__default.createElement('span', {
    className: 'switch inner',
    ref: ref
  }, /*#__PURE__*/React__default.createElement(CSSToggle, {
    active: 'checked',
    offset: 'unchecked',
    onRef: function onRef() {
      return innerRef.current;
    },
    visible: isChecked
  }, /*#__PURE__*/React__default.createElement('span', {
    className: classnames('inner', isChecked ? 'checked' : 'unchecked', {
      disabled: disabled
    }),
    onClick: disabled ? null : onChangeWrapper,
    ref: innerRef
  }, /*#__PURE__*/React__default.createElement('span', {
    className: classnames('truly', size)
  }, on), /*#__PURE__*/React__default.createElement('span', {
    className: classnames('hold', size)
  }), /*#__PURE__*/React__default.createElement('span', {
    className: classnames('false', size)
  }, off))));
});
Switch.defaultProps = {
  checked: false,
  disabled: false,
  outer: false,
  onChange: noop_1,
  off: '',
  on: '',
  size: 'xs'
};

if (window.DEV) {
  Switch.propTypes = {
    checked: propTypes.bool,
    disabled: propTypes.bool,
    outer: propTypes.bool,
    onChange: propTypes.func,
    off: propTypes.any,
    on: propTypes.any,
    size: propTypes.oneOf(MQ_Breakpoints)
  };
}

export { Switch };
