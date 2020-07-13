import { f as _slicedToArray } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default, { useState, useEffect } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';
import { M as Model } from './Model-6a5cfb7c.js';

var Radio = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var children = props.children,
      checked = props.checked,
      disabled = props.disabled,
      name = props.name,
      model = props.model,
      _onChange = props.onChange,
      readonly = props.readonly,
      type = props.type,
      value = props.value;
  var isChecked = model ? model.value : checked;
  return /*#__PURE__*/React__default.createElement(type, {
    className: CSSUtil.radio
  }, /*#__PURE__*/React__default.createElement('input', {
    className: 'radio',
    checked: isChecked,
    disabled: disabled,
    name: name,
    onChange: function onChange(e) {
      _onChange && _onChange(e.target.checked);
    },
    ref: ref,
    readOnly: readonly,
    type: 'radio'
  }), /*#__PURE__*/React__default.createElement('span', {
    className: classnames('state', {
      disabled: disabled,
      readonly: readonly
    })
  }), /*#__PURE__*/React__default.createElement('span', {
    className: 'value',
    children: value || children
  }));
});

var Group = function Group(props) {
  var active = props.active,
      children = props.children,
      name = props.name,
      model = props.model,
      checked = props.checked,
      _onChange2 = props.onChange;
  var initialChecked = model ? model.value : active || checked;

  var _useState = useState(initialChecked),
      _useState2 = _slicedToArray(_useState, 2),
      checkedIndex = _useState2[0],
      setCheckedIndex = _useState2[1];

  if (model) {
    useEffect(function () {
      var modelDispatch = function modelDispatch(index) {
        setCheckedIndex(index);
      };

      if (model) {
        model.dispatch = modelDispatch;
      }

      return function () {
        if (model) {
          model.undispatch = modelDispatch;
        }
      };
    }, []);
  }

  return React__default.Children.map(children, function (Item, index) {
    if (Item.type !== Radio) {
      throw new Error('Only `Radio` used in `Radio.Group`.');
    }

    var isChecked = checkedIndex >= 0 ? checkedIndex === index : !!Item.props.checked;
    return /*#__PURE__*/React__default.cloneElement(Item, {
      name: name,
      checked: isChecked,
      key: index,
      onChange: function onChange() {
        if (model) {
          model.value = index;
        } else {
          setCheckedIndex(index);
        }

        _onChange2 && _onChange2(index);
      }
    });
  });
};

Radio.Group = Group;
Radio.defaultProps = {
  type: 'label'
};

if (window.DEV) {
  Radio.propTypes = {
    name: propTypes.string,
    value: propTypes.any,
    checked: propTypes.bool,
    onChange: propTypes.func,
    disabled: propTypes.bool,
    readonly: propTypes.bool,
    type: propTypes.string
  };
  Group.propTypes = {
    active: propTypes.number,
    checked: propTypes.number,
    name: propTypes.string.isRequired,
    model: propTypes.instanceOf(Model),
    onChange: propTypes.func
  };
}

export { Radio };
