import React from 'react';
export default {
    name: 'list',
    override: false,
    view(master) {
        return [
            React.createElement('i', {
                className: 'reico reico-orderedlist',
                key: 0,
                onClick: () => {
                    document.execCommand('insertOrderedList');
                },
                title: '有序列表',
                style: master.iconStyle,
            }),
            React.createElement('i', {
                className: 'reico reico-unorderedlist',
                key: 1,
                onClick: () => {
                    document.execCommand('insertUnorderedList');
                },
                title: '无序列表',
                style: master.iconStyle,
            }),
        ];
    }
}