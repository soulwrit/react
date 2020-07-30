import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import contains from '@writ/utils/dom-contains';
import noop from '@writ/utils/noop';
import raf from '@writ/utils/raf';
import getViewportHeight from '@writ/utils/dom-viewport-height';
import getViewportWidth from '@writ/utils/dom-viewport-width';
import { Area } from './ContextMenu/Area';
import { List } from './ContextMenu/List';
export { ContextMenu };
const ContextMenu = props => {
    const element = useRef();
    const position = useRef();
    const { children, onOpen, onClose, onSelect, onTarget } = props;
    const [visible, setVisible] = useState(false);
    const [style, setStyle] = useState(null);
    const [initialzed, setInitialzed] = useState(false);
    const onSelectWrapper = e => {
        e.stopPropagation();
        if (onSelect(e)) {
            setVisible(false);
        }
    };
    const onCloseWrapper = e => {
        if (contains(element.current, e.target)) {
            return;
        }
        setVisible(false);
    };
    const onOpenWrapper = e => {
        e.preventDefault();
        e.stopPropagation();
        position.current = {
            top: e.pageY,
            left: e.pageX
        };
        setVisible(true);
        onTarget(e);
        return false;
    };

    useEffect(() => {
        setInitialzed(true);
        window.addEventListener('resize', onCloseWrapper, false);
        document.body.addEventListener('contextmenu', onCloseWrapper, false);
        document.body.addEventListener('click', onCloseWrapper, false);
        return () => {
            window.removeEventListener('resize', onCloseWrapper, false);
            document.body.removeEventListener('contextmenu', onCloseWrapper, false);
            document.body.removeEventListener('click', onCloseWrapper, false);
        };
    }, []);
    useEffect(() => {
        if (!initialzed) return;
        if (visible) {
            return raf(() => {
                const vh = getViewportHeight();
                const vw = getViewportWidth();
                const maxH = vh;
                const maxW = vw;
                const rect = element.current.getBoundingClientRect();
                const page = position.current;
                const pos = {
                    left: page.left
                };

                if (rect.height + page.top >= maxH) {
                    pos.bottom = maxH - page.top;
                    if (pos.bottom + rect.height >= maxH) {
                        pos.bottom = null;
                        pos.top = 0;
                    }
                } else {
                    pos.top = page.top;
                }

                if (rect.width + page.left >= maxH) {
                    pos.left = maxH - page.left;
                }
                if (rect.height > maxH) {
                    pos.height = maxH;
                }
                if (rect.width > maxW) {
                    pos.width = maxW;
                }

                setStyle(pos);
                onOpen();
            });
        }

        onClose();
    }, [visible]);

    return React.Children.map(children, Item => {
        if (Item == null) {
            return Item;
        }
        switch (Item.type) {
            case List: return React.cloneElement(Item, {
                key: 'list',
                onClick: onSelectWrapper,
                ref: element,
                style,
                visible,
            });
            case Area: return React.cloneElement(Item, {
                key: 'area',
                onContextMenu: onOpenWrapper
            });
            default: return Item;
        }
    });
};
ContextMenu.Area = Area;
ContextMenu.List = List;
ContextMenu.defaultProps = {
    onClose: noop,
    onOpen: noop,
    onSelect: () => true,
    onTarget: noop,
};
if (window.DEV) {
    ContextMenu.propTypes = {
        onClose: PropTypes.func,
        onOpen: PropTypes.func,
        onSelect: PropTypes.func.isRequired,
        onTarget: PropTypes.func,
    };
}