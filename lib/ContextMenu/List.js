import '@writ/scss/components/contextMenu.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
export { List };
const List = React.forwardRef((props, ref) => {
    const { bgColor, bdColor, children, className, onClick, style, target, visible, zIndex, } = props;

    return ReactDOM.createPortal(React.createElement('div', {
        className: classnames('ctxm', className, {
            non: !visible
        }),
        style: Object.assign({
            border: '1px solid ' + bdColor,
            backgroundColor: bgColor,
            zIndex
        }, style),
        ref,
        children,
        onClick: onClick
    }), target);
});
List.defaultProps = {
    bgColor: void 0,
    bdColor: void 0,
    onClick: null,
    target: document.body,
    visible: false,
    zIndex: void 0,
};
if (window.DEV) {
    List.propTypes = {
        bgColor: PropTypes.string,
        bdColor: PropTypes.string,
        onClick: PropTypes.func,
        target: PropTypes.instanceOf(HTMLElement),
        visible: PropTypes.bool,
        zIndex: PropTypes.number,
    };
}