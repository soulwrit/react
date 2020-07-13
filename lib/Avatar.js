import '@writ/scss/components/avatar.scss';
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { MQ_Breakpoints, CSSUtil } from '../dependency';
import holdImage from './Common/HoldImage';
export { Avatar };

const Avatar = props => {
    const { className, dref, height, onError, onClick, radius, size, src, style, width, } = props;
    const [imgSrc, setImgSrc] = useState(src);
    const srcIsReactElement = React.isValidElement(src);
    const nextProps = {
        className: classnames(CSSUtil.avatar, CSSUtil.join(CSSUtil.avatar, size), className),
        onClick,
        ref: dref,
        style: Object.assign({
            borderRadius: radius,
            width,
            height,
        }, style),
    };

    if (srcIsReactElement === false) {
        useEffect(() => {
            if (imgSrc === holdImage || imgSrc == null) {
                return;
            }
            const image = new Image();

            image.onload = () => {
                setImgSrc(imgSrc);
                image.onerror = image.onload = null;
            };
            image.onerror = () => {
                setImgSrc(holdImage);
                onError && onError(new Error('Avatar Not Found.'));
            };
            image.src = imgSrc;
        }, [imgSrc]);
        nextProps.style.backgroundImage = `url(${imgSrc})`;
    } else {
        nextProps.children = src;
    }

    return React.createElement('div', nextProps);
};

Avatar.defaultProps = {
    size: 'md',
};

if (window.DEV) {
    const TYPE_NS = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
    Avatar.propTypes = {
        dref: PropTypes.func,
        height: TYPE_NS,
        onError: PropTypes.func,
        radius: TYPE_NS,
        size: PropTypes.oneOf(['1x', '2x'].concat(MQ_Breakpoints)),
        src: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        width: TYPE_NS,
    };
}