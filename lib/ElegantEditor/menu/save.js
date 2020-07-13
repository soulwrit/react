import React from 'react';
export default {
    name: 'save',
    override: false,
    view(master) {
        return React.createElement('i', {
            className: 'reico reico-save',
            onClick: () => {
                if (typeof master.onSave === 'function') {
                    master.onSave(master);
                }
            },
            title: '保存',
            style: master.iconStyle,
        });
    }
}