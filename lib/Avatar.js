import '@writ/scss/components/avatar.scss';
import { createElement, forwardRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { MQ_Breakpoints, CSSUtil } from '../dependency';
import holdImage from './Common/HoldImage';
import { useImage } from './Avatar/useImage';
export { Avatar };
const Avatar = forwardRef((props, ref) => {
    const {
        alt, className, draggable, defaultSrc, errorSrc,
        height, icon, onError, onClick,
        radius, scale, size, src, srcSet, style, width,
    } = props;
    const [imgSrc] = useImage(src, defaultSrc, errorSrc, onError);
    const nextProps = {
        className: classnames(CSSUtil.avatar, CSSUtil.join(CSSUtil.avatar, size), { scale }, className),
        onClick,
        ref,
        style: Object.assign({
            borderRadius: radius,
            width,
            height,
        }, style),
    };
    let children;

    if (icon != null) {
        children = icon;
    } else if (srcSet != null) {
        children = createElement('img', {
            alt,
            draggable,
            src: imgSrc,
            srcSet,
        });
    } else {
        children = props.children;
    }

    if (children != null) {
        return createElement('div', nextProps, children);
    }

    nextProps.style.backgroundImage = `url(${imgSrc})`;
    return createElement('div', nextProps);
});

Avatar.defaultProps = {
    draggable: false,
    defaultSrc: holdImage,
    children: void 0,
    errorSrc: void 0,
    size: 'md',
    scale: true
};

if (window.DEV) {
    const TYPE_NS = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
    Avatar.propTypes = {
        defaultSrc: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.string,
        errorSrc: PropTypes.string,
        height: TYPE_NS,
        icon: PropTypes.node,
        onClick: PropTypes.func,
        onError: PropTypes.func,
        radius: TYPE_NS,
        scale: PropTypes.bool,
        size: PropTypes.oneOf(['1x', '2x'].concat(MQ_Breakpoints)),
        src: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        style: PropTypes.object,
        width: TYPE_NS,
    };
}