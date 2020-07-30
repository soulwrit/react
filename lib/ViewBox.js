import React from 'react';
import PropTypes from 'prop-types';
import assert from '@writ/utils/assert';
import noop from '@writ/utils/noop';
import has from '@writ/utils/object-has-own';

import context from './ViewBox/Context';
import { Link } from './ViewBox/Link';
import { Area } from './ViewBox/Area';
import { withViewBox } from './ViewBox/withViewBox';
import { createViewBox } from './ViewBox/createViewBox';
import { Provider } from './ViewBox/Provider';

class ViewBox extends React.Component {
    static Provider = Provider;
    static Area = Area;
    static Link = Link;
    static contextType = context;
    static defaultProps = {
        onChange: noop
    };
    // static getDerivedStateFromProps(nextProps, nextState, ) { 
    //     if (has(nextProps, 'path')) {
    //         if (nextProps.path === nextState.ctrl) {
    //             return nextState;
    //         }
    //         return {
    //             path: nextProps.path,
    //             ctrl: nextProps.path,
    //             data: nextProps.state || nextState.data
    //         };
    //     }
    //     return nextState;
    // }
    constructor(props, context) {
        super();
        this.state = {
            path: props.path,
            data: props.state,
            // ctrl: props.path
        };

        assert.nuil(context, "You should not use <ViewBox> outside a <ViewBox.Provider>");
        context.set(props.name, this.onChange);
        context.current = props.path;
    }

    onChange = (path, state) => {
        this.setState({ path, data: state, }, this.props.onChange);
    }

    render() {
        const { children, } = this.props;
        const currentPath = this.state.path;
        const currentData = this.state.data;
        const ctx = this.context;

        let match, props;
        React.Children.forEach(children, child => {
            assert.truly(child && child.type === Area, "You should not use <ViewBox.Area> outside a <ViewBox>");
            const { path, component, state } = child.props;

            ctx.add(path);
            if (ctx.current ? path === ctx.current : path === currentPath) {
                match = component;
                props = state;
            }
        });

        return match ? React.createElement(match, Object.assign({}, props, currentData)) : null;
    }
}

export {
    ViewBox,
    withViewBox,
    createViewBox,
    Provider as ViewBoxProvider,
    Link as ViewLink,
    Area as ViewArea,
}
if (window.DEV) {
    ViewBox.propTypes = {
        name: PropTypes.string.isRequired,
        path: Area.propTypes.path,
        onChange: PropTypes.func
    };
}