import React from 'react';
export default {
    name: 'bold',
    override: false,
    view(master) {
        return React.createElement('i', {
            className: 'reico reico-bold',
            onClick: () => {
                document.execCommand('bold');
            },
            style: master.iconStyle,
            title: '加粗',
        });
    }
}