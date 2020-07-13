import React__default from 'react';

var align = {
  name: 'align',
  override: false,
  view: function view(master) {
    return [getAction(0, '缩减', 'indent', 'indent', master), getAction(1, '减少缩进', 'outdent', 'outdent', master), getAction(2, '居左', 'alignleft', 'justifyLeft', master), getAction(3, '居中', 'aligncenter', 'justifyCenter', master), getAction(4, '居右', 'alignright', 'justifyRight', master), getAction(5, '两端对齐', 'alignjustify', 'justifyFull', master)];
  }
};

function getAction(key, title, icon, command, master) {
  return /*#__PURE__*/React__default.createElement('i', {
    className: 'reico reico-' + icon,
    key: key,
    onClick: function onClick() {
      document.execCommand(command);
    },
    title: title,
    style: master.iconStyle
  });
}

var blockquote = {
  name: 'blockquote',
  override: false,
  view: function view(master) {
    var _this = this;

    return /*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-blockquote',
      onClick: function onClick() {
        var editor = _this.editor;
        var $selectionElem = editor.selection.getSelectionContainerElem();
        var nodeName = $selectionElem.getNodeName();

        if (!UA.isIE()) {
          if (nodeName === 'BLOCKQUOTE') {
            // 撤销 quote
            editor.cmd["do"]('formatBlock', '<P>');
          } else {
            // 转换为 quote
            editor.cmd["do"]('formatBlock', '<BLOCKQUOTE>');
          }

          return;
        } // IE 中不支持 formatBlock <BLOCKQUOTE> ，要用其他方式兼容


        var content, $targetELem;

        if (nodeName === 'P') {
          // 将 P 转换为 quote
          content = $selectionElem.text();
          $targetELem = $("<blockquote>".concat(content, "</blockquote>"));
          $targetELem.insertAfter($selectionElem);
          $selectionElem.remove();
          return;
        }

        if (nodeName === 'BLOCKQUOTE') {
          // 撤销 quote
          content = $selectionElem.text();
          $targetELem = $("<p>".concat(content, "</p>"));
          $targetELem.insertAfter($selectionElem);
          $selectionElem.remove();
        }
      },
      style: master.iconStyle,
      title: '引用'
    });
  }
};

var bold = {
  name: 'bold',
  override: false,
  view: function view(master) {
    return /*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-bold',
      onClick: function onClick() {
        document.execCommand('bold');
      },
      style: master.iconStyle,
      title: '加粗'
    });
  }
};

var code = {
  name: 'code',
  override: false,
  view: function view(master, editor, footer) {
    return /*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-code',
      onClick: function onClick() {
        document.execCommand('bold');
      },
      style: master.iconStyle,
      title: '代码块'
    });
  }
}; // 构造函数

var color = {
  name: 'color',
  override: false,
  view: function view(master) {
    return [/*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-font-color',
      key: 1,
      onClick: function onClick() {
        document.execCommand('foreColor', '#fff');
      },
      title: '字体颜色',
      style: master.iconStyle
    }), /*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-bgcolor',
      key: 0,
      onClick: function onClick() {
        document.execCommand('hiliteColor', '#fff');
      },
      style: master.iconStyle,
      title: '背景色'
    })];
  }
};

var doing = {
  name: 'doing',
  override: false,
  view: function view(master) {
    return [/*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-undo',
      key: 0,
      onClick: function onClick() {
        document.execCommand('undo');
      },
      style: master.iconStyle,
      title: '撤销'
    }), /*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-redo',
      key: 1,
      onClick: function onClick() {
        document.execCommand('redo');
      },
      style: master.iconStyle,
      title: '重做'
    })];
  }
};

var fontSize = {
  name: 'fontSize',
  override: false,
  view: function view(master) {
    return /*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-font-size',
      onClick: function onClick() {
        document.execCommand('fontSize');
      },
      title: '字体大小',
      style: master.iconStyle
    });
  }
}; // 构造函数

/**
 * 跨浏览器全屏
 */
function fullScreen() {
  if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
    var docElm = document.documentElement;

    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

var fullscreen = {
  name: 'fullscreen',
  override: false,
  view: function view(master) {
    return /*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-fullscreen',
      onClick: function onClick() {
        fullScreen();
      },
      title: '全屏',
      style: master.iconStyle
    });
  }
};

var heading = {
  name: 'heading',
  override: false,
  view: function view(master) {
    return [/*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-title',
      key: 0,
      onClick: function onClick() {},
      title: '标题',
      style: master.iconStyle
    }),  null];
  }
};

var image = {
  name: 'image',
  override: false,
  view: function view(master) {
    return /*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-image',
      onClick: function onClick() {
        var fi = document.querySelector('.editor-file-input');

        function change(e) {
          var files = e.target.files;
          var file = null;
          var url = null;

          if (files && files.length > 0) {
            file = files[0];

            try {
              var fileReader = new FileReader();

              fileReader.onload = function (e) {
                url = e.target.result;
                var img = '<img src="' + url + '"/>';
                document.execCommand('insertHTML', false, img);
              };

              fileReader.readAsDataURL(file);
            } catch (e) {}
          }

          r.closeModal();
        }
        fi.onchange = change;
      },
      title: '插入图片',
      style: master.iconStyle
    });
  }
}; // 构造函数

var italic = {
  name: 'italic',
  override: false,
  view: function view(master) {
    return /*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-italic',
      onClick: function onClick() {
        document.execCommand('italic');
      },
      title: '斜体',
      style: master.iconStyle
    });
  }
};

var line = {
  name: 'line',
  override: false,
  view: function view(master) {
    return [/*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-strike',
      key: 0,
      onClick: function onClick() {
        document.execCommand('strikethrough');
      },
      title: '删除线',
      style: master.iconStyle
    }), /*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-underline',
      key: 1,
      onClick: function onClick() {
        document.execCommand('underline');
      },
      title: '下划线',
      style: master.iconStyle
    }), /*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-hr',
      key: 2,
      onClick: function onClick() {
        document.execCommand('underline');
      },
      title: '水平线',
      style: master.iconStyle
    })];
  }
};

var link = {
  name: 'link',
  override: false,
  view: function view(master) {
    var _this = this;

    return [/*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-link',
      key: 0,
      onClick: function onClick() {
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
            }
          }, false);
        }
        r.openModal.call(_this, html, btnClick);
        document.execCommand('insertHTML');
      },
      title: '插入链接',
      style: master.iconStyle
    }), /*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-unlink',
      key: 1,
      onClick: function onClick() {
        document.execCommand('insertHTML');
      },
      title: '取消链接',
      style: master.iconStyle
    })];
  }
};

var list = {
  name: 'list',
  override: false,
  view: function view(master) {
    return [/*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-orderedlist',
      key: 0,
      onClick: function onClick() {
        document.execCommand('insertOrderedList');
      },
      title: '有序列表',
      style: master.iconStyle
    }), /*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-unorderedlist',
      key: 1,
      onClick: function onClick() {
        document.execCommand('insertUnorderedList');
      },
      title: '无序列表',
      style: master.iconStyle
    })];
  }
};

var save = {
  name: 'save',
  override: false,
  view: function view(master) {
    return /*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-save',
      onClick: function onClick() {
        if (typeof master.onSave === 'function') {
          master.onSave(master);
        }
      },
      title: '保存',
      style: master.iconStyle
    });
  }
};

var table = {
  name: 'table',
  override: false,
  view: function view(master) {
    return /*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-table',
      onClick: function onClick() {
        document.execCommand('insertHTML');
      },
      title: '插入表格',
      style: master.iconStyle
    });
  }
}; // 构造函数

var video = {
  name: 'video',
  override: false,
  view: function view(master) {
    return /*#__PURE__*/React__default.createElement('i', {
      className: 'reico reico-video',
      onClick: function onClick() {
        document.execCommand('bold');
      },
      title: '插入视频',
      style: master.iconStyle
    });
  }
}; // 构造函数

var _default = [heading, fontSize, color, bold, italic, line, align, blockquote, code, link, list, table, image, video, doing, fullscreen, save];

export default _default;
