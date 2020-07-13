import React from 'react';
import PropTypes from 'prop-types';
import assert from '@writ/utils/assert';
export { RefBox as default, RefBox };

const RefBox = React.forwardRef(function (props, ref) {
    const { type, children, bindEvent, ...rest } = props;
    const nextProps = Object.assign({}, rest, { ref });

    try {
        React.Children.only(children);
        bindEvent(children.props, nextProps);
        return React.cloneElement(children, nextProps);
    } catch (error) {
        assert.throw(error.message);
        bindEvent({}, nextProps);
        return React.createElement(type, nextProps, children);
    }
})
RefBox.defaultProps = {
    type: 'span',
    bindEvent: function () { }
};
if (window.DEV) {
    RefBox.propTypes = {
        type: PropTypes.string,
        bindEvent: PropTypes.func
    };
}