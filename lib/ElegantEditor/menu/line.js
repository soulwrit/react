import React from 'react';
export default {
    name: 'line',
    override: false,
    view(master) {
        return [
            React.createElement('i', {
                className: 'reico reico-strike',
                key: 0,
                onClick: () => {
                    document.execCommand('strikethrough');
                },
                title: '删除线',
                style: master.iconStyle,
            }),
            React.createElement('i', {
                className: 'reico reico-underline',
                key: 1,
                onClick: () => {
                    document.execCommand('underline');
                },
                title: '下划线',
                style: master.iconStyle,
            }),
            React.createElement('i', {
                className: 'reico reico-hr',
                key: 2,
                onClick: () => {
                    document.execCommand('underline');
                },
                title: '水平线',
                style: master.iconStyle,
            }),
        ];
    }
}