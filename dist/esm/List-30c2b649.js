import './_rollupPluginBabelHelpers-62f9ecef.js';
import React__default from 'react';
import './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';
import { b as SvgImage } from './image-2de4c9b4.js';
import { S as SvgFile } from './file-f15f9b54.js';
import { ProgressBar } from './progressbar.js';
import { a as getUploadText, b as getPreviewText, c as getDownloadText, d as getRemoveText } from './util-38984b34.js';
import { f as fileSizeTransform } from './file-size-transform-85df40e3.js';

function List(props, inputProps) {
  var _this = this;

  var fileList = this.state.fileList;
  var pointProps = props.readonly ? {
    className: classnames(CSSUtil.upload, 'point', 'readonly'),
    style: props.style
  } : {
    className: classnames(CSSUtil.upload, 'point'),
    onClick: this.onClick,
    onKeyDown: this.onKeyDown,
    style: props.style
  };
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement('div', pointProps, /*#__PURE__*/React__default.createElement('input', inputProps), props.children), props.message, /*#__PURE__*/React__default.createElement("div", {
    className: classnames(CSSUtil.upload, props.className, 'list')
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

export default List;
