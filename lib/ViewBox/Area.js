import 'react';
import PropTypes from 'prop-types';
export { Area };

function Area(props) {
    return props.children || null;
}

Area.defaultProps = {
    path: void 0,
    children: null,
    component: null
};
if (window.DEV) {
    Area.propTypes = {
        path: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        component: PropTypes.any
    };
}