import React from 'react';
import PropTypes from 'prop-types';
import assert from '@writ/utils/assert';

import context from './ViewBox/Context';
import { createManager } from './ViewBox/Manager';
import { Link } from './ViewBox/Link';
import { Area } from './ViewBox/Area';

function Consumer(props) {
    return React.createElement(context.Consumer, {
        children(vbm) {
            return React.Children.map(props.children, (Item, index) => {
                if (!Item) {
                    throw new Error('View Child must be a valid reactNode.');
                }
                return React.cloneElement(Item, { vbm, key: index });
            });
        }
    });
}
function Provider(props) {
    return React.createElement(context.Provider, {
        value: createManager(props.onChange),
        children: props.children
    });
}
class ViewBox extends React.PureComponent {
    static Provider = Provider;
    static Consumer = Consumer;
    static Area = Area;
    static Link = Link;
    static defaultProps = {
        empty: {
            children: '这是一个空盒子！'
        }
    };
    constructor(props) {
        super();
        this.state = {
            current: {
                path: props.path,
                name: props.name
            }
        };
    }
    componentWillReceiveProps(props) {
        this.setState({
            current: {
                path: props.path,
                name: props.name,
            }
        });
    }
    onPath = vbm => {
        if (vbm.current) {
            this.setState({
                current: Object.assign({}, vbm.current)
            });
        }
    }
    render() {
        if (React.Children.count(this.props.children)) {
            const { current } = this.state;

            return React.createElement(context.Consumer, {
                children: vbm => {
                    assert.nuil(vbm,
                        "You should not use <ViewBox> outside a <ViewBox.Provider>");

                    vbm.on(this.props.name, this.onPath);

                    let match, props;

                    React.Children.forEach(this.props.children, child => {
                        assert.truly(child && child.type === Area,
                            "You should not use <ViewBox.Area> outside a <ViewBox>");
                        const { path, component, state } = child.props;

                        vbm.push(current.name, path, state);
                        if (vbm.current ? path === vbm.current.path : path === current.path) {
                            match = component;
                            props = state;
                        }
                    });

                    return match
                        ? React.createElement(match, Object.assign({}, props,
                            vbm.current ? vbm.current.state : null))
                        : React.createElement('div', this.props.empty);
                }
            });
        }
        return React.createElement('div', null, this.props.empty);
    }
}
export {
    ViewBox,
    Provider,
    Consumer,
    Link as ViewLink,
    Area as ViewArea
}
if (window.DEV) {
    Provider.propTypes = {
        onChange: PropTypes.func
    };
    ViewBox.propTypes = {
        name: PropTypes.string.isRequired,
        path: Area.propTypes.path,
        onChange: PropTypes.func
    };
}