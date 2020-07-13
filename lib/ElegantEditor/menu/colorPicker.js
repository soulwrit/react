import React from 'react';
import { ColorPicker } from '../../ColorPicker';

class Wrapper extends React.PureComponent {
    constructor(props) {
        super();
        this.state = {
            visible: props.visible
        };
    }
    render() {
        const { editor } = this.props;
        const { visible } = this.state;

        return [
            React.createElement('div', {
                children: 'colorPicker',
                key: 0,
                onClick: () => {
                    this.setState({
                        visible: true
                    });
                }
            }),
            visible ? React.createElement(ColorPicker, {
                key: 1,
                onSelect: color => {
                    this.setState({
                        visible: false
                    });
                    if (editor) {
                        editor.execCommand(props.command, color);
                    }
                },
                style: {
                    position: 'absolute',
                    minWidth: 300,
                    zIndex: 9
                }
            }) : null
        ];
    }
}

export default {
    name: 'colorPicker',
    override: false,
    view(props, editor) {
        return React.createElement(Wrapper, props);
    }
}