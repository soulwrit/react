import '@writ/scss/components/tree.scss';
import { Children, createElement, cloneElement, PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import noop from '@writ/utils/noop';
import assert from '@writ/utils/assert';
import { CSSUtil } from '../dependency';
export { TreeNode } from './Tree/TreeNode';
import { TreeMeta } from './Tree/TreeMeta';
export { TreeMeta };
export class TreeView extends PureComponent {
    constructor(props) {
        super();
        this.state = {
            expanded: props.expanded,
            disabled: props.disabled,
            selected: props.selected,
        };
    }
    expand(expanded, callback) {
        this.setState({ expanded: expanded != null ? expanded : !this.state.expanded }, callback);
    }
    disable(disabled, callback) {
        this.setState({ disabled: disabled != null ? disabled : !this.state.disabled }, callback);
    }
    select(selected, callback) {
        this.setState({ selected: selected != null ? selected : !this.state.selected }, callback);
    }
    render() {
        const { children, className, render, style } = this.props;
        const { disabled, expanded } = this.state;
        const meta = render(this.state, this);

        assert.nuil(meta, 'Please via tree meta.');
        assert.truly(meta.type === TreeMeta, 'tree meta must be `TreeMeta` type.');

        return createElement('div', {
            className: classnames(CSSUtil.tree, { disabled }, className),
            style
        }, meta, Children.map(children || null, Item => {
            assert.nuil(Item, 'Invalid Tree Node.');
            assert.truly(Item.type === TreeView, 'Only `TreeView` used in `TreeView`.');
            return cloneElement(Item, {
                className: classnames({
                    non: !expanded
                })
            });
        }));
    }
}
TreeView.defaultProps = {
    className: void 0,
    disabled: false,
    expanded: false,
    onClick: noop,
    render: noop,
    selected: false,
    style: null
}
if (window.DEV) {
    TreeView.propTypes = {
        className: PropTypes.string,
        disabled: PropTypes.bool,
        expanded: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
        render: PropTypes.func.isRequired,
        selected: PropTypes.bool,
        style: PropTypes.object
    };
    // TreeMeta
}