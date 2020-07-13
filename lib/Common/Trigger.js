
import React from 'react';
import PropTypes from 'prop-types';
import raf from '@writ/utils/raf';
import contains from '@writ/utils/dom-contains';
// import hasOwn from '@writ/utils/object-has-own';
import assert from '@writ/utils/assert';
import isMethod from '@writ/utils/is-method';
import coordEqual from '@writ/utils/coord-equal';

// export const getTriggerProps = (props, mixin) => {
//     const names = [
//         'calcCoord', 'closeOnEsc', 'closeOnOutsideClick',
//         'escape', 'equalCoord',
//         'onClose', 'onOpen', 'onKeyUp', 'onResize',
//         'resetOnTopResize', 'visible'
//     ];

//     mixin = typeof mixin === 'object' && mixin ? mixin : {};
//     names.forEach(prop => {
//         if (hasOwn(props, prop)) {
//             mixin[prop] = props[prop];
//         }
//     });

//     return mixin;
// }
export class Trigger extends React.PureComponent {
    constructor(props) {
        super();
        this.state = {
            visible: !!props.visible,
            coord: props.coord
        };
        this.coord = this.state.coord;
        this.pointRef = React.createRef();
        this.layerRef = React.createRef();
    }
    componentDidMount() {
        const { closeOnEsc, closeOnOutsideClick, resetOnTopResize } = this.props;

        resetOnTopResize && window.addEventListener('resize', this.onResize, false);
        closeOnOutsideClick && document.body.addEventListener('click', this.onOutsideClick, false);
        closeOnEsc && window.addEventListener('keyup', this.onKeyUp, false);
    }
    componentWillUnmount() {
        const { closeOnEsc, closeOnOutsideClick, resetOnTopResize } = this.props;

        resetOnTopResize && window.removeEventListener('resize', this.onResize, false);
        closeOnOutsideClick && document.body.removeEventListener('click', this.onOutsideClick);
        closeOnEsc && window.removeEventListener('keyup', this.onKeyUp);
    }
    setCoord = callback => {
        const point = this.pointRef.current;
        const layer = this.layerRef.current;
        if (!point || !layer) return;

        try {
            const pRect = point.getBoundingClientRect();
            const lRect = layer.getBoundingClientRect();
            const coord = this.props.calcCoord(pRect, lRect);

            this.coord = coord;
            this.setState({ coord }, callback);
        } catch (error) {
            // 报告错误
            assert.report(error);
        }
    }
    setVisible = visible => {
        this.setState({ visible }, () => {
            if (visible) {
                if (this.props.equalCoord && coordEqual(this.state.coord, this.coord)) {
                    return isMethod(this.props, 'onOpen') && this.props.onOpen();
                }

                console.log(this.coord, this.state.coord);

                this.setCoord(() => {
                    isMethod(this.props, 'onOpen') && this.props.onOpen();
                });
            } else {
                isMethod(this.props, 'onClose') && this.props.onClose();
            }
        });
    }
    onOpen = e => {
        e && e.stopPropagation();
        e && e.nativeEvent && e.nativeEvent.stopImmediatePropagation();
        if (this.state.visible) {
            return;
        }
        this.setVisible(true);
    }
    onClose = e => {
        e && e.stopPropagation();
        if (!this.state.visible) {
            return;
        }
        this.setVisible(false);
    }
    onOutsideClick = e => {
        const isPointClicked = contains(this.pointRef.current, e.target)
        const isLayerClicked = contains(this.layerRef.current, e.target);

        if (isPointClicked || isLayerClicked || !this.state.visible) {
            return false;
        }

        this.setVisible(false);
    }
    onResize = e => {
        if (this.state.visible) {
            raf(() => {
                this.setCoord();
                isMethod(this.props, 'onResize') && this.props.onResize(e);
            });
        }
    }
    onKeyUp = e => {
        if (this.state.visible) {
            raf(() => {
                if (isMethod(this.props, 'escape') && e.keyCode === this.props.escape) {
                    return this.setVisible(false);
                }
                isMethod(this.props, 'onKeyUp') && this.props.onKeyUp(e);
            });
        }
    }
    render() {
        return this.props.children({
            close: this.onClose,
            open: this.onOpen,
            coord: this.state.coord,
            visible: this.state.visible,
            layer: this.layerRef,
            trigger: this.pointRef,
        });
    }
}
Trigger.defaultProps = {
    closeOnEsc: true,
    closeOnOutsideClick: true,
    escape: 27,
    equalCoord: true,
    resetOnTopResize: true,
};
if (window.DEV) {
    Trigger.propTypes = {
        children: PropTypes.func.isRequired, // trigger 子元素
        closeOnEsc: PropTypes.bool, // 按键 ESC 执行关闭
        closeOnOutsideClick: PropTypes.bool, // 点击layer区域之外的地方 执行关闭
        escape: PropTypes.number, // ESC 按键对应的 keyCode 或者 key
        equalCoord: PropTypes.bool, // 对比定位坐标是否相同
        onClose: PropTypes.func, // layer 被关闭后执行的函数
        onOpen: PropTypes.func,// layer被打开后执行的函数
        onKeyUp: PropTypes.func, // 当发生 keyUp 事件是执行的函数
        onResize: PropTypes.func, // layer 在窗口大小发生大化时，重新复位以后而执行的函数  
        resetOnTopResize: PropTypes.bool, // 在window大小发生变化时，是否对layer进行复位
        calcCoord: PropTypes.func.isRequired, // 必须时一个函数，用于计算layer的位置，这个函数传出了 trigger和 layer 的 rect 信息
        visible: PropTypes.bool, // 初始化时，是否显示layer，由于本组件是非受控组件，因此不接受 props.visible 控制
    };
}