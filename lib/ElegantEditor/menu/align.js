import React from 'react';
export default {
    name: 'align',
    override: false,
    view(master) {
        return [
            getAction(0, '缩减', 'indent', 'indent', master),
            getAction(1, '减少缩进', 'outdent', 'outdent', master),
            getAction(2, '居左', 'alignleft', 'justifyLeft', master),
            getAction(3, '居中', 'aligncenter', 'justifyCenter', master),
            getAction(4, '居右', 'alignright', 'justifyRight', master),
            getAction(5, '两端对齐', 'alignjustify', 'justifyFull', master),
        ];
    }
}
function getAction(key, title, icon, command, master) {
    return React.createElement('i', {
        className: 'reico reico-' + icon,
        key,
        onClick() {
            document.execCommand(command);
        },
        title,
        style: master.iconStyle
    });
}