import React from 'react';
import PropTypes from 'prop-types';
import noop from '@writ/utils/noop';
export { Area };
const Area = props => {
    const { children, onContextMenu } = props;
    if (children == null) return null;

    React.Children.only(children);

    return React.cloneElement(children, { onContextMenu });
}
Area.defaultProps = {
    children: null,
    onContextMenu: noop,
};
if (window.DEV) {
    Area.propTypes = {
        children: PropTypes.element.isRequired,
        onContextMenu: PropTypes.func.isRequired,
    };
}