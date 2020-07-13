import React from 'react';
import forThrough from '@writ/utils/for-through';

export default {
    name: 'heading',
    override: false,
    view(master) {
        return [
            React.createElement('i', {
                className: 'reico reico-title',
                key: 0,
                onClick: () => {

                },
                title: '标题',
                style: master.iconStyle,
            }),
            false ? React.createElement('div', {
                children: forThrough(1, 6, i => {
                    const tag = 'h' + i;
                    return React.createElement(tag, {
                        children: tag,
                        key: i,
                        onClick: () => {
                            document.execCommand('formatBlock', '<' + tag + '>');
                        }
                    });
                }),
                key: 1
            }) : null
        ];
    }
}