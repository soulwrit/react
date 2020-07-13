import { a as _inherits, b as _createSuper, d as _classCallCheck, _ as _defineProperty, e as _assertThisInitialized, c as _createClass, i as _typeof, h as _objectSpread2 } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { t as theme, C as CSSUtil } from './dependency-8ea69cb4.js';
import './noop-469b0e21.js';
import { M as Model } from './Model-6a5cfb7c.js';
import { r as raf } from './raf-4503f6a0.js';
import { PageTurn } from './pageturn.js';
import { Tag } from './tag.js';

/**
 * 高阶 select 组件
 * @example 
 * <SelectHigh
 *  values={[
 *      { value: 289831 },
 *      { value: 2232 },
 *      { value: 33442 },
 *      { value: 789866 },
 *      { value: 89777 },
 *  ]}
 * />
 */

var SelectHigh = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(SelectHigh, _React$PureComponent);

  var _super = _createSuper(SelectHigh);

  function SelectHigh(props) {
    var _this;

    _classCallCheck(this, SelectHigh);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "onHidden", function (e) {
      var ele = e.target;

      while (ele) {
        if (ele === _this.element) {
          return;
        }

        ele = ele.parentElement;
      }

      _this.visiable(false);
    });

    _defineProperty(_assertThisInitialized(_this), "onPageChange", function (pageNo, pageSize) {
      _this.page.pageNo = pageNo;
      _this.page.pageSize = pageSize;
      if (_this.getData()) return;
      var values = _this.tmpValues || _this.props.values;

      _this.setState({
        total: values.length,
        values: _this.limit(values)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      _this.visiable(true);
    });

    _defineProperty(_assertThisInitialized(_this), "onEnter", function (e) {
      var value = e.target.value;
      raf(function () {
        _this.page.value = value;
        if (_this.getData()) return;
        var _this$props = _this.props,
            filter = _this$props.filter,
            values = _this$props.values;
        var array = !!value ? values.filter(function (obj) {
          return filter(_this.getValue(obj), value);
        }) : values;
        _this.tmpValues = array;

        _this.setState({
          total: array.length,
          values: _this.limit(array)
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (obj, undo) {
      return function () {
        _this.setState({
          selected: undo ? _this.state.selected.filter(function (v) {
            return v !== obj;
          }) : _this.state.selected.concat(obj)
        }, function () {
          if (_this.props.model) {
            _this.props.model.value = _this.props.onModel(_this.state.selected);
          }
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "setInputFocus", function () {
      if (_this.input) _this.input.focus();
    });

    _this.page = {
      pageNo: props.pageNo,
      pageSize: props.pageSize,
      value: undefined
    };
    _this.state = {
      total: props.values.length,
      values: _this.limit(props.values),
      visiable: false,
      selected: []
    };
    return _this;
  }

  _createClass(SelectHigh, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getData();
      document.body.addEventListener('click', this.onHidden, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.removeEventListener('click', this.onHidden);
    }
  }, {
    key: "position",
    value: function position() {
      var element = this.element,
          container = this.container;
      if (!element && !container) return;
      var eRect = element.getBoundingClientRect();
      var cRect = container.getBoundingClientRect();
      var style = container.style;
      var _document$body = document.body,
          offsetHeight = _document$body.offsetHeight,
          offsetWidth = _document$body.offsetWidth;

      if (cRect.width < eRect.width) {
        style.minWidth = eRect.width;
      }

      if (cRect.left < 0) {
        style.left = 0 + 'px';
      }

      if (cRect.top < 0) {
        style.top = 0 + 'px';
      }

      if (cRect.right > offsetWidth) {
        style.right = 0 + 'px';
      }

      if (cRect.bottom > offsetHeight) {
        style.bottom = '100%';
      }
    }
  }, {
    key: "visiable",
    value: function visiable(_visiable) {
      var _this2 = this;

      this.setState({
        visiable: _visiable
      }, function () {
        if (_visiable) {
          _this2.position();

          _this2.setInputFocus();
        }
      });
    }
  }, {
    key: "limit",
    value: function limit(values) {
      return values.slice((this.page.pageNo - 1) * this.page.pageSize, this.page.pageNo * this.page.pageSize);
    }
  }, {
    key: "getData",
    value: function getData() {
      var _this3 = this;

      if (this.props.fetch) {
        this.props.fetch(this.page, function (values, total) {
          _this3.setState({
            total: total,
            values: values
          });
        });
        return true;
      }
    }
  }, {
    key: "getValue",
    value: function getValue(obj) {
      return obj && _typeof(obj) === 'object' ? obj[this.props.vKey] : obj;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          headClassName = _this$props2.headClassName,
          bodyClassName = _this$props2.bodyClassName,
          inputClassName = _this$props2.inputClassName,
          theme = _this$props2.theme,
          size = _this$props2.size,
          holder = _this$props2.holder,
          style = _this$props2.style,
          page = _this$props2.page,
          render = _this$props2.render;
      var _this$state = this.state,
          visiable = _this$state.visiable,
          values = _this$state.values,
          selected = _this$state.selected;
      return /*#__PURE__*/React__default.createElement('div', {
        className: classnames(CSSUtil.highSelect, theme, className),
        children: [/*#__PURE__*/React__default.createElement('div', {
          key: 0,
          className: classnames('hd', size, headClassName),
          children: [/*#__PURE__*/React__default.createElement('div', {
            key: 0,
            children: selected.length ? selected.map(function (value, index) {
              return /*#__PURE__*/React__default.createElement(Tag, {
                key: index,
                onClose: _this4.onSelect(value, true),
                size: _this4.props.tagSize,
                theme: _this4.props.tagTheme,
                value: _this4.getValue(value),
                inline: true,
                inb: true
              });
            }) : /*#__PURE__*/React__default.createElement('input', {
              onKeyUp: this.onEnter,
              onFocus: this.onFocus,
              placeholder: this.props.model ? this.props.model.placeholder : this.props.placeholder,
              ref: function ref(ele) {
                return _this4.input = ele;
              },
              value: this.state.value
            }),
            className: 'fst'
          }), /*#__PURE__*/React__default.createElement('div', {
            key: 1,
            children: /*#__PURE__*/React__default.createElement('span', {
              className: 'alt'
            }),
            className: 'lst',
            onClick: this.onFocus
          })],
          onClick: this.setInputFocus
        }), visiable ? /*#__PURE__*/React__default.createElement('ul', {
          key: 1,
          className: classnames(theme, bodyClassName),
          children: [/*#__PURE__*/React__default.createElement('li', {
            key: 'hd',
            children: [/*#__PURE__*/React__default.createElement('input', {
              key: 0,
              className: inputClassName,
              onKeyUp: this.onEnter,
              onFocus: this.onFocus,
              placeholder: this.props.model ? this.props.model.placeholder : this.props.placeholder,
              ref: function ref(ele) {
                return _this4.input = ele;
              },
              value: this.state.value
            }), /*#__PURE__*/React__default.createElement(PageTurn, _objectSpread2(_objectSpread2({}, page), {}, {
              key: 1,
              onChange: this.onPageChange,
              pageNo: this.page.pageNo,
              pageSize: this.page.pageSize,
              total: this.state.total
            }))],
            className: classnames('fst', size)
          }), values.length ? values.map(function (obj, index) {
            return /*#__PURE__*/React__default.createElement('li', {
              key: index,
              children: render(_this4.getValue(obj), _this4.page.value),
              className: classnames(size, CSSUtil.disable(selected.includes(obj))),
              onClick: _this4.onSelect(obj)
            });
          }) : /*#__PURE__*/React__default.createElement('li', {
            key: 0,
            children: holder,
            className: size
          })],
          ref: function ref(ele) {
            return _this4.container = ele;
          }
        }) : null],
        ref: function ref(ele) {
          return _this4.element = ele;
        },
        style: style
      });
    }
  }]);

  return SelectHigh;
}(React__default.PureComponent);

SelectHigh.defaultProps = {
  filter: function filter(v0, v1) {
    return v0 === v1 || v0.toString().indexOf(v1) > -1;
  },
  render: function render(v0) {
    return (
      /* v1 */
      v0
    );
  },
  values: [],
  vKey: 'value',
  holder: '没有相关数据 ... ...',
  onModel: function onModel(v) {
    return v;
  },
  pageNo: 1,
  pageSize: 10,
  size: 'md',
  theme: 'muted'
};

if (window.DEV) {
  SelectHigh.propTypes = {
    headClassName: propTypes.string,
    bodyClassName: propTypes.string,
    theme: propTypes.oneOf(theme),
    model: propTypes.instanceOf(Model),
    onModel: propTypes.func,
    placeholder: propTypes.string,
    page: propTypes.shape(PageTurn.propTypes),
    pageNo: propTypes.number,
    pageSize: propTypes.number,
    fetch: propTypes.func,
    filter: propTypes.func.isRequired,
    render: propTypes.func,
    values: propTypes.arrayOf(propTypes.object).isRequired,
    vKey: propTypes.string,
    holder: propTypes.any,
    tagTheme: Tag.propTypes.theme,
    tagSize: Tag.propTypes.size
  };
}

export { SelectHigh };
