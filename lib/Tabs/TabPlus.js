import '@writ/scss/components/tabPlus.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import assert from '@writ/utils/assert';
import hasOwn from '@writ/utils/object-has-own';
import createHash from '@writ/utils/hash-creator';

import { MQ_Breakpoints, dirs } from '../../dependency';
import { LineBar } from '../LineBar';
import { Fade } from '../Common/Fade';
import { Action } from '../Common/Action';
import { Content } from './Content';
import { Item } from './Item';
import { Pane } from './Pane';
import { Tab } from './Tab';
import { TabPane } from './TabPane';
export { TabPane };
export class TabPlus extends React.PureComponent {
    static getDerivedStateFromProps(props, state) {
        if (hasOwn(props, 'dir') && props.dir != state.priorDir) {
            return {
                appKey: createHash(15),
                priorDir: props.dir
            };
        }
        if (hasOwn(props, 'type') && props.type != state.priorType) {
            return {
                appKey: createHash(15),
                priorType: props.type
            };
        }
        if (hasOwn(props, 'centered') && props.centered != state.priorCentered) {
            return {
                appKey: createHash(15),
                priorCentered: props.centered
            };
        }
        if (hasOwn(props, 'index') && props.index != state.priorActive) {
            return {
                active: props.index,
                priorActive: props.index
            };
        }

        return state;
    }
    constructor(props) {
        super();
        this.state = {
            active: props.index,
            activeTab: void 0,
            appKey: createHash(12),
            panes: this.getPanes(props.children),
            priorActive: void 0,
            priorDir: props.dir,
            priorType: props.type,
        };
    }
    onClick = active => {
        return e => {
            e.stopPropagation();
            this.setState({ active }, () => {
                hasOwn(this.props, 'onChange') && this.props.onChange(active);
            });
        };
    }
    onRemove = index => {
        return e => {
            e.stopPropagation();
            const { active, panes } = this.state;
            const newPanes = [].concat(panes);
            let newActive = active;

            newPanes.splice(index, 1);
            if (newPanes.length > 0) {
                const prev = index - 1;
                if (prev >= 0) {
                    newActive = prev;
                } else {
                    newActive = 0;
                }
            }

            this.setState({
                active: newActive,
                panes: newPanes,
            });
        };
    }
    onEdit = e => {
        e.stopPropagation();
        const index = this.state.panes.length;
        const { onEdited } = this.props;

        if (onEdited) {
            return onEdited(tabPane => {
                this.addTab(tabPane, index);
            });
        }
        this.addTab(
            React.createElement(TabPane, {
                title: 'new Tab ' + index,
                content: 'new content ' + index,
                closable: true,
            }),
            index
        );
    }
    addTab = (child, index) => {
        assert.nuil(child, 'tab type is not valid.');
        assert.truly(child.type === TabPane, 'Add Target must be a `TabPane`.');

        const newPanes = [].concat(this.state.panes, child);

        this.setState({ panes: newPanes, active: index });
    }
    getPanes(children) {
        const panes = [];
        React.Children.forEach(children, child => {
            assert.nuil(child, 'Invalid child element.');
            assert.truly(child.type === TabPane, 'Only `TabPane` can be used in `TabPlus`.');
            panes.push(child);
        });

        return panes;
    }
    render() {
        const { centered, className, dir, editable, extra, lazy, style, type } = this.props;
        const tabs = [];
        const items = [];
        const isLine = 'line' === type;
        const isCard = 'card' === type;
        const { active, activeTab, appKey, panes } = this.state;

        panes.forEach((child, index) => {
            const { children, className, closable, content, closeIcon, title, style, } = child.props;
            const itemKey = child.key || index;
            const isActived = active == index;

            tabs[index] = React.createElement(Tab,
                {
                    className: classnames(className, {
                        active: isActived,
                        card: isCard
                    }),
                    key: itemKey,
                    style,
                    onClick: this.onClick(index),
                    ref: inst => {
                        if (isActived) {
                            this.setState({
                                activeTab: inst
                            });
                        }
                    }
                },
                title,
                closable ? React.createElement(Action, {
                    onClick: this.onRemove(index),
                    icon: '&#10005;',
                    inb: true
                }, closeIcon) : null
            );
            const itemElement = React.createElement(Fade, {
                className: classnames({
                    non: !isActived
                }),
                key: itemKey,
                visible: isActived,
            }, React.createElement(Item, null, content || children));

            if (lazy || isActived) {
                items.push(itemElement);
            }
        });

        return React.createElement('div',
            {
                className: classnames('tabp', dir, className),
                key: appKey,
                style,
            },
            React.createElement(Pane, {
                adder: React.createElement(React.Fragment,
                    { key: 'act' },
                    editable ? React.createElement('div', {
                        className: 'adder',
                        key: 'add',
                        onClick: this.onEdit
                    }, React.createElement(Action, {
                        icon: '&#43;',
                    })) : null,
                ),
                className: classnames({
                    card: isCard
                }),
                extra,
                isWrapper: true
            }, React.createElement('div',
                {
                    className: classnames('action', {
                        centered
                    })
                },
                tabs,
                isLine ? React.createElement(LineBar, {
                    dir,
                    target: activeTab,
                }) : null
            )),
            React.createElement(Content, null, items),
        );
    }
}

TabPlus.defaultProps = {
    index: 0,
    dir: 'ttr',
    size: 'md',
    type: 'line'
};
if (window.DEV) {
    TabPlus.propTypes = {
        centered: PropTypes.bool,
        dir: PropTypes.oneOf(dirs),
        editable: PropTypes.bool,
        index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        lazy: PropTypes.bool,
        onChange: PropTypes.func,
        onEdited: PropTypes.func,
        size: PropTypes.oneOf(MQ_Breakpoints),
        type: PropTypes.oneOf(['line', 'card'])
    };
}