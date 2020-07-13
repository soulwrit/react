import React from 'react';
export default {
    name: 'italic',
    override: false,
    view(master) {
        return React.createElement('i', {
            className: 'reico reico-italic',
            onClick: () => {
                document.execCommand('italic');
            },
            title: '斜体',
            style: master.iconStyle
        });
    }
}