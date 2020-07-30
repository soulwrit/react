import React from 'react';
import ReactDOM from 'react-dom';
import hasOwn from '@writ/utils/object-has-own';
import { Head } from './_Head';
import { Body } from './_Body';
import { Context } from './Context';
import { makeAlign } from './align';
import { inValue, toValue } from './value';
import { Trigger } from '../Common/Trigger';
import { watchModel } from '../Form/Model';
export class Wrapper extends React.PureComponent {
    static contextType = Context;
    static getDerivedStateFromProps(props, state) {
        if (hasOwn(props, 'value')) {
            return {
                values: toValue(props.value)
            };
        }
        return state;
    }
    constructor(props) {
        super();
        this.state = {
            values: toValue(props.defaultValue)
        };
        watchModel(props.model, () => { });
    }
    setValues = values => {
        this.setState({ values }, () => {
            const { model, onChange, multiple } = this.props;
            const { values } = this.state;
            const value = multiple ? values : values.length && values[0].value;

            if (model) {
                model.value = value;
            }

            // 监听选中值的变化 
            onChange(value);
        });
    }
    getSelector(close, multiple) {
        return (selected, option) => {
            const values = [].concat(this.state.values);

            if (multiple) {
                const index = inValue(values, option.value, true);
                if (index > -1) {
                    if (!selected) {
                        values.splice(index, 1);
                    }
                } else {
                    if (selected) {
                        values.push(option);
                    }
                }
            } else {
                values.length = 0;
                if (selected) {
                    values[0] = option;
                }
            }
            this.setValues(values);
            !multiple && close();
        }
    }
    render() {
        const {
            arrow, calc, children, className,
            footer, neck, render, style,
            inb, multiple, placeholder, size, theme,

            // 传递给 Trigger 的 props
            closeOnEsc, closeOnOutsideClick, container,
            disabled, escape,
            onClose, onKeyUp, onOpen, onResize,
            resetOnTopResize,
            visible
        } = this.props;
        const calcCoord = calc || makeAlign();
        const { values } = this.state;

        return React.createElement(Trigger, {
            closeOnEsc, closeOnOutsideClick,
            disabled, escape, onClose, onKeyUp, onOpen, onResize,
            resetOnTopResize, calcCoord, visible,
        }, ({ visible, close, open, coord, layer, trigger }) => {
            const isHidden = disabled || !visible;
            const layerNode = isHidden ? null : React.createElement(Body, {
                children, footer, neck, ref: layer,
            });
            const onSelect = isHidden ? null : this.getSelector(close, multiple);

            return React.createElement(Context.Provider, {
                value: {
                    coord, disabled, multiple, inb, onSelect,
                    placeholder, size, theme, values, visible
                }
            }, React.createElement(Head, {
                arrow, className, close, open, ref: trigger, render, style,
            }), !container ? layerNode : ReactDOM.createPortal(layerNode, container));
        });
    }
} 
