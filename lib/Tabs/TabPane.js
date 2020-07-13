import React from 'react';
import PropTypes from 'prop-types';
export const TabPane = React.memo(() => null);
TabPane.defaultProps = {};
if (window.DEV) {
    TabPane.propTypes = {
        className: PropTypes.any,
        closable: PropTypes.bool,
        closeIcon: PropTypes.any,
        children: PropTypes.any,
        content: PropTypes.any, 
        style: PropTypes.object,
        title: PropTypes.any,
    };
}