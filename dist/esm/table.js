import { a as _inherits, b as _createSuper, d as _classCallCheck, c as _createClass, _ as _defineProperty, g as _objectWithoutProperties, h as _objectSpread2 } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';

function Column() {
  return null;
}
Column.defaultProps = {
  /**
   * 
   * @param {Object} data 
   * @param {String} key  
   */
  render: function render(data, key) {
    return data[key];
  }
};
Column.propTypes = {
  render: propTypes.func.isRequired
};
/**
 * 表头数据渲染
 * @param {Table.defaultProps} props 
 */

function theadRender(props) {
  var columns = props.columns;
  return columns.map(function (_ref) {
    var key = _ref.key,
        value = _ref.value,
        render = _ref.render,
        children = _ref.children,
        props = _objectWithoutProperties(_ref, ["key", "value", "render", "children"]);

    return /*#__PURE__*/React__default.createElement('th', _objectSpread2(_objectSpread2({}, props), {}, {
      key: key,
      children: typeof render === 'function' ? render(key, value) || value : value
    }));
  });
}
/**
 * 表格数据渲染
 * @param {Table.defaultProps} props 
 */


function sourceRender(props) {
  var source = props.source,
      children = props.children,
      columns = props.columns;
  var hasChildren = children != null;
  return source.map(function (data, dataIndex) {
    return /*#__PURE__*/React__default.createElement('tr', {
      key: dataIndex,
      children: columns.map(function (_ref2, columnIndex) {
        var key = _ref2.key;

        var _Column = hasChildren && children[columnIndex] || /*#__PURE__*/React__default.createElement(Column);

        if (_Column.type !== Column) {
          throw new Error('Table.Child must be a `Table.Column`.');
        }

        var _Column$props = _Column.props,
            render = _Column$props.render,
            className = _Column$props.className,
            columnProps = _objectWithoutProperties(_Column$props, ["render", "className"]);

        return /*#__PURE__*/React__default.createElement('td', {
          key: columnIndex,
          children: render(data, key),
          className: typeof className === 'function' ? className(dataIndex, columnIndex) : className,
          style: columnProps.style,
          colSpan: columnProps.colspan
        });
      })
    });
  });
}
/**
 * 表格数据渲染
 * @param {Table.defaultProps} props 
 */


function emptyRender(props) {
  var placeholder = props.placeholder,
      placeholderClassName = props.placeholderClassName,
      columns = props.columns;
  return /*#__PURE__*/React__default.createElement("tr", null, /*#__PURE__*/React__default.createElement("td", {
    colSpan: columns.length,
    className: placeholderClassName
  }, placeholder));
}

var Table = /*#__PURE__*/function (_React$Component) {
  _inherits(Table, _React$Component);

  var _super = _createSuper(Table);

  function Table() {
    _classCallCheck(this, Table);

    return _super.apply(this, arguments);
  }

  _createClass(Table, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          className = _this$props.className,
          extra = _this$props.extra,
          source = _this$props.source,
          tighten = _this$props.tighten,
          hover = _this$props.hover,
          striped = _this$props.striped,
          bordered = _this$props.bordered,
          fixed = _this$props.fixed;
      return /*#__PURE__*/React__default.createElement("div", {
        className: CSSUtil.table
      }, /*#__PURE__*/React__default.createElement("table", {
        className: [className, tighten ? 'tighten' : undefined, hover ? 'hover' : undefined, striped ? 'striped' : undefined, bordered ? 'bordered' : '', fixed ? 'fixed' : ''].join(' ')
      }, title && /*#__PURE__*/React__default.createElement("caption", null, title), /*#__PURE__*/React__default.createElement("thead", null, /*#__PURE__*/React__default.createElement("tr", null, theadRender(this.props))), /*#__PURE__*/React__default.createElement("tbody", null, source.length ? sourceRender(this.props) : emptyRender(this.props))), extra);
    }
  }]);

  return Table;
}(React__default.Component);

_defineProperty(Table, "Column", Column);

_defineProperty(Table, "defaultProps", {
  columns: [],
  source: [],
  title: undefined,
  extra: null,
  placeholder: '亲，暂无数据~~~',
  placeholderClassName: 'tac'
});

{
  Table.propTypes = {
    source: propTypes.array.isRequired,
    columns: propTypes.arrayOf(propTypes.shape({
      key: propTypes.string.isRequired,
      value: propTypes.string.isRequired,
      render: propTypes.func
    })).isRequired,
    title: propTypes.string,
    extra: propTypes.element,
    placeholder: propTypes.any,
    placeholderClassName: propTypes.string,
    tighten: propTypes.bool,
    hover: propTypes.bool,
    striped: propTypes.bool,
    bordered: propTypes.bool,
    fixed: propTypes.bool
  };
}

export { Column, Table };
