export { version } from './_config.js';
import { _ as _defineProperty, a as _inherits, b as _createSuper, c as _createClass, d as _classCallCheck, e as _assertThisInitialized } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default, { useRef } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { d as dirs, M as MQ_Breakpoints } from './dependency-8ea69cb4.js';
import './HoldImage-a3d534a8.js';
export { Avatar } from './avatar.js';
export { Accordion } from './accordion.js';
import './noop-469b0e21.js';
import { o as objectHasOwn } from './object-has-own-6b83c90b.js';
import './Model-6a5cfb7c.js';
export { Input } from './input.js';
export { Pager } from './pager.js';
import 'react-dom';
import { a as assert_1 } from './assert-cc694573.js';
import './raf-4503f6a0.js';
import './dom-contains-5179471e.js';
import './Trigger-84efcddb.js';
export { Dropdown } from './dropdown.js';
import './dom-viewport-height-640d289b.js';
export { AutoComplete } from './autocomplete.js';
export { Button } from './button.js';
import './percentage-d3aa3789.js';
export { Box } from './box.js';
export { Flex } from './flex.js';
export { Card } from './card.js';
export { Checkbox } from './checkbox.js';
export { ColorPicker } from './colorpicker.js';
export { ContextMenu } from './contextmenu.js';
export { Cover } from './cover.js';
export { Crumbs } from './crumbs.js';
import './css-animate-93e47d39.js';
import { C as CSSMotion } from './CSSMotion-f1b5afe8.js';
export { Mask } from './mask.js';
export { Drawer } from './drawer.js';
export { Divider } from './divider.js';
export { Editable } from './editable.js';
import './assert-console-9d788aa1.js';
export { ElegantEditor } from './eleganteditor.js';
export { ErrorBoundary } from './errorboundary.js';
export { Form } from './form.js';
export { Grid } from './grid.js';
export { Icon } from './icon.js';
export { a as IconDownload, b as IconImage, S as IconUpload } from './image-2de4c9b4.js';
export { S as IconInbox } from './inbox-1d5b5e62.js';
export { S as IconFile } from './file-f15f9b54.js';
export { I as InputFile } from './InputFile-78b9b345.js';
export { InputNumber } from './inputnumber.js';
export { List } from './list.js';
export { Loading } from './loading.js';
export { Menu } from './menu.js';
import { LineBar } from './linebar.js';
export { Modal } from './modal.js';
export { PageTurn } from './pageturn.js';
export { ProgressBar } from './progressbar.js';
export { Radio } from './radio.js';
export { Scrollor } from './scrollor.js';
import { h as hashCreator } from './Select-f896d719.js';
export { S as Select } from './Select-f896d719.js';
export { Tag } from './tag.js';
export { SelectHigh } from './selecthigh.js';
export { Suffix } from './suffix.js';
export { Switch } from './switch.js';
import { T as Tab, I as Item, P as Pane, C as Content } from './Tab-a93c1e9d.js';
export { a as Tabs } from './Tab-a93c1e9d.js';
export { Table } from './table.js';
export { Text } from './text.js';
export { toast } from './toast.js';
export { ToolBar } from './toolbar.js';
export { Tooltip } from './tooltip.js';
export { TreeNode, TreeView } from './tree.js';
export { alert, confirm, prompt } from './utils.js';
import './Context-859f32e3.js';
export { ViewArea, ViewBox, ViewLink } from './viewbox.js';

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
            key = _child$props.key,
            title = _child$props.title,
            style = _child$props.style;
        var itemKey = key || index;
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

export { TabPane, TabPlus };
