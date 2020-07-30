import React from 'react';
import { Queue } from './Queue';
export class Layer extends React.Component {
    constructor(props) {
        super();
        this.queue = new Queue();
        this.queue.append(props.first);
        this.state = {
            queue: this.queue.get()
        };
    }
    componentDidMount() {
        this.props.onRef(this);
    }
    componentDidUpdate() {
        const { queue } = this.state;
        if (queue.length === 0) {
            this.props.unmonut(); // 卸载组件
        }
    }
    add(node) {
        this.queue.append(node);
        this.setState({
            queue: this.queue.get()
        });
    }
    remove(node) {
        this.queue.remove(node);
        this.setState({
            queue: this.queue.get()
        });
    }
    render() {
        return this.state.queue
    }
}