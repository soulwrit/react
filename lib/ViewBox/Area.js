import React  from 'react';
import PropTypes from 'prop-types';
export { Area };

function Area(props) {
    return props.children || null;
}

if (window.DEV) {
    Area.propTypes = {
        path: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        component: PropTypes.any
    };
}