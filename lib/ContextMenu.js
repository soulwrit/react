import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import contains from '@writ/utils/dom-contains';
export { ContextMenu };

const ContextMenu = props => {
    const element = useRef();
    const { children, onOpen, onClose, onSelect, } = props;
    const [position, setPosition] = useState(null);
    const [isInit, setIsInit] = useState(false);
    const handleSelect = e => {
        e.stopPropagation();
        if (onSelect(e)) {
            setPosition(null);
        }
    };
    const handleHide = e => {
        if (contains(element.current, e.target)) {
            return;
        }
        setPosition(null);
    };
    const handleShow = e => {
        e.preventDefault();
        e.stopPropagation();
        setPosition({
            top: e.pageY,
            left: e.pageX
        });
        return false;
    };

    useEffect(() => {
        setIsInit(true);
        document.body.addEventListener('click', handleHide, false);
        return () => {
            document.body.removeEventListener('click', handleHide);
        };
    }, []);

    useEffect(() => {
        position ? onOpen && onOpen() : isInit && onClose && onClose();
    }, [position]);

    return React.Children.map(children, Item => {
        if (!Item) {
            return Item;
        }
        switch (Item.type) {
            case List: return React.cloneElement(Item, {
                key: 'list',
                style: position,
                onClick: handleSelect,
                visible: !!position,
                ref: element
            });
            case Area: return React.cloneElement(Item, {
                key: 'area',
                onContextMenu: handleShow,
                children: Item.props.children
            });
            default: return Item;
        }
    });
};

const List = React.forwardRef((props, ref) => {
    const { bgColor, bdColor, children, className, maxHeight, maxWidth, onClick, style, zIndex, target, visible, } = props;

    return ReactDOM.createPortal(React.createElement('div', {
        className,
        style: Object.assign({
            maxHeight,
            maxWidth,
            overflow: 'auto',
            position: 'fixed',
            overflow: 'auto',
            display: 'none',
            padding: '10px',
            zIndex,
            border: '1px solid ' + bdColor,
            backgroundColor: bgColor,
            display: visible ? 'block' : 'none',
        }, style),
        ref,
        children,
        onClick: onClick
    }), target)
});
const Area = props => {
    const { children, onContextMenu, ...rest } = props;
    const trigger = React.Children.only(children);

    return React.cloneElement(trigger, Object.assign({ onContextMenu }, rest));
}
ContextMenu.Area = Area;
ContextMenu.List = List;
ContextMenu.defaultProps = {
    onSelect: () => { }
};
List.defaultProps = {
    bgColor: '#fff',
    bdColor: '#eee',
    maxHeight: screen.height - 50,
    maxWidth: screen.width - 50,
    target: document.body,
    zIndex: 999999,
};

if (window.DEV) {
    ContextMenu.propTypes = {
        onClose: PropTypes.func,
        onOpen: PropTypes.func,
        onSelect: PropTypes.func.isRequired,
    };
    List.propTypes = {
        bgColor: PropTypes.string,
        bdColor: PropTypes.string,
        maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onClick: PropTypes.func,
        target: PropTypes.instanceOf(HTMLElement),
        zIndex: PropTypes.number,
        visible: PropTypes.bool,
    };
}