import React from 'react';
import PropTypes from 'prop-types';
import contains from '@writ/utils/dom-contains';

export class ContextMenu extends React.PureComponent {
    constructor() {
        super();
        this.root = null;
        this.state = {
            position: null
        };
    }
    componentDidMount() {
        document.addEventListener('click', this.onClose, false);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.onClose);
    }
    onSelect = e => {
        e.stopPropagation();
        if (this.props.onSelect(e)) {
            this.setState({
                position: null
            }, this.props.onClose);
        }
    }
    onClose = e => {
        if (contains(this.root, e.target)) {
            return;
        }
        this.setState({
            position: null
        }, this.props.onClose);
    }
    onOpen = e => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            position: {
                top: e.pageY,
                left: e.pageY
            }
        }, this.props.onOpen);

        return false;
    }
    render() {
        const { children } = this.props;
        const position = this.state.position;

        return React.Children.map(children, Item => {
            if (!Item) {
                return Item;
            }
            switch (Item.type) {
                case List: return React.cloneElement(Item, {
                    key: 'list',
                    style: position,
                    onClick: this.onSelect,
                    visible: !!position,
                    ref: elem => this.root = elem
                });
                case Area: return React.cloneElement(Item, {
                    key: 'area',
                    onContextMenu: this.onOpen,
                    children: Item.props.children
                });
                default: return Item;
            }
        });
    }
}

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