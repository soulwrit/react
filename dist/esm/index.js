export { version } from './_config.js';
import { _ as _inherits, a as _createSuper, b as _classCallCheck, c as _defineProperty, d as _assertThisInitialized, e as _createClass } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default, { memo, createElement, useRef } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { d as dirs, M as MQ_Breakpoints } from './dependency-8ea69cb4.js';
import './HoldImage-a3d534a8.js';
export { Avatar } from './avatar.js';
import { a as assert_1 } from './assert-cc694573.js';
export { Accordion } from './accordion.js';
import './noop-469b0e21.js';
import { o as objectHasOwn } from './object-has-own-6b83c90b.js';
import './Model-51346cf8.js';
export { Input } from './input.js';
export { Pager } from './pager.js';
import 'react-dom';
import './raf-4503f6a0.js';
import './dom-contains-5179471e.js';
import './Trigger-efc78ddb.js';
export { Dropdown } from './dropdown.js';
import './dom-viewport-width-59a780a1.js';
import './dom-viewport-height-640d289b.js';
import './zIndex-bd9d5e3e.js';
export { AutoComplete } from './autocomplete.js';
import { Button } from './button.js';
export { Button } from './button.js';
import './percentage-d3aa3789.js';
export { Box } from './box.js';
export { Flex, FlexItem } from './flex.js';
export { Card } from './card.js';
export { Checkbox } from './checkbox.js';
export { ColorPicker } from './colorpicker.js';
export { ContextMenu } from './contextmenu.js';
export { Cover } from './cover.js';
import './css-animate-4c1feb1b.js';
import { C as CSSMotion } from './CSSMotion-cdce7961.js';
export { Mask } from './mask.js';
export { Modal } from './modal.js';
export { Confirm } from './confirm.js';
import { Editable } from './editable.js';
export { Editable } from './editable.js';
export { Crumbs } from './crumbs.js';
export { Drawer } from './drawer.js';
export { Divider } from './divider.js';
import './assert-console-9d788aa1.js';
export { ElegantEditor } from './eleganteditor.js';
export { ErrorBoundary } from './errorboundary.js';
import './object-has-5ccd463c.js';
export { Form } from './form.js';
export { Grid } from './grid.js';
export { a as useEnter, u as useGlobalKeyUp } from './useEnter-16e5d2b4.js';
export { Icon } from './icon.js';
export { a as IconDownload, b as IconImage, S as IconUpload } from './image-2de4c9b4.js';
export { S as IconInbox } from './inbox-1d5b5e62.js';
export { S as IconFile } from './file-f15f9b54.js';
export { I as InputFile } from './InputFile-350b4ab8.js';
export { InputNumber } from './inputnumber.js';
export { List } from './list.js';
export { Loading } from './loading.js';
export { Menu } from './menu.js';
import { LineBar } from './linebar.js';
export { PageTurn } from './pageturn.js';
export { P as ProgressBar } from './ProgressBar-f802d2a3.js';
export { getCommonProgressBar } from './progressbar.js';
export { Radio } from './radio.js';
export { Scrollor } from './scrollor.js';
import { h as hashCreator } from './Select-d6689e2a.js';
export { S as Select } from './Select-d6689e2a.js';
export { Tag } from './tag.js';
export { SelectHigh } from './selecthigh.js';
export { Slot, SlotProvider } from './slot.js';
export { Suffix } from './suffix.js';
import './CSSAnimation-14e8fd9b.js';
export { Switch } from './switch.js';
import { T as Tab, I as Item, P as Pane, C as Content } from './Tab-bd3a7df5.js';
export { a as Tabs } from './Tab-bd3a7df5.js';
export { Table } from './table.js';
export { Text } from './text.js';
export { toast } from './toast.js';
export { ToolBar } from './toolbar.js';
export { Tooltip } from './tooltip.js';
export { TreeMeta, TreeNode, TreeView } from './tree.js';
export { alert, confirm, prompt } from './utils.js';
import './Context-2b6bec3a.js';
export { ViewArea, ViewBox, ViewLink } from './viewbox.js';

var CommentEnter = /*#__PURE__*/function (_React$Component) {
  _inherits(CommentEnter, _React$Component);

  var _super = _createSuper(CommentEnter);

  function CommentEnter(props) {
    var _this;

    _classCallCheck(this, CommentEnter);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function () {
      _this.props.onSubmit(_this.state.value);
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (value) {
      _this.setState({
        value: value
      });

      if (_this.props.onChange) {
        _this.props.onChange(value);
      }
    });

    _this.state = {
      value: props.value
    };
    return _this;
  } // 提交


  _createClass(CommentEnter, [{
    key: "stat",
    // 输入字数统计
    value: function stat() {
      var isOk = this.state.diffSize > 0;
      var hasText = this.state.size > 0;
      return hasText ? isOk ? /*#__PURE__*/React__default.createElement("span", {
        className: "cmt-num"
      }, "\u8FD8\u53EF\u4EE5\u8F93\u5165", this.state.diffSize, "\u4E2A\u5B57") : /*#__PURE__*/React__default.createElement("span", {
        className: "cmt-red"
      }, "\u5DF2\u7ECF\u8D85\u51FA", Math.abs(this.state.diffSize), "\u4E2A\u5B57") : null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children,
          disabled = _this$props.disabled,
          maxLength = _this$props.maxLength,
          minLength = _this$props.minLength,
          placeholder = _this$props.placeholder,
          readonly = _this$props.readonly,
          size = _this$props.size,
          theme = _this$props.theme,
          value = _this$props.value;
      return /*#__PURE__*/React__default.createElement("div", {
        className: classnames('comment', className)
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "hd"
      }), /*#__PURE__*/React__default.createElement("div", {
        className: "bd"
      }, /*#__PURE__*/React__default.createElement(Editable, {
        disabled: disabled,
        maxLength: maxLength,
        minLength: minLength,
        onChange: this.onChange,
        placeholder: placeholder,
        readonly: readonly,
        size: size,
        theme: theme,
        value: value
      })), /*#__PURE__*/React__default.createElement("div", {
        className: "ft"
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "side"
      }, this.stat()), /*#__PURE__*/React__default.createElement("div", {
        className: "aside"
      }, /*#__PURE__*/React__default.createElement(Button, {
        onClick: this.onSubmit,
        theme: theme,
        size: size,
        disabled: disabled
      }, "\u53D1\u5E03"))), children);
    }
  }]);

  return CommentEnter;
}(React__default.Component);
CommentEnter.defaultProps = {
  maxLength: 500,
  minLength: 0,
  onChange: undefined,
  onSubmit: undefined,
  size: 'md'
};

if (window.DEV) {
  CommentEnter.propTypes = {
    onChange: propTypes.func,
    onSubmit: propTypes.func,
    size: Editable.propTypes.size
  };
}

var Comment = /*#__PURE__*/memo(function (props) {
  var inputElement = /*#__PURE__*/createElement('div', {});
  var submitElement = /*#__PURE__*/createElement('div', {});
  return /*#__PURE__*/createElement('div', {
    className: 'comment'
  }, inputElement, submitElement);
});
Comment.Enter = CommentEnter;
Comment.defaultProps = {};

if (window.DEV) {
  Comment.propTypes = {};
}

var Fade = function Fade(props) {
  var target = useRef();
  var children = props.children,
      className = props.className,
      display = props.display,
      onEnded = props.onEnded,
      visible = props.visible;
  var onlyChild = React__default.Children.only(children);
  return /*#__PURE__*/React__default.createElement(CSSMotion, {
    active: 'fade',
    offset: 'in',
    display: display,
    onStart: function onStart() {
      return true;
    },
    onEnded: onEnded,
    onRef: function onRef() {
      return target.current;
    },
    visible: visible
  }, /*#__PURE__*/React__default.cloneElement(onlyChild, {
    className: classnames(className, {
      non: !visible
    }),
    ref: target
  }));
};
Fade.defaultProps = {
  visible: false,
  display: true
};

if (window.DEV) {
  Fade.propTypes = {
    visible: propTypes.bool
  };
}

var Action = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      onClick = props.onClick,
      icon = props.icon,
      inb = props.inb;
  var value = children || icon;
  return /*#__PURE__*/React__default.createElement('div', _defineProperty({
    className: classnames('act', {
      inb: inb
    }, className),
    onClick: onClick,
    ref: ref
  }, typeof value != 'string' ? 'children' : 'dangerouslySetInnerHTML', typeof value != 'string' ? value : {
    __html: value
  }));
});
Action.defaultProps = {
  icon: '&#43;'
};

if (window.DEV) {
  Action.propTypes = {
    children: propTypes.any,
    icon: propTypes.any,
    inb: propTypes.bool,
    onClick: propTypes.bool
  };
}

var TabPane = /*#__PURE__*/React__default.memo(function () {
  return null;
});
TabPane.defaultProps = {};

if (window.DEV) {
  TabPane.propTypes = {
    className: propTypes.any,
    closable: propTypes.bool,
    closeIcon: propTypes.any,
    children: propTypes.any,
    content: propTypes.any,
    style: propTypes.object,
    title: propTypes.any
  };
}

var TabPlus = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(TabPlus, _React$PureComponent);

  var _super = _createSuper(TabPlus);

  _createClass(TabPlus, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (objectHasOwn(props, 'dir') && props.dir != state.priorDir) {
        return {
          appKey: hashCreator(15),
          priorDir: props.dir
        };
      }

      if (objectHasOwn(props, 'type') && props.type != state.priorType) {
        return {
          appKey: hashCreator(15),
          priorType: props.type
        };
      }

      if (objectHasOwn(props, 'centered') && props.centered != state.priorCentered) {
        return {
          appKey: hashCreator(15),
          priorCentered: props.centered
        };
      }

      if (objectHasOwn(props, 'index') && props.index != state.priorActive) {
        return {
          active: props.index,
          priorActive: props.index
        };
      }

      return state;
    }
  }]);

  function TabPlus(props) {
    var _this;

    _classCallCheck(this, TabPlus);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "onClick", function (active) {
      return function (e) {
        e.stopPropagation();

        _this.setState({
          active: active
        }, function () {
          objectHasOwn(_this.props, 'onChange') && _this.props.onChange(active);
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onRemove", function (index) {
      return function (e) {
        e.stopPropagation();
        var _this$state = _this.state,
            active = _this$state.active,
            panes = _this$state.panes;
        var newPanes = [].concat(panes);
        var newActive = active;
        newPanes.splice(index, 1);

        if (newPanes.length > 0) {
          var prev = index - 1;

          if (prev >= 0) {
            newActive = prev;
          } else {
            newActive = 0;
          }
        }

        _this.setState({
          active: newActive,
          panes: newPanes
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onEdit", function (e) {
      e.stopPropagation();
      var index = _this.state.panes.length;
      var onEdited = _this.props.onEdited;

      if (onEdited) {
        return onEdited(function (tabPane) {
          _this.addTab(tabPane, index);
        });
      }

      _this.addTab( /*#__PURE__*/React__default.createElement(TabPane, {
        title: 'new Tab ' + index,
        content: 'new content ' + index,
        closable: true
      }), index);
    });

    _defineProperty(_assertThisInitialized(_this), "addTab", function (child, index) {
      assert_1.nuil(child, 'tab type is not valid.');
      assert_1.truly(child.type === TabPane, 'Add Target must be a `TabPane`.');
      var newPanes = [].concat(_this.state.panes, child);

      _this.setState({
        panes: newPanes,
        active: index
      });
    });

    _this.state = {
      active: props.index,
      activeTab: void 0,
      appKey: hashCreator(12),
      panes: _this.getPanes(props.children),
      priorActive: void 0,
      priorDir: props.dir,
      priorType: props.type
    };
    return _this;
  }

  _createClass(TabPlus, [{
    key: "getPanes",
    value: function getPanes(children) {
      var panes = [];
      React__default.Children.forEach(children, function (child) {
        assert_1.nuil(child, 'Invalid child element.');
        assert_1.truly(child.type === TabPane, 'Only `TabPane` can be used in `TabPlus`.');
        panes.push(child);
      });
      return panes;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          centered = _this$props.centered,
          className = _this$props.className,
          dir = _this$props.dir,
          editable = _this$props.editable,
          extra = _this$props.extra,
          lazy = _this$props.lazy,
          style = _this$props.style,
          type = _this$props.type;
      var tabs = [];
      var items = [];
      var isLine = 'line' === type;
      var isCard = 'card' === type;
      var _this$state2 = this.state,
          active = _this$state2.active,
          activeTab = _this$state2.activeTab,
          appKey = _this$state2.appKey,
          panes = _this$state2.panes;
      panes.forEach(function (child, index) {
        var _child$props = child.props,
            children = _child$props.children,
            className = _child$props.className,
            closable = _child$props.closable,
            content = _child$props.content,
            closeIcon = _child$props.closeIcon,
            title = _child$props.title,
            style = _child$props.style;
        var itemKey = child.key || index;
        var isActived = active == index;
        tabs[index] = /*#__PURE__*/React__default.createElement(Tab, {
          className: classnames(className, {
            active: isActived,
            card: isCard
          }),
          key: itemKey,
          style: style,
          onClick: _this2.onClick(index),
          ref: function ref(inst) {
            if (isActived) {
              _this2.setState({
                activeTab: inst
              });
            }
          }
        }, title, closable ? /*#__PURE__*/React__default.createElement(Action, {
          onClick: _this2.onRemove(index),
          icon: '&#10005;',
          inb: true
        }, closeIcon) : null);
        var itemElement = /*#__PURE__*/React__default.createElement(Fade, {
          className: classnames({
            non: !isActived
          }),
          key: itemKey,
          visible: isActived
        }, /*#__PURE__*/React__default.createElement(Item, null, content || children));

        if (lazy || isActived) {
          items.push(itemElement);
        }
      });
      return /*#__PURE__*/React__default.createElement('div', {
        className: classnames('tabp', dir, className),
        key: appKey,
        style: style
      }, /*#__PURE__*/React__default.createElement(Pane, {
        adder: /*#__PURE__*/React__default.createElement(React__default.Fragment, {
          key: 'act'
        }, editable ? /*#__PURE__*/React__default.createElement('div', {
          className: 'adder',
          key: 'add',
          onClick: this.onEdit
        }, /*#__PURE__*/React__default.createElement(Action, {
          icon: '&#43;'
        })) : null),
        className: classnames({
          card: isCard
        }),
        extra: extra,
        isWrapper: true
      }, /*#__PURE__*/React__default.createElement('div', {
        className: classnames('action', {
          centered: centered
        })
      }, tabs, isLine ? /*#__PURE__*/React__default.createElement(LineBar, {
        dir: dir,
        target: activeTab
      }) : null)), /*#__PURE__*/React__default.createElement(Content, null, items));
    }
  }]);

  return TabPlus;
}(React__default.PureComponent);
TabPlus.defaultProps = {
  index: 0,
  dir: 'ttr',
  size: 'md',
  type: 'line'
};

if (window.DEV) {
  TabPlus.propTypes = {
    centered: propTypes.bool,
    dir: propTypes.oneOf(dirs),
    editable: propTypes.bool,
    index: propTypes.oneOfType([propTypes.string, propTypes.number]),
    lazy: propTypes.bool,
    onChange: propTypes.func,
    onEdited: propTypes.func,
    size: propTypes.oneOf(MQ_Breakpoints),
    type: propTypes.oneOf(['line', 'card'])
  };
}

export { Comment, TabPane, TabPlus };
