import '@writ/scss/components/scroll.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import assert from '@writ/utils/assert';
import raf from '@writ/utils/raf';
import noop from '@writ/utils/noop';
import { barProps } from './Scrollor/barProps';
export class Scrollor extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            width: undefined,
            height: undefined,
            top: undefined,
            left: undefined,
        };
    }
    componentDidMount() {
        this.init();
        this.setStartPos();
        document.addEventListener('readystatechange', this.onReadyStateChange);
        window.addEventListener('resize', this.onWindowReisize, false);
    }
    componentWillUnmount() {
        document.removeEventListener('readystatechange', this.onReadyStateChange);
        window.removeEventListener('resize', this.onWindowReisize, false);
    }
    UNSAFE_componentWillUpdate(prevProps) {
        if (prevProps.children !== this.props.children) {
            this.onWindowReisize();
        }
    }
    onWindowReisize = () => {
        raf(() => {
            this.init();
            this.onScroll();
        });
    }
    onReadyStateChange = () => {
        if (document.readyState === 'complete') {
            this.init();
            this.setStartPos();
        }
    }
    setRef = elememt => {
        this.el = elememt;
    }
    init() {
        raf(() => {
            const { min, timeout } = this.props;
            let calc = () => {
                try {
                    const { offsetWidth, offsetHeight, scrollWidth, scrollHeight } = this.el;

                    // 异步情况下，子元素没加入DOM中，导致滚地区没有大小，因此重复检测一下
                    if (offsetHeight > 0 || offsetWidth > 0) {
                        clearInterval(timer);
                        timer = null;
                    }

                    const sizeX = offsetWidth / (scrollWidth || 1);
                    const sizeY = offsetHeight / (scrollHeight || 1);
                    assert.ok(Number.isNaN(sizeX), 'Invalid scroll x size.');
                    assert.ok(Number.isNaN(sizeY), 'Invalid scroll y size.');
                    const minX = (scrollWidth - offsetWidth) * sizeX;
                    const minY = (scrollHeight - offsetHeight) * sizeY

                    this.setState({
                        width: (sizeX >= 1 || minX < min) ? undefined : (sizeX * 100 + '%'),
                        height: (sizeY >= 1 || minY < min) ? undefined : (sizeY * 100 + '%'),
                    });
                } catch (error) {

                }
            };
            let sTime = Date.now();
            let timer = setInterval(() => {
                const eTime = Date.now();

                if (eTime - sTime > timeout) {
                    // 超过10s 滚动条没有加载出来，就放弃初始计算
                    clearInterval(timer);
                    timer = null;
                }
                calc();
            }, 100);
        });
    }
    setStartPos() {
        const { start } = this.props;
        const el = this.el;
        switch (typeof start) {
            case 'string':
                if (start.includes('bottom')) {
                    el.scrollTop = el.scrollHeight;
                }
                if (start.includes('right')) {
                    el.scrollLeft = el.scrollWidth;
                }
                break;
            case 'object':
                el.scrollTop = start.top;
                el.scrollLeft = start.left;
                break;
            default: break;
        }
    }
    onScroll = () => {
        raf(() => {
            const el = this.el;
            const { xTrack, yTrack } = this.refs;
            const { scrollLeft, scrollHeight, scrollTop, scrollWidth, } = el;
            let top = undefined;
            let left = undefined;

            if (yTrack) {
                top = Math.round(scrollTop / scrollHeight * yTrack.offsetHeight);
            }
            if (xTrack) {
                left = Math.round(scrollLeft / scrollWidth * xTrack.offsetWidth);
            }
            this.setState({ top, left }, () => {
                this.props.onScroll(this.state);
            });
        });
    }
    getTrackMouseDown = axis => {
        return e => {
            const el = this.el;
            const bar = this.refs[`${axis}Bar`];
            const track = this.refs[`${axis}Track`];
            const { client, offsetSize, scroll, scrollSize } = barProps[axis];

            const elSize = el[scrollSize];
            const trackSize = track[offsetSize];
            const barSize = bar[offsetSize];
            const maxDis = (trackSize - barSize) || 1;
            let curr = e[client] - barSize;

            if (curr >= maxDis) {
                curr = maxDis;
            } else if (curr <= 0) {
                curr = 0;
            }

            el[scroll] = Math.round((curr / trackSize) * elSize);
        };
    }
    onContextMenu = e => {
        e.preventDefault();
        return false;
    };
    getBarMouseDown(axis) {
        return e => {
            if (e.ctrlKey || e.button === 2) {
                return;
            }
            e.stopPropagation();
            const { client, offset, offsetSize, scroll, scrollSize, } = barProps[axis];
            const el = this.el;
            const elSize = el[scrollSize];
            const currentTarget = e.currentTarget;
            const barSize = currentTarget[offsetSize];
            const trackSize = currentTarget.parentElement[offsetSize];
            const maxDis = (trackSize - barSize) || 1;
            const dis = (e[client] - currentTarget[offset]);

            // console.log('Down Client', e[client]);
            // console.log('Down Offset', currentTarget[offset]);
            // console.log('Down Dis   ', dis);
            const onMouseMove = e => {
                raf(() => {
                    let curr = e[client] - dis;
                    // console.log('Move Client', e[client]);
                    // console.log('Move Dis   ', dis);
                    // console.log('Move Curr  ', curr);
                    if (curr >= maxDis) {
                        curr = maxDis;
                    } else if (curr <= 0) {
                        curr = 0;
                    }
                    // console.log('Move Current', curr);
                    el[scroll] = Math.round((curr / trackSize) * elSize);
                });
            };
            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove, false);
                document.removeEventListener('mouseup', onMouseUp, false);
                document.onselectstart = null;
            };

            document.addEventListener('mousemove', onMouseMove, false);
            document.addEventListener('mouseup', onMouseUp, false);
            document.onselectstart = () => false;
        }
    }
    getBar(axis) {
        const barProp = barProps[axis];
        const barSize = this.state[barProp.size];

        if (!barSize) return;
        const { barClassName, bgColor, min, size, trackClassName, } = this.props;
        const barPos = this.state[barProp.dir];
        const barStyle = {
            [barProp.dir]: barPos,
            [barProp.size]: barSize,
            [barProp.min]: min,
            backgroundColor: bgColor
        };
        const trackStyle = {
            [barProp.trackSize]: size
        };

        return React.createElement('div', {
            className: classnames('track', axis, trackClassName),
            onContextMenu: this.onContextMenu,
            onMouseDown: this.getTrackMouseDown(axis),
            ref: `${axis}Track`,
            style: trackStyle,
        }, React.createElement('div', {
            className: classnames('bar', barClassName),
            onContextMenu: this.onContextMenu,
            onMouseDown: this.getBarMouseDown(axis),
            ref: `${axis}Bar`,
            style: barStyle,
        }));
    }
    render() {
        const { children, className, viewClassName, native, offset, onClick, onContextMenu, size, stress, viewRef, viewXOffset, viewYOffset } = this.props;
        const isDefaultOffset = offset >= 0 && offset === 17;

        const wrapStyle = {
            marginRight: isDefaultOffset ? undefined : -offset,
            marginBottom: isDefaultOffset ? undefined : -offset,
            overflowY: this.state.height == null ? 'hidden' : undefined,
            overflowX: this.state.width == null ? 'hidden' : undefined,
        };
        const viewStyle = {
            paddingRight: (viewXOffset || size),
            paddingBottom: (viewYOffset || size)
        };

        return native ? children : React.createElement('div', {
            className: classnames('scr', className, { stress }),
            onContextMenu
        }, React.createElement('div', {
            className: 'wrapper',
            ref: this.setRef,
            onScroll: this.onScroll,
            style: wrapStyle
        }, React.createElement('div', {
            className: classnames('view', viewClassName),
            ref: viewRef,
            style: viewStyle,
            onClick
        }, children)), this.getBar('x'), this.getBar('y'));
    }
}
Scrollor.defaultProps = {
    barClassName: undefined,
    bgColor: undefined,
    className: undefined,
    native: false,
    min: 24,
    offset: 17,
    onContextMenu: noop,
    onScroll: noop,
    stress: true,
    size: undefined,
    start: undefined,
    trackClassName: undefined,
    viewRef: undefined,
    viewXOffset: undefined,
    viewYOffset: undefined,
    timeout: 10000
};
if (window.DEV) {
    Scrollor.propTypes = {
        barClassName: PropTypes.string, // 滚动块的类名
        bgColor: PropTypes.string, // 滚动块的背景色
        className: PropTypes.string, // 滚动容器的类名
        native: PropTypes.bool, // 是否使用原生滚动条
        min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 滚动块的最小(可视大小)
        offset: PropTypes.number, // 浏览器默认的滚动条大小
        onClick: PropTypes.func, // 内容区点击事件
        onContextMenu: PropTypes.func,// 右键菜单事件
        onScroll: PropTypes.func,// 滚动事件
        size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 轨道的大小
        stress: PropTypes.bool, // 应激性
        start: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),// 初始定位
        trackClassName: PropTypes.string, // 滚动轨道的类名
        viewRef: PropTypes.func, // 内容区的ref
        viewXOffset: PropTypes.number, // 内容区右侧内间距
        viewYOffset: PropTypes.number, // 内容区右侧内间距
        timeout: PropTypes.number, // 滚动条加载超时数
    };
}