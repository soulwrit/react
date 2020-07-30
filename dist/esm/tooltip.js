import { g as _objectWithoutProperties } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil, M as MQ_Breakpoints, t as theme } from './dependency-8ea69cb4.js';
import { a as assert_1 } from './assert-cc694573.js';
import './object-has-own-6b83c90b.js';
import ReactDOM from 'react-dom';
import './raf-4503f6a0.js';
import './dom-contains-5179471e.js';
import { T as Trigger } from './Trigger-15f31aa8.js';
import { g as getZIndex } from './zIndex-bd9d5e3e.js';

var RefBox = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var type = props.type,
      children = props.children,
      bindEvent = props.bindEvent,
      rest = _objectWithoutProperties(props, ["type", "children", "bindEvent"]);

  var nextProps = Object.assign({}, rest, {
    ref: ref
  });

  try {
    React__default.Children.only(children);
    bindEvent(children.props, nextProps);
    return /*#__PURE__*/React__default.cloneElement(children, nextProps);
  } catch (error) {
    assert_1["throw"](error.message);
    bindEvent({}, nextProps);
    return /*#__PURE__*/React__default.createElement(type, nextProps, children);
  }
});
RefBox.defaultProps = {
  type: 'span',
  bindEvent: function bindEvent() {}
};

if (window.DEV) {
  RefBox.propTypes = {
    type: propTypes.string,
    bindEvent: propTypes.func
  };
}

var placements = {
  topLeft: function calcTopLeft(rRect, cRect, space) {
    return {
      top: rRect.top - cRect.height - space,
      left: rRect.left
    };
  },
  top: function calcTop(rRect, cRect, space) {
    var widthDifference = (cRect.width - rRect.width) / 2;
    return {
      top: rRect.top - (cRect.height + space),
      left: rRect.left + (widthDifference > 0 ? -widthDifference : widthDifference)
    };
  },
  topRight: function calcTopRight(rRect, cRect, space) {
    var widthDifference = cRect.width - rRect.width;
    return {
      top: rRect.top - cRect.height - space,
      left: rRect.left + (widthDifference > 0 ? -widthDifference : widthDifference)
    };
  },
  rightTop: function calcRightTop(rRect, cRect, space) {
    return {
      top: rRect.top,
      left: rRect.right + space
    };
  },
  right: function calcRight(rRect, cRect, space) {
    var heightDifference = cRect.height - rRect.height;
    return {
      top: rRect.top + (heightDifference > 0 ? -heightDifference : heightDifference) / 2,
      left: rRect.right + space
    };
  },
  rightBottom: function calcRightBottom(rRect, cRect, space) {
    var heightDifference = cRect.height - rRect.height;
    return {
      top: rRect.top + (heightDifference > 0 ? -heightDifference : heightDifference),
      left: rRect.right + space
    };
  },
  bottomLeft: function calcBottomLeft(rRect, cRect, space) {
    return {
      top: rRect.bottom + space,
      left: rRect.left
    };
  },
  bottom: function calcBottom(rRect, cRect, space) {
    var widthDifference = (cRect.width - rRect.width) / 2;
    return {
      top: rRect.bottom + space,
      left: rRect.left + (widthDifference > 0 ? -widthDifference : widthDifference)
    };
  },
  bottomRight: function calcBottomRight(rRect, cRect, space) {
    var widthDifference = cRect.width - rRect.width;
    return {
      top: rRect.bottom + space,
      left: rRect.left + (widthDifference > 0 ? -widthDifference : widthDifference)
    };
  },
  leftTop: function calcLeftTop(rRect, cRect, space) {
    return {
      top: rRect.top,
      left: rRect.left - cRect.width - space
    };
  },
  left: function calcLeft(rRect, cRect, space) {
    var heightDifference = cRect.height - rRect.height;
    return {
      top: rRect.top + (heightDifference > 0 ? -heightDifference : heightDifference) / 2,
      left: rRect.left - cRect.width - space
    };
  },
  leftBottom: function calcLeftBottom(rRect, cRect, space) {
    var heightDifference = cRect.height - rRect.height;
    return {
      top: rRect.top + (heightDifference > 0 ? -heightDifference : heightDifference),
      left: rRect.left - cRect.width - space
    };
  }
};
function getCoord(placement) {
  var space = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  return function (pointRect, layerRect) {
    return placements[placement](pointRect, layerRect, space);
  };
}

function Tooltip(props) {
  var calc = props.calc,
      children = props.children,
      className = props.className,
      hoverable = props.hoverable,
      placement = props.placement,
      space = props.space,
      style = props.style,
      size = props.size,
      title = props.title,
      theme = props.theme,
      closeOnEsc = props.closeOnEsc,
      closeOnOutsideClick = props.closeOnOutsideClick,
      container = props.container,
      disabled = props.disabled,
      escape = props.escape,
      onClose = props.onClose,
      onKeyUp = props.onKeyUp,
      onOpen = props.onOpen,
      onResize = props.onResize,
      resetOnTopResize = props.resetOnTopResize,
      visible = props.visible;
  var calcCoord = calc || getCoord(placement, space);
  return /*#__PURE__*/React__default.createElement(Trigger, {
    closeOnEsc: closeOnEsc,
    closeOnOutsideClick: closeOnOutsideClick,
    disabled: disabled,
    escape: escape,
    onClose: onClose,
    onKeyUp: onKeyUp,
    onOpen: onOpen,
    onResize: onResize,
    resetOnTopResize: resetOnTopResize,
    calcCoord: calcCoord,
    visible: visible
  }, function (action) {
    var bindEvent = function bindEvent(props, nextProps) {
      if (hoverable) {
        nextProps.onMouseEnter = props.onMouseEnter ? function (e) {
          if (props.onMouseEnter(e)) {
            return;
          }

          action.open(e);
        } : action.open;
        nextProps.onMouseLeave = props.onMouseLeave ? function (e) {
          if (props.onMouseLeave(e)) {
            return;
          }

          action.close(e);
        } : action.close;
      } else {
        nextProps.onClick = props.onClick ? function (e) {
          if (props.onClick(e)) {
            return;
          }

          action.open(e);
        } : action.open;
      }

      return props;
    };

    return [/*#__PURE__*/React__default.createElement(RefBox, {
      bindEvent: bindEvent,
      children: children,
      key: 0,
      ref: action.trigger
    }), action.visible ? /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React__default.createElement('div', {
      className: classnames(CSSUtil.tooltips, size, theme, placement, className),
      ref: action.layer,
      style: Object.assign({
        zIndex: getZIndex()
      }, action.coord, style)
    }, /*#__PURE__*/React__default.createElement('div', {
      className: 'arrow'
    }), /*#__PURE__*/React__default.createElement('div', {
      className: 'inner',
      children: typeof title === 'function' ? title(action) : title
    })), container) : null];
  });
}
Tooltip.defaultProps = {
  container: document.body,
  size: 'md',
  theme: 'dark',
  placement: 'top',
  title: 'tooltip title!',
  hoverable: true,
  space: 15
};

if (window.DEV) {
  Tooltip.propTypes = {
    children: propTypes.any.isRequired,
    hoverable: propTypes.bool,
    onClick: propTypes.func,
    size: propTypes.oneOf(MQ_Breakpoints),
    style: propTypes.object,
    title: propTypes.any,
    theme: propTypes.oneOf(theme),
    visible: propTypes.bool
  };
}

export { Tooltip };
