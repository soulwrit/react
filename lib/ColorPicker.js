import React from 'react';
import PropTypes from 'prop-types';
import forTo from '@writ/utils/for-to';
import hsv2rgb from '@writ/utils/hsv2rgb';
export { ColorPicker };

const ColorPicker = props => {
    const { className, cellStyle, dref, height, onSelect, padding, spacing, style, native, width, } = props;

    return native ? React.createElement('input', {
        className: className,
        onChange(e) {
            onSelect && onSelect(e.target.value);
        },
        style,
        ref: dref,
        type: 'color',
    }) : React.createElement('table', {
        cellPadding: padding,
        cellSpacing: spacing,
        className: className,
        children: React.createElement('tbody', {
            children: forTo(1, 15, row => React.createElement('tr', {
                key: row,
                children: forTo(0, 25, col => {
                    let color;
                    if (col == 24) {
                        let gray = Math.floor(255 / 13 * (14 - row)).toString(16);
                        let hexg = (gray.length < 2 ? '0' : '') + gray;
                        color = '#' + hexg + hexg + hexg;
                    } else {
                        let hue = col / 24;
                        let saturation = row <= 8 ? row / 8 : 1;
                        let value = row > 8 ? (16 - row) / 8 : 1;
                        color = hsv2rgb(hue, saturation, value);
                    }
                    return React.createElement('td', {
                        key: col,
                        onClick: e => {
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
                        unselectable: 'on',
                    });
                })
            }))
        }),
        ref: dref,
        style: Object.assign({ border: '1px solid #eee' }, style),
        unselectable: 'on',
    });
};

ColorPicker.defaultProps = {
    width: 12,
    height: 12,
    padding: 0,
    spacing: 0
};

if (window.DEV) {
    const nsType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
    ColorPicker.propTypes = {
        dref: PropTypes.func,
        onSelect: PropTypes.func.isRequired,
        width: nsType,
        height: nsType,
        padding: PropTypes.number,
        spacing: PropTypes.number,
        cellStyle: PropTypes.object,
        native: PropTypes.bool
    };
}