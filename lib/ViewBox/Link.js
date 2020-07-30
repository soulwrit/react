import React from 'react';
import PropTypes from 'prop-types';
import assert from '@writ/utils/assert';
import context from './Context';
export { Link };

function Link(props) {
    const { type, value, children, onClick, to, state, ...rest } = props;

    return React.createElement(context.Consumer, null, vbm => {
        assert.nuil(vbm, "You should not use <ViewBox.Link> outside a <ViewBox.Provider>");

        return React.createElement(type, {
            children: value || children,
            onClick: e => {
                e.stopPropagation();
                if (onClick) {
                    onClick(e, vbm);
                }
                vbm.go(to, state);
            },
            ...rest
        });
    });
}
Link.defaultProps = {
    type: 'span',
};
if (window.DEV) {
    Link.propTypes = {
        to: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        state: PropTypes.object,
        value: PropTypes.any
    };
}