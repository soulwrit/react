import { f as _slicedToArray, _ as _defineProperty, g as _objectWithoutProperties } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default, { useRef, useState, useEffect } from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import ReactDOM from 'react-dom';
import { c as contains } from './dom-contains-5179471e.js';

var ContextMenu = function ContextMenu(props) {
  var element = useRef();
  var children = props.children,
      onOpen = props.onOpen,
      onClose = props.onClose,
      onSelect = props.onSelect;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      position = _useState2[0],
      setPosition = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isInit = _useState4[0],
      setIsInit = _useState4[1];

  var handleSelect = function handleSelect(e) {
    e.stopPropagation();

    if (onSelect(e)) {
      setPosition(null);
    }
  };

  var handleHide = function handleHide(e) {
    if (contains(element.current, e.target)) {
      return;
    }

    setPosition(null);
  };

  var handleShow = function handleShow(e) {
    e.preventDefault();
    e.stopPropagation();
    setPosition({
      top: e.pageY,
      left: e.pageX
    });
    return false;
  };

  useEffect(function () {
    setIsInit(true);
    document.body.addEventListener('click', handleHide, false);
    return function () {
      document.body.removeEventListener('click', handleHide);
    };
  }, []);
  useEffect(function () {
    position ? onOpen && onOpen() : isInit && onClose && onClose();
  }, [position]);
  return React__default.Children.map(children, function (Item) {
    if (!Item) {
      return Item;
    }

    switch (Item.type) {
      case List:
        return /*#__PURE__*/React__default.cloneElement(Item, {
          key: 'list',
          style: position,
          onClick: handleSelect,
          visible: !!position,
          ref: element
        });

      case Area:
        return /*#__PURE__*/React__default.cloneElement(Item, {
          key: 'area',
          onContextMenu: handleShow,
          children: Item.props.children
        });

      default:
        return Item;
    }
  });
};

var List = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var _Object$assign;

  var bgColor = props.bgColor,
      bdColor = props.bdColor,
      children = props.children,
      className = props.className,
      maxHeight = props.maxHeight,
      maxWidth = props.maxWidth,
      onClick = props.onClick,
      style = props.style,
      zIndex = props.zIndex,
      target = props.target,
      visible = props.visible;
  return /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React__default.createElement('div', {
    className: className,
    style: Object.assign((_Object$assign = {
      maxHeight: maxHeight,
      maxWidth: maxWidth,
      overflow: 'auto',
      position: 'fixed'
    }, _defineProperty(_Object$assign, "overflow", 'auto'), _defineProperty(_Object$assign, "display", 'none'), _defineProperty(_Object$assign, "padding", '10px'), _defineProperty(_Object$assign, "zIndex", zIndex), _defineProperty(_Object$assign, "border", '1px solid ' + bdColor), _defineProperty(_Object$assign, "backgroundColor", bgColor), _defineProperty(_Object$assign, "display", visible ? 'block' : 'none'), _Object$assign), style),
    ref: ref,
    children: children,
    onClick: onClick
  }), target);
});

var Area = function Area(props) {
  var children = props.children,
      onContextMenu = props.onContextMenu,
      rest = _objectWithoutProperties(props, ["children", "onContextMenu"]);

  var trigger = React__default.Children.only(children);
  return /*#__PURE__*/React__default.cloneElement(trigger, Object.assign({
    onContextMenu: onContextMenu
  }, rest));
};

ContextMenu.Area = Area;
ContextMenu.List = List;
ContextMenu.defaultProps = {
  onSelect: function onSelect() {}
};
List.defaultProps = {
  bgColor: '#fff',
  bdColor: '#eee',
  maxHeight: screen.height - 50,
  maxWidth: screen.width - 50,
  target: document.body,
  zIndex: 999999
};

if (window.DEV) {
  ContextMenu.propTypes = {
    onClose: propTypes.func,
    onOpen: propTypes.func,
    onSelect: propTypes.func.isRequired
  };
  List.propTypes = {
    bgColor: propTypes.string,
    bdColor: propTypes.string,
    maxHeight: propTypes.oneOfType([propTypes.string, propTypes.number]),
    maxWidth: propTypes.oneOfType([propTypes.string, propTypes.number]),
    onClick: propTypes.func,
    target: propTypes.instanceOf(HTMLElement),
    zIndex: propTypes.number,
    visible: propTypes.bool
  };
}

export { ContextMenu };
