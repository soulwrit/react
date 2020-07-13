import React from 'react';
export default {
    name: 'link',
    override: false,
    view(master) {
        return [
            React.createElement('i', {
                className: 'reico reico-link',
                key: 0,
                onClick: () => {
                    r.closeModal();
                    var html = '<input type="text" placeholder="www.example.com" class="editor-link-input"/> <button type="button" class="editor-confirm">确认</button>';

                    function btnClick() {
                        var confirm = document.querySelector('.editor-confirm');
                        addEvent(confirm, 'click', function () {
                            var link = document.querySelector('.editor-link-input');
                            if (link.value.trim() != '') {
                                var a = '<a href="' + link.value + '" target="_blank">' + link.value + '</a>';
                                r.execCommand('insertHTML', a);
                                r.closeModal();
                            };
                        }, false);
                    };
                    r.openModal.call(this, html, btnClick);
                    document.execCommand('insertHTML');
                },
                title: '插入链接',
                style: master.iconStyle,
            }),
            React.createElement('i', {
                className: 'reico reico-unlink',
                key: 1,
                onClick: () => {
                    document.execCommand('insertHTML');
                },
                title: '取消链接',
                style: master.iconStyle,
            })
        ];
    }
}