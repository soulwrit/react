import '@writ/scss/components/tab.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import noop from '@writ/utils/noop';
import lookupAttr from '@writ/utils/dom-kook-up-attr';
import hasOwn from '@writ/utils/object-has-own';

import { Pane } from './Tabs/Pane';
import { Tab } from './Tabs/Tab';
import { Content } from './Tabs/Content';
import { Item } from './Tabs/Item';
import { Extra } from './Tabs/Extra';
import { CSSUtil, directories, MQ_Breakpoints } from '../dependency';
export class Tabs extends React.PureComponent {
    constructor(props) {
        super();
        this.state = {
            index: props.index,
            prior: props.index
        };
        this.paneRef = null;
    }
    static getDerivedStateFromProps(nextProps, nextState) {
        if (!hasOwn(nextProps, 'index')) return nextState;

        const propsIndex = nextProps.index;
        if (propsIndex == null) return nextState;
        const priorIndex = nextState.prior;

        return priorIndex != propsIndex ? {
            index: propsIndex,
            prior: propsIndex
        } : nextState;
    }
    setIndex = index => {
        if (index == null) {
            return;
        }
        this.setState({ index }, () => {
            this.props.onChange(index);
        });
    }
    onClick = index => {
        return e => {
            e.stopPropagation();
            this.setIndex(index);
        }
    }
    render() {
        const { className, children, extra, mode, size, style } = this.props;
        const activeIndex = this.state.index;

        return React.createElement('div', {
            className: classnames(CSSUtil.tab, mode, className),
            style
        }, React.Children.map(children, (N, nKey) => {
            if (!N) return null;
            let isPane;
            switch (N.type) {
                case Pane: { isPane = true; break };
                case Content: break;
                default: return null;
            }
            const { children, proxy } = N.props;
            const onProxy = isPane && proxy ? e => {
                e.stopPropagation();
                this.setIndex(lookupAttr(e.target, 'data-index', this.paneRef));
            } : null;
            return React.cloneElement(N,
                {
                    extra: isPane ? React.createElement(Extra, {
                        className: size
                    }, N.props.extra || extra) : null,
                    key: nKey,
                    dref: isPane ? (elem => (this.paneRef = elem)) : null,
                    onClick: onProxy,
                },
                React.Children.map(children, (M, mKey) => {
                    if (!M) return null;
                    let isTab;
                    switch (M.type) {
                        case Tab: { isTab = true; break };
                        case Item: break;
                        default: return null;
                    }

                    const { className, index } = M.props;
                    const name = index || mKey;
                    const isActive = activeIndex == name;
                    const activeClassName = CSSUtil.activate(isActive);

                    if (isTab) {
                        return React.cloneElement(M, {
                            className: classnames(className, size, activeClassName),
                            dataIndex: onProxy ? name : null,
                            key: mKey,
                            onClick: onProxy ? null : this.onClick(name),
                        });
                    }

                    return isActive ? React.cloneElement(M, {
                        className: classnames(className, size, activeClassName),
                        key: mKey,
                    }) : null;
                }),
            );
        }));
    }
}

Tabs.Pane = Pane;
Tabs.Tab = Tab;
Tabs.Content = Content;
Tabs.Item = Item;
Tabs.defaultProps = {
    index: 0,
    mode: directories[1],
    onChange: noop,
    size: 'md',
};
if (window.DEV) {
    Tabs.propTypes = {
        mode: PropTypes.oneOf(directories),
        index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onChange: PropTypes.func,
        size: PropTypes.oneOf(MQ_Breakpoints)
    };
}