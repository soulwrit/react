import { createElement, forwardRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import percentage from '@writ/utils/percentage';
import { CSSUtil } from '../../dependency';
export { Col };
const Col = forwardRef((props, ref) => {
    const { children, className, cols, gutter, move, span, style } = props;
    const styled = Object.assign({}, style);
    const isDefaultCols = cols === Col.defaultProps.cols;

    if (!isDefaultCols) {
        styled.width = percentage(span / cols);
    }

    if (gutter > 0) {
        styled.padding = gutter;
    }

    if (move) styled.marginLeft = percentage(move / cols);

    return createElement('div', {
        children,
        className: classnames(CSSUtil.col, isDefaultCols ? CSSUtil.join(CSSUtil.col, span) : void 0, className),
        ref,
        style: styled
    });
});
Col.defaultProps = {
    className: void 0,
    span: 1,
    move: 0,
    cols: 12
};
if (window.DEV) {
    Col.propTypes = {
        className: PropTypes.string,
        cols: PropTypes.number, // 列总数
        move: PropTypes.number, // 偏移量
        span: PropTypes.number, // 列占比
    };
}