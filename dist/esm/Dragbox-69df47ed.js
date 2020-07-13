import { k as _createForOfIteratorHelper } from './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';
import './assert-console-9d788aa1.js';
import { b as SvgImage } from './image-2de4c9b4.js';
import { S as SvgInbox } from './inbox-1d5b5e62.js';
import { S as SvgFile } from './file-f15f9b54.js';
import { c as code } from './InputFile-78b9b345.js';
import { ProgressBar } from './progressbar.js';
import { a as getUploadText, b as getPreviewText, c as getDownloadText, d as getRemoveText } from './util-38984b34.js';
import { f as fileSizeTransform } from './file-size-transform-85df40e3.js';

function Dragbox(props, inputProps) {
  var _this = this;

  var fileList = this.state.fileList;
  var pointProps = {};

  if (props.readonly) {
    pointProps.className = classnames(CSSUtil.upload, 'inbox xs', 'readonly');
    pointProps.children = props.message || props.children;
  } else {
    pointProps.className = classnames(CSSUtil.upload, 'inbox xs');
    pointProps.children = /*#__PURE__*/React__default.createElement('div', {
      children: [/*#__PURE__*/React__default.createElement('input', inputProps), /*#__PURE__*/React__default.createElement(SvgInbox, {
        className: 'svgico x3',
        key: 0
      }), /*#__PURE__*/React__default.createElement(React__default.Fragment, {
        key: 1,
        children: props.message || props.children
      })]
    });
    pointProps.onClick = this.onClick;
    pointProps.onKeyDown = this.onKeyDown;

    pointProps.onDrop = function (e) {
      e.preventDefault();

      if (e.type === 'dragover') {
        return;
      }

      if (_this.props.directory) {
        try {
          var handle = function handle(file) {
            _this.fileStack.set(file, code.wait);

            _this.setState({
              fileList: _this.fileStack.get()
            }, function () {
              if (_this.props.upload.auto) {
                _this.upload(file);
              }
            });
          }; // 读取文件夹是异步的 


          var _iterator = _createForOfIteratorHelper(e.dataTransfer.items),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var file = _step.value;
              treeTraverse(handle, file.webkitGetAsEntry(), function (file) {
                return isAccepted(file, _this.props.accept);
              });
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        } catch (err) {
          if (_this.props.upload.onError) {
            return _this.props.upload.onError(err);
          }

          throw err;
        }

        return;
      }

      var files = Array.prototype.slice.call(e.dataTransfer.files).filter(function (file) {
        return isAccepted(file, _this.props.accept);
      });

      if (files.length > 0) {
        if (!_this.props.multiple) {
          files = files.slice(0, 1);
        }

        _this.fileStack.set(files, code.wait);

        _this.setState({
          fileList: _this.fileStack.get()
        }, function () {
          if (_this.props.upload.auto) {
            if (_this.props.upload.bulk) {
              return console.log('Not Supported.');
            }

            _this.state.fileList.forEach(function (file) {
              return _this.upload(file);
            });
          }
        });
      }
    };

    pointProps.onDragOver = pointProps.onDrop;
  }

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement('div', pointProps), /*#__PURE__*/React__default.createElement("div", {
    className: classnames(CSSUtil.upload, props.className, 'list'),
    style: props.style
  }, fileList.map(function (file, index) {
    var status = file.status;
    return /*#__PURE__*/React__default.createElement("div", {
      className: "i xs",
      key: index
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "name"
    }, file.isImage ? /*#__PURE__*/React__default.createElement(SvgImage, {
      className: "svgico x1"
    }) : /*#__PURE__*/React__default.createElement(SvgFile, {
      className: "svgico x1"
    }), props.showFileSize ? /*#__PURE__*/React__default.createElement("span", {
      className: "size"
    }, "[", fileSizeTransform.toUpper(file.size), "]") : null, /*#__PURE__*/React__default.createElement("span", {
      className: "text",
      title: file.name
    }, file.name)), props.readonly || !props.showStatusText ? null : /*#__PURE__*/React__default.createElement("div", {
      className: classnames('status', 'color-'.concat(status.statusName))
    }, status.statusText), props.readonly ? null : /*#__PURE__*/React__default.createElement("div", {
      className: "action"
    }, file.upload.wait || file.upload.doing || file.upload.not ? /*#__PURE__*/React__default.createElement("span", {
      className: "fakelink",
      onClick: function onClick() {
        return _this.upload(file);
      }
    }, " ", getUploadText(file.upload, props.icon), " ") : null, file.isImage ? /*#__PURE__*/React__default.createElement("span", {
      className: "fakelink",
      onClick: function onClick() {
        return _this.preview(file);
      }
    }, getPreviewText(props.icon)) : null, file.upload.ok || file.upload.done ? /*#__PURE__*/React__default.createElement("span", {
      className: "fakelink",
      onClick: function onClick() {
        return _this.download(file);
      }
    }, getDownloadText(props.icon)) : null, /*#__PURE__*/React__default.createElement("span", {
      className: "fakelink",
      onClick: function onClick() {
        return _this.remove(file);
      }
    }, getRemoveText(props.icon))), !props.readonly && status.progress && status.doing ? /*#__PURE__*/React__default.createElement(ProgressBar, {
      className: "fl",
      value: (status.progress.percentage * 100).toFixed(2),
      height: 2
    }) : null);
  })));
}

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function isAccepted(file, acceptedFiles) {
  if (file && acceptedFiles) {
    var acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',');
    var fileName = file.name || '';
    var mimeType = file.type || '';
    var baseMimeType = mimeType.replace(/\/.*$/, '');
    return acceptedFilesArray.some(function (type) {
      var validType = type.trim();

      if (validType.charAt(0) === '.') {
        return endsWith(fileName.toLowerCase(), validType.toLowerCase());
      } else if (/\/\*$/.test(validType)) {
        return baseMimeType === validType.replace(/\/.*$/, '');
      }

      return mimeType === validType;
    });
  }

  return true;
}

function treeTraverse(callback, item, isAccepted) {
  if (item.isFile) {
    item.file(function (file) {
      if (isAccepted(file)) {
        if (item.fullPath && !file.webkitRelativePath) {
          Object.defineProperties(file, {
            webkitRelativePath: {
              writable: true
            }
          });
          file.webkitRelativePath = item.fullPath.replace(/^\//, '');
          Object.defineProperties(file, {
            webkitRelativePath: {
              writable: false
            }
          });
        }

        callback(file);
      }
    });
  } else if (item.isDirectory) {
    var dirReader = item.createReader();
    var fileList = [];

    var loop = function loop() {
      dirReader.readEntries(function (entries) {
        var entryList = Array.prototype.slice.apply(entries);
        fileList = fileList.concat(entryList);

        if (!entryList.length) {
          return fileList.forEach(function (entryItem) {
            treeTraverse(callback, entryItem, isAccepted);
          });
        } else {
          loop();
        }
      });
    };

    loop();
  }
}

export default Dragbox;
