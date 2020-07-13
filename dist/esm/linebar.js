import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { d as dirs } from './dependency-8ea69cb4.js';

var getParentRect = function getParentRect(target) {
  var elem;

  try {
    elem = target.offsetParent;
    if (elem == null) throw new Error('');
  } catch (error) {
    elem = target.parentElement;
  }

  return elem.getBoundingClientRect();
};

var LineBar = /*#__PURE__*/React__default.memo( /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var className = props.className,
      color = props.color,
      dir = props.dir,
      relative = props.relative,
      size = props.size,
      style = props.style,
      target = props.target;
  if (!target) return null;
  var rect = target.getBoundingClientRect();
  var rectP = getParentRect(target);
  var styled = {
    backgroundColor: color
  };

  switch (dir) {
    case 'rtt':
    case 'ttr':
      styled.height = size;
      styled.left = rect.left - rectP.left;
      styled.width = rect.width;
      break;

    case 'ltr':
    case 'rtl':
      styled.height = rect.height;
      styled.top = rect.top - rectP.top;
      styled.width = size;
      break;
  }

  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames('lbar', className, dir, {
      abs: !relative,
      rel: relative
    }),
    ref: ref,
    style: Object.assign(styled, style)
  });
}));
LineBar.defaultProps = {
  dir: 'ttr'
};

if (window.DEV) {
  LineBar.propTypes = {
    color: propTypes.string,
    dir: propTypes.oneOf(dirs),
    mode: propTypes.oneOf(['horizontal', 'vertical']),
    relative: propTypes.bool,
    space: propTypes.number,
    size: propTypes.oneOfType([propTypes.string, propTypes.number]),
    target: propTypes.instanceOf(HTMLElement)
  };
}

export { LineBar };
