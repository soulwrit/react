import { f as _slicedToArray } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default, { useState } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';

var Item = function Item(props) {
  var children = props.children,
      className = props.className,
      value = props.value,
      expanded = props.expanded,
      bodyStyle = props.bodyStyle,
      headStyle = props.headStyle,
      dref = props.dref,
      onExpand = props.onExpand,
      style = props.style;
  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames('i', className),
    children: [/*#__PURE__*/React__default.createElement('div', {
      key: 0,
      className: 'hd',
      children: value,
      style: headStyle
    }), /*#__PURE__*/React__default.createElement('div', {
      key: 1,
      className: 'bd',
      children: children,
      style: CSSUtil.show(expanded || false, bodyStyle)
    })],
    onClick: onExpand,
    ref: dref,
    style: style
  });
};

var Accordion = function Accordion(props) {
  var active = props.active,
      children = props.children,
      className = props.className,
      dref = props.dref,
      multiple = props.multiple,
      onChange = props.onChange,
      style = props.style;

  var _useState = useState(active),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      setExpanded = _useState2[1];

  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames(CSSUtil.accordion, className),
    children: React__default.Children.map(children, function (C, key) {
      if (!C || C.type !== Item) {
        throw new Error('Only `Accordion.Item` used in `Accordion`.');
      }

      var value = C.props.value;
      var index = expanded.indexOf(key);
      var actived = index > -1;

      var onExpand = function onExpand(e) {
        var values;
        if (e) e.stopPropagation();

        if (multiple) {
          actived ? values.splice(index, 1) : values.push(key);
          values = [].concat(values);
        } else {
          values = actived ? [] : [key];
        }

        setExpanded(values);
        onChange && onChange(key, values);
      };

      return /*#__PURE__*/React__default.cloneElement(C, {
        key: key,
        expanded: actived,
        value: typeof value === 'function' ? value(actived, onExpand) : value,
        onExpand: typeof value !== 'function' ? onExpand : null
      });
    }),
    ref: dref,
    style: style
  });
};

Accordion.Item = Item;
Accordion.defaultProps = {
  multiple: true,
  active: []
};

if (window.DEV) {
  Item.propTypes = {
    bodyStyle: propTypes.object,
    headStyle: propTypes.object,
    expanded: propTypes.bool,
    value: propTypes.any,
    dref: propTypes.func
  };
  Accordion.propTypes = {
    onChange: propTypes.func,
    multiple: propTypes.bool,
    active: propTypes.array,
    dref: propTypes.func
  };
}

export { Accordion };
