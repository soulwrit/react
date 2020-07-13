import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const CssFloat = props => {
    const { children, className, dir, ...rest } = props; 

    return children == null
        ? null
        : React.isValidElement(children)
            ? React.cloneElement(children, {
                className: classnames(dir, children.props.className, className),
                ...rest,
            })
            : React.createElement('span', {
                className: classnames(dir, className),
            }, children);
}

CssFloat.defaultProps = {
    dir: 'fl'
}

if (window.DEV) {
    CssFloat.propTypes = {
        dir: PropTypes.oneOf(['fl', 'fr'])
    };
}