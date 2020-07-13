import '@writ/scss/components/flex.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
export { FlexItem };

const FlexItem = React.forwardRef((props, ref) => {
    const {
        alignSelf, basis,
        children, className, type, flex, grow,
        height, order, shrink, span, style, width,
        ...rest
    } = props;

    return React.createElement(type, {
        className: classnames('i', className),
        ref,
        ...rest,
        style: Object.assign({
            alignSelf: alignSelf,
            flex: `${flex || span}`,
            flexBasis: basis,
            flexGrow: grow,
            flexShrink: shrink,
            order: order,
            width, height,
        }, style),
    }, children);
})

FlexItem.defaultProps = {
    type: 'div',
};

if (window.DEV) {
    FlexItem.propTypes = {
        // align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。
        // 默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
        alignSelf: PropTypes.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
        // flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。
        // 浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小
        basis: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
        // 类名
        className: PropTypes.string,
        // flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
        flex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        // flex 项目的高度
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        // flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
        grow: PropTypes.number,
        // order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
        order: PropTypes.number,
        // flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
        shrink: PropTypes.number,
        // flex 的别称
        span: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        // 元素类型
        type: PropTypes.string,
        // flex 项目的宽度
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    };
}