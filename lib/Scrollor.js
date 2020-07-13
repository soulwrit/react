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
            width: void 0,
            height: void 0,
            top: void 0,
            left: void 0,
            scrollWidth: void 0,
            scrollHeight: void 0
        };
    }
    componentDidMount() {
        this.init();
        document.addEventListener('readystatechange', this.onReadyStateChange);
        window.addEventListener('resize', this.onWindowReisize, false);
    }
    componentWillUnmount() {
        document.removeEventListener('readystatechange', this.onReadyStateChange);
        window.removeEventListener('resize', this.onWindowReisize, false);
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
    saveRef = elememt => {
        this.el = elememt;
    }
    init() {
        const { clientWidth, clientHeight, scrollWidth, scrollHeight } = this.el;

        const sizeX = clientWidth / scrollWidth;
        const sizeY = clientHeight / scrollHeight;

        assert.ok(Number.isNaN(sizeX), 'Invalid scroll x size.');
        assert.ok(Number.isNaN(sizeY), 'Invalid scroll y size.');

        this.setState({
            width: sizeX >= 1 ? void 0 : (sizeX * 100 + '%'),
            height: sizeY >= 1 ? void 0 : (sizeY * 100 + '%'),
            scrollWidth: scrollWidth,
            scrollHeight: scrollHeight
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
            let top = void 0;
            let left = void 0;

            if (yTrack) {
                top = Math.round(scrollTop / scrollHeight * yTrack.clientHeight);
            }
            if (xTrack) {
                left = Math.round(scrollLeft / scrollWidth * xTrack.clientWidth);
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
            const { client, clientSize, scroll, scrollSize } = barProps[axis];

            const elSize = el[scrollSize];
            const trackSize = track[clientSize];
            const barSize = bar[clientSize];
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
    getBarMouseDown(axis) {
        return e => {
            if (e.ctrlKey || e.button === 2) {
                return;
            }
            e.stopPropagation();
            const { client, offset, clientSize, scroll, scrollSize, } = barProps[axis];
            const el = this.el;
            const elSize = el[scrollSize];
            const currentTarget = e.currentTarget;
            const barSize = currentTarget[clientSize];
            const trackSize = currentTarget.parentElement[clientSize];
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
            onMouseDown: this.getTrackMouseDown(axis),
            ref: `${axis}Track`,
            style: trackStyle
        }, React.createElement('div', {
            className: classnames('bar', barClassName),
            onMouseDown: this.getBarMouseDown(axis),
            ref: `${axis}Bar`,
            style: barStyle
        }));
    }
    render() {
        const { children, className, offset, native, size, stress, viewXOffset } = this.props;
        const { scrollWidth } = this.state;
        const wrapStyle = offset >= 0 && offset !== 17 ? {
            paddingBottom: offset,
            paddingRight: offset,
            marginRight: -offset,
            marginBottom: -offset,
        } : null;
        const viewStyle = scrollWidth ? {
            width: scrollWidth,
            paddingRight: (viewXOffset || size)
        } : null;

        return native ? children : React.createElement('div', {
            className: classnames('scr', className, { stress }),
        }, React.createElement('div', {
            children: React.createElement('div', {
                className: 'view',
                style: viewStyle,
                children
            }),
            className: 'wrap',
            ref: this.saveRef,
            onScroll: this.onScroll,
            style: wrapStyle
        }), this.getBar('x'), this.getBar('y'));
    }
}
Scrollor.defaultProps = {
    barClassName: void 0,
    bgColor: void 0,
    className: void 0,
    native: false,
    min: 24,
    offset: 17,
    onScroll: noop,
    stress: true,
    size: void 0,
    start: void 0,
    trackClassName: void 0,
    viewXOffset: void 0
};
if (window.DEV) {
    Scrollor.propTypes = {
        barClassName: PropTypes.string, // 滚动块的类名
        bgColor: PropTypes.string, // 滚动块的背景色
        className: PropTypes.string, // 滚动容器的类名
        native: PropTypes.bool, // 是否使用原生滚动条
        min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 滚动块的最小(可视大小)
        offset: PropTypes.number, // 浏览器默认的滚动条大小
        onScroll: PropTypes.func,// 滚动事件
        size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 轨道的大小
        stress: PropTypes.bool, // 应激性
        start: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),// 初始定位
        trackClassName: PropTypes.string, // 滚动轨道的类名
        viewXOffset: PropTypes.number, // 内容区右侧内间距
    };
}