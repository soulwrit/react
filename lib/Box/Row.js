import { Children, cloneElement, createElement, forwardRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import assert from '@writ/utils/assert';
import { CSSUtil, dirs } from '../../dependency';
import { Col } from './Col';
export { Row };
const Row = forwardRef((props, ref) => {
    const { className, children, cols, dir, gutter, style, } = props;
    const childArray = Children.toArray(children);
    const space = gutter / 2;

    return createElement('div', {
        className: classnames(CSSUtil.row, dir, className),
        children: childArray.map(Item => {
            assert.nuil(Item, 'Invalid element of `Row`.');
            assert.truly(Item.type === Col, 'Only `Col` can be used in `Row`.');
            return cloneElement(Item, {
                cols,
                gutter: space,
            });
        }),
        ref,
        style,
    });
});
Row.defaultProps = {
    cols: 12,
    gutter: 16,
};
if (window.DEV) {
    Row.propTypes = {
        className: PropTypes.string,
        cols: PropTypes.number,// 列总数  
        dir: PropTypes.oneOf(dirs), // 列的方向
        gutter: PropTypes.number, // 列间距
    };
}