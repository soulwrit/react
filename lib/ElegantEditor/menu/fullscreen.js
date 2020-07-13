import React from 'react';
import fullscreen from '@writ/utils/dom-fullscreen';
export default {
    name: 'fullscreen',
    override: false,
    view(master) {
        return React.createElement('i', {
            className: 'reico reico-fullscreen',
            onClick: () => {
                fullscreen();
            },
            title: '全屏',
            style: master.iconStyle,
        });
    }
}