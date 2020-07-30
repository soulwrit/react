import { createElement } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import noop from '@writ/utils/noop';
export const TreeMeta = props => {
    const {
        active, children, className, disabled,
        onClick, onMouseEnter, onMouseLeave,
        selected, style, ...ref
    } = props;

    return createElement('div', {
        className: classnames('view', className, {
            [active]: selected
        }),
        onClick: disabled ? null : onClick,
        onMouseEnter: disabled ? null : onMouseEnter,
        onMouseLeave: disabled ? null : onMouseLeave,
        style,
        ...ref
    }, children);
}
TreeMeta.defaultProps = {
    active: void 0,
    className: void 0,
    disabled: false,
    onClick: noop,
    onMouseEnter: void 0,
    onMouseLeave: void 0,
    selected: false,
    style: null
}
if (window.DEV) {
    TreeMeta.propTypes = {
        active: PropTypes.string,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        selected: PropTypes.bool,
        style: PropTypes.object,
    };
}