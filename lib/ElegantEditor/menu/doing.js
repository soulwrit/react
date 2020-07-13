import React from 'react';
export default {
    name: 'doing',
    override: false,
    view(master) {
        return [
            React.createElement('i', {
                className: 'reico reico-undo',
                key: 0,
                onClick: () => {
                    document.execCommand('undo');
                },
                style: master.iconStyle,
                title: '撤销',
            }),
            React.createElement('i', {
                className: 'reico reico-redo',
                key: 1,
                onClick: () => {
                    document.execCommand('redo');
                },
                style: master.iconStyle,
                title: '重做',
            }),
        ];
    }
}