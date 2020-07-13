import '@writ/scss/components/action.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
export const Action = React.forwardRef((props, ref) => {
    const { children, className, onClick, icon, inb } = props;
    const value = children || icon;

    return React.createElement('div', {
        className: classnames('act', {
            inb
        }, className),
        onClick,
        ref,
        [typeof value != 'string' ? 'children' : 'dangerouslySetInnerHTML']:
            typeof value != 'string' ? value : { __html: value }
    });
});

Action.defaultProps = {
    icon: '&#43;',
};

if (window.DEV) {
    Action.propTypes = {
        children: PropTypes.any,
        icon: PropTypes.any,
        inb: PropTypes.bool,
        onClick: PropTypes.bool,
    };
}
