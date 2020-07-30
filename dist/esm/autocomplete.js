import { f as _slicedToArray } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default, { useState, useRef } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';
import './assert-cc694573.js';
import './noop-469b0e21.js';
import './object-has-own-6b83c90b.js';
import './Model-6d1c225d.js';
import { Input } from './input.js';
import { Pager } from './pager.js';
import 'react-dom';
import './raf-4503f6a0.js';
import './dom-contains-5179471e.js';
import './Trigger-15f31aa8.js';
import { DropdownItem, Dropdown, DropdownHead } from './dropdown.js';
import './dom-viewport-width-59a780a1.js';
import './dom-viewport-height-640d289b.js';
import './zIndex-bd9d5e3e.js';

/**
 * @example 
 * <AutoComplete
 *  values={[
 *      { value: 289831 },
 *      { value: 2232 },
 *      { value: 33442 },
 *      { value: 789866 },
 *      { value: 89777 },
 *  ]}
 * />
 */

var AutoComplete = function AutoComplete(props) {
  var className = props.className,
      empty = props.empty,
      fetch = props.fetch,
      filter = props.filter,
      itemClassName = props.itemClassName,
      model = props.model,
      pageNo = props.pageNo,
      pageSize = props.pageSize,
      placeholder = props.placeholder,
      render = props.render,
      valueKey = props.valueKey;
  var initialValues = props.values;
  var initialValue = props.value;

  var _useState = useState(pageNo),
      _useState2 = _slicedToArray(_useState, 2),
      pageIndex = _useState2[0],
      setPageIndex = _useState2[1];

  var _useState3 = useState(pageSize),
      _useState4 = _slicedToArray(_useState3, 2),
      pageOffset = _useState4[0],
      setPageOffset = _useState4[1];

  var tmpValues = useRef();

  var limit = function limit(array) {
    return array.slice((pageIndex - 1) * pageOffset, pageIndex * pageOffset);
  };

  var _useState5 = useState(initialValues.length),
      _useState6 = _slicedToArray(_useState5, 2),
      total = _useState6[0],
      setTotal = _useState6[1];

  var _useState7 = useState(limit(initialValues)),
      _useState8 = _slicedToArray(_useState7, 2),
      values = _useState8[0],
      setValues = _useState8[1];

  var _useState9 = useState(initialValue),
      _useState10 = _slicedToArray(_useState9, 2),
      value = _useState10[0],
      setValue = _useState10[1];

  var _useState11 = useState(false),
      _useState12 = _slicedToArray(_useState11, 2),
      visible = _useState12[0],
      setVisible = _useState12[1];

  var items = [];

  var getData = function getData() {
    if (fetch) {
      fetch({
        index: pageIndex,
        offset: pageOffset,
        value: value
      }, function (values, total) {
        setValues(values);
        setTotal(total);
      });
      return true;
    }
  };

  var setData = function setData(value, visible) {
    if (getData()) {
      setValue(value);
      setVisible(visible);
      return;
    }
    var array = !!value ? initialValues.filter(function (obj) {
      return filter(obj[valueKey], value);
    }) : initialValues;
    setPageIndex(1);
    tmpValues.current = array;
    setValue(value);
    setVisible(visible);
    setTotal(array.length);
    setValues(limit(array));
  };

  var onVisible = function onVisible() {
    setVisible(true);
  };

  var onChange = function onChange(value) {
    setData(value, true);
  };

  var onClick = function onClick(value) {
    return function () {
      setData(value, false);
    };
  };

  var onPageChange = function onPageChange(no, size) {
    setPageIndex(no);
    setPageOffset(size);
    if (getData()) return;
    var array = tmpValues.current || initialValues;
    setTotal(array.length);
    setValues(limit(array));
  };

  if (visible) {
    if (total > 0) {
      values.forEach(function (obj, index) {
        items.push( /*#__PURE__*/React__default.createElement(DropdownItem, {
          key: index,
          children: render(obj[valueKey], value),
          className: itemClassName,
          onClick: onClick(obj[valueKey])
        }));
      });
      items.push( /*#__PURE__*/React__default.createElement(DropdownItem, {
        key: total,
        children: /*#__PURE__*/React__default.createElement(Pager, {
          total: total,
          pageNo: pageIndex,
          pageSize: pageOffset,
          onChange: onPageChange
        })
      }));
    } else {
      items.push( /*#__PURE__*/React__default.createElement(DropdownItem, {
        key: 0,
        children: empty,
        className: itemClassName
      }));
    }
  }

  return /*#__PURE__*/React__default.createElement(Dropdown, {
    visible: visible,
    hoverable: false,
    multiple: false
  }, /*#__PURE__*/React__default.createElement(DropdownHead, null, /*#__PURE__*/React__default.createElement('div', {
    className: classnames(CSSUtil.autoComplete, className)
  }, /*#__PURE__*/React__default.createElement(Input, {
    onChange: onChange,
    onClick: onVisible,
    placeholder: placeholder,
    value: value,
    model: model
  }))), items);
};

AutoComplete.defaultProps = {
  pageNo: 1,
  pageSize: 10,
  filter: function filter(v0, v1) {
    return v0 === v1 || v0.toString().indexOf(v1) > -1;
  },
  render: function render(v0, v1) {
    return !!v1 ? /*#__PURE__*/React__default.createElement('span', {
      dangerouslySetInnerHTML: {
        __html: v0.toString().replace(v1, v1.toString().fontcolor('#007bff'))
      }
    }) : v0;
  },
  valueKey: 'value',
  values: [],
  placeholder: '请在此输入',
  empty: '没有检索到相关信息 ... ...'
};

if (window.DEV) {
  AutoComplete.propTypes = {
    className: propTypes.string,
    placeholder: propTypes.string,
    pageNo: propTypes.number,
    pageSize: propTypes.number,
    fetch: propTypes.func,
    filter: propTypes.func.isRequired,
    render: propTypes.func,
    valueKey: propTypes.string,
    values: propTypes.arrayOf(propTypes.object).isRequired,
    empty: propTypes.any
  };
}

export { AutoComplete };
