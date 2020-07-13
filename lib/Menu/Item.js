import '@writ/scss/components/menu.scss';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { FlexItem } from '../Flex/Item';

export const MenuItem = React.memo(React.forwardRef((
    { active, activeClassName, children, className, disabled, onClick, style, ...rest }, ref
) => {
    return React.createElement(FlexItem, {
        className: classnames(className, {
            [activeClassName]: active,
            active: activeClassName ? false : active,
            disabled
        }),
        onClick: disabled ? null : onClick,
        ref,
        ...rest
    }, children);
}));

MenuItem.defaultProps = {
    disabled: false,
}

if (window.DEV) {
    MenuItem.propTypes = {
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
    };
}