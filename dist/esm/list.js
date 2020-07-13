import { g as _objectWithoutProperties, h as _objectSpread2 } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';

function throwError() {
  throw new Error('Only `List.Item`, `List.Head`, `List.Foot` used in `List`.');
}

function Head(props) {
  var value = props.value,
      children = props.children,
      className = props.className,
      rest = _objectWithoutProperties(props, ["value", "children", "className"]);

  return /*#__PURE__*/React__default.createElement('li', _objectSpread2({
    className: classnames('fst', className),
    children: value || children
  }, rest));
}

function Foot(props) {
  var value = props.value,
      children = props.children,
      className = props.className,
      rest = _objectWithoutProperties(props, ["value", "children", "className"]);

  return /*#__PURE__*/React__default.createElement('li', _objectSpread2({
    className: classnames('lst', className),
    children: value || children
  }, rest));
}

function Item(props) {
  var value = props.value,
      children = props.children,
      rest = _objectWithoutProperties(props, ["value", "children"]);

  return /*#__PURE__*/React__default.createElement('li', _objectSpread2({
    children: value || children
  }, rest));
}

function List(props) {
  var children = props.children,
      className = props.className,
      type = props.type,
      rest = _objectWithoutProperties(props, ["children", "className", "type"]);

  var lastIndex = React__default.Children.count(children) - 1;
  return /*#__PURE__*/React__default.createElement(type, _objectSpread2({
    className: classnames(CSSUtil.list, type, className),
    children: React__default.Children.map(children, function (Child, index) {
      if (!Child) return throwError();

      switch (Child.type) {
        case Head:
          {
            return index === 0 ? /*#__PURE__*/React__default.cloneElement(Child, {
              key: index
            }) : null;
          }

        case Foot:
          {
            return index === lastIndex ? /*#__PURE__*/React__default.cloneElement(Child, {
              key: index
            }) : null;
          }

        case Item:
          {
            return /*#__PURE__*/React__default.cloneElement(Child, {
              key: index
            });
          }
      }

      throwError();
    })
  }, rest));
}

List.Item = Item;
List.Head = Head;
List.Foot = Foot;
List.defaultProps = {
  type: 'ol'
};
List.propTypes = {
  type: propTypes.oneOf(['ol', 'ul'])
};

export { List };
