import { f as _slicedToArray } from './_rollupPluginBabelHelpers-cc1db274.js';
import React__default, { useRef, useState, useEffect } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { n as noop_1 } from './noop-469b0e21.js';
import ReactDOM from 'react-dom';
import { r as raf } from './raf-4503f6a0.js';
import { c as contains } from './dom-contains-5179471e.js';
import { g as getViewportWidth } from './dom-viewport-width-59a780a1.js';
import { g as getViewportHeight } from './dom-viewport-height-640d289b.js';

var Area = function Area(props) {
  var children = props.children,
      onContextMenu = props.onContextMenu;
  if (children == null) return null;
  React__default.Children.only(children);
  return /*#__PURE__*/React__default.cloneElement(children, {
    onContextMenu: onContextMenu
  });
};

Area.defaultProps = {
  children: null,
  onContextMenu: noop_1
};

if (window.DEV) {
  Area.propTypes = {
    children: propTypes.element.isRequired,
    onContextMenu: propTypes.func.isRequired
  };
}

var List = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var bgColor = props.bgColor,
      bdColor = props.bdColor,
      children = props.children,
      className = props.className,
      onClick = props.onClick,
      style = props.style,
      target = props.target,
      visible = props.visible,
      zIndex = props.zIndex;
  return /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React__default.createElement('div', {
    className: classnames('ctxm', className, {
      non: !visible
    }),
    style: Object.assign({
      border: '1px solid ' + bdColor,
      backgroundColor: bgColor,
      zIndex: zIndex
    }, style),
    ref: ref,
    children: children,
    onClick: onClick
  }), target);
});
List.defaultProps = {
  bgColor: void 0,
  bdColor: void 0,
  onClick: null,
  target: document.body,
  visible: false,
  zIndex: void 0
};

if (window.DEV) {
  List.propTypes = {
    bgColor: propTypes.string,
    bdColor: propTypes.string,
    onClick: propTypes.func,
    target: propTypes.instanceOf(HTMLElement),
    visible: propTypes.bool,
    zIndex: propTypes.number
  };
}

var ContextMenu = function ContextMenu(props) {
  var element = useRef();
  var position = useRef();
  var children = props.children,
      onOpen = props.onOpen,
      onClose = props.onClose,
      onSelect = props.onSelect,
      onTarget = props.onTarget;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      style = _useState4[0],
      setStyle = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      initialzed = _useState6[0],
      setInitialzed = _useState6[1];

  var onSelectWrapper = function onSelectWrapper(e) {
    e.stopPropagation();

    if (onSelect(e)) {
      setVisible(false);
    }
  };

  var onCloseWrapper = function onCloseWrapper(e) {
    if (contains(element.current, e.target)) {
      return;
    }

    setVisible(false);
  };

  var onOpenWrapper = function onOpenWrapper(e) {
    e.preventDefault();
    e.stopPropagation();
    position.current = {
      top: e.pageY,
      left: e.pageX
    };
    setVisible(true);
    onTarget(e);
    return false;
  };

  useEffect(function () {
    setInitialzed(true);
    window.addEventListener('resize', onCloseWrapper, false);
    document.body.addEventListener('contextmenu', onCloseWrapper, false);
    document.body.addEventListener('click', onCloseWrapper, false);
    return function () {
      window.removeEventListener('resize', onCloseWrapper, false);
      document.body.removeEventListener('contextmenu', onCloseWrapper, false);
      document.body.removeEventListener('click', onCloseWrapper, false);
    };
  }, []);
  useEffect(function () {
    if (!initialzed) return;

    if (visible) {
      return raf(function () {
        var vh = getViewportHeight();
        var vw = getViewportWidth();
        var maxH = vh;
        var maxW = vw;
        var rect = element.current.getBoundingClientRect();
        var page = position.current;
        var pos = {
          left: page.left
        };

        if (rect.height + page.top >= maxH) {
          pos.bottom = maxH - page.top;

          if (pos.bottom + rect.height >= maxH) {
            pos.bottom = null;
            pos.top = 0;
          }
        } else {
          pos.top = page.top;
        }

        if (rect.width + page.left >= maxH) {
          pos.left = maxH - page.left;
        }

        if (rect.height > maxH) {
          pos.height = maxH;
        }

        if (rect.width > maxW) {
          pos.width = maxW;
        }

        setStyle(pos);
        onOpen();
      });
    }

    onClose();
  }, [visible]);
  return React__default.Children.map(children, function (Item) {
    if (Item == null) {
      return Item;
    }

    switch (Item.type) {
      case List:
        return /*#__PURE__*/React__default.cloneElement(Item, {
          key: 'list',
          onClick: onSelectWrapper,
          ref: element,
          style: style,
          visible: visible
        });

      case Area:
        return /*#__PURE__*/React__default.cloneElement(Item, {
          key: 'area',
          onContextMenu: onOpenWrapper
        });

      default:
        return Item;
    }
  });
};

ContextMenu.Area = Area;
ContextMenu.List = List;
ContextMenu.defaultProps = {
  onClose: noop_1,
  onOpen: noop_1,
  onSelect: function onSelect() {
    return true;
  },
  onTarget: noop_1
};

if (window.DEV) {
  ContextMenu.propTypes = {
    onClose: propTypes.func,
    onOpen: propTypes.func,
    onSelect: propTypes.func.isRequired,
    onTarget: propTypes.func
  };
}

export { ContextMenu };
