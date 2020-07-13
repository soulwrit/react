import React__default from 'react';
import { p as propTypes } from './index-c0558b2a.js';

/**
 * 
 * @param {number} start 
 * @param {number} end 
 * @param {function} iterater 
 */

function forTo(start, end, iterater) {
  var map = [];

  for (var i = start, index = 0; i < end; ++i, index = i - start) {
    map.push(iterater(i, index, map));
  }

  return map;
}

var forTo_1 = forTo;

function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v, g = t, b = p;
      break;

    case 1:
      r = q, g = v, b = p;
      break;

    case 2:
      r = p, g = v, b = t;
      break;

    case 3:
      r = p, g = q, b = v;
      break;

    case 4:
      r = t, g = p, b = v;
      break;

    case 5:
      r = v, g = p, b = q;
      break;
  }

  var hr = Math.floor(r * 255).toString(16);
  var hg = Math.floor(g * 255).toString(16);
  var hb = Math.floor(b * 255).toString(16);
  return '#' + (hr.length < 2 ? '0' : '') + hr + (hg.length < 2 ? '0' : '') + hg + (hb.length < 2 ? '0' : '') + hb;
}

var hsv2rgb = HSVtoRGB;

var ColorPicker = function ColorPicker(props) {
  var className = props.className,
      cellStyle = props.cellStyle,
      dref = props.dref,
      height = props.height,
      onSelect = props.onSelect,
      padding = props.padding,
      spacing = props.spacing,
      style = props.style,
      _native = props["native"],
      width = props.width;
  return _native ? /*#__PURE__*/React__default.createElement('input', {
    className: className,
    onChange: function onChange(e) {
      onSelect && onSelect(e.target.value);
    },
    style: style,
    ref: dref,
    type: 'color'
  }) : /*#__PURE__*/React__default.createElement('table', {
    cellPadding: padding,
    cellSpacing: spacing,
    className: className,
    children: /*#__PURE__*/React__default.createElement('tbody', {
      children: forTo_1(1, 15, function (row) {
        return /*#__PURE__*/React__default.createElement('tr', {
          key: row,
          children: forTo_1(0, 25, function (col) {
            var color;

            if (col == 24) {
              var gray = Math.floor(255 / 13 * (14 - row)).toString(16);
              var hexg = (gray.length < 2 ? '0' : '') + gray;
              color = '#' + hexg + hexg + hexg;
            } else {
              var hue = col / 24;
              var saturation = row <= 8 ? row / 8 : 1;
              var value = row > 8 ? (16 - row) / 8 : 1;
              color = hsv2rgb(hue, saturation, value);
            }

            return /*#__PURE__*/React__default.createElement('td', {
              key: col,
              onClick: function onClick(e) {
                e.stopPropagation();

                if (e.nativeEvent) {
                  e.nativeEvent.stopImmediatePropagation();
                }

                onSelect && onSelect(color);
              },
              style: Object.assign({
                width: width,
                height: height,
                backgroundColor: color,
                cursor: 'crosshair'
              }, cellStyle),
              title: color,
              unselectable: 'on'
            });
          })
        });
      })
    }),
    ref: dref,
    style: Object.assign({
      border: '1px solid #eee'
    }, style),
    unselectable: 'on'
  });
};

ColorPicker.defaultProps = {
  width: 12,
  height: 12,
  padding: 0,
  spacing: 0
};

if (window.DEV) {
  var nsType = propTypes.oneOfType([propTypes.number, propTypes.string]);
  ColorPicker.propTypes = {
    dref: propTypes.func,
    onSelect: propTypes.func.isRequired,
    width: nsType,
    height: nsType,
    padding: propTypes.number,
    spacing: propTypes.number,
    cellStyle: propTypes.object,
    "native": propTypes.bool
  };
}

export { ColorPicker };
