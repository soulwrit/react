import '@writ/scss/components/lineBar.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { dirs } from '../dependency'; 
const getParentRect = target => {
    var elem;
    try {
        elem = target.offsetParent;
        if (elem == null) throw new Error('');
    } catch (error) {
        elem = target.parentElement;
    }
    return elem.getBoundingClientRect();
}
export const LineBar = React.memo(React.forwardRef((props, ref) => {
    const { className, color, dir, relative, size, style, target } = props;

    if (!target) return null;
 
    const rect = target.getBoundingClientRect();
    const rectP = getParentRect(target);
    const styled = {
        backgroundColor: color,
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
        default: break;
    }

    return React.createElement('div', {
        className: classnames('lbar', className, dir, {
            abs: !relative,
            rel: relative,
        }),
        ref,
        style: Object.assign(styled, style)
    });
}));

LineBar.defaultProps = {
    dir: 'ttr',
};
if (window.DEV) {
    LineBar.propTypes = {
        color: PropTypes.string,
        dir: PropTypes.oneOf(dirs),
        mode: PropTypes.oneOf(['horizontal', 'vertical']),
        relative: PropTypes.bool,
        space: PropTypes.number,
        size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        target: PropTypes.instanceOf(HTMLElement),
    };
}