import React from 'react';
export default {
    name: 'color',
    override: false,
    view(master) {
        return [
            React.createElement('i', {
                className: 'reico reico-font-color',
                key: 1,
                onClick: () => {
                    document.execCommand('foreColor', '#fff');
                },
                title: '字体颜色',
                style: master.iconStyle,
            }),
            React.createElement('i', {
                className: 'reico reico-bgcolor',
                key: 0,
                onClick: () => {
                    document.execCommand('hiliteColor', '#fff');
                },
                style: master.iconStyle,
                title: '背景色',
            }),
        ];
    }
}