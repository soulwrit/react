import './_rollupPluginBabelHelpers-cc1db274.js';
import React__default from 'react';
import './index-c0558b2a.js';
import { c as classnames } from './index-dc594463.js';
import { C as CSSUtil } from './dependency-8ea69cb4.js';
import './HoldImage-a3d534a8.js';
import './percentage-d3aa3789.js';
import { Cover } from './cover.js';
import { b as SvgImage } from './image-2de4c9b4.js';
import { Loading } from './loading.js';
import { g as getCoverSrc, a as getUploadText, b as getPreviewText, c as getDownloadText, d as getRemoveText } from './util-38984b34.js';

function Picture(props, inputProps) {
  var _this = this;

  var fileList = this.state.fileList;
  var pointProps = {
    key: fileList.length
  };

  if (props.readonly) {
    pointProps.className = 'i readonly';
  } else {
    pointProps.children = [/*#__PURE__*/React__default.createElement('input', inputProps), /*#__PURE__*/React__default.createElement(Cover, {
      ratio: 1,
      key: 1,
      src: null
    }), /*#__PURE__*/React__default.createElement('div', {
      className: 'vc',
      children: /*#__PURE__*/React__default.createElement(SvgImage, {
        className: 'svgico x2'
      }),
      key: 2
    })];
    pointProps.className = 'i';
    pointProps.onClick = this.onClick;
    pointProps.onKeyDown = this.onKeyDown;
  }
  return /*#__PURE__*/React__default.createElement('div', {
    className: classnames(CSSUtil.upload, props.className, 'picture'),
    style: props.style
  }, fileList.map(function (file, index) {
    var status = file.status;
    return /*#__PURE__*/React__default.createElement('div', {
      className: 'i',
      children: [/*#__PURE__*/React__default.createElement(Cover, {
        key: 0,
        ratio: 1,
        src: getCoverSrc(file, props)
      }), props.readonly ? null : /*#__PURE__*/React__default.createElement('div', {
        className: 'vc fade',
        children: /*#__PURE__*/React__default.createElement('div', {
          children: [file.upload.wait || file.upload.doing || file.upload.not ? /*#__PURE__*/React__default.createElement('span', {
            children: getUploadText(file.upload, props.icon),
            className: 'fakelink',
            key: 'do',
            onClick: function onClick() {
              return _this.upload(file);
            }
          }) : null, file.isImage ? /*#__PURE__*/React__default.createElement('span', {
            className: 'fakelink',
            children: getPreviewText(props.icon),
            key: 'look',
            onClick: function onClick() {
              return _this.preview(file);
            }
          }) : null, file.upload.ok || file.upload.done ? /*#__PURE__*/React__default.createElement('span', {
            className: 'fakelink',
            children: getDownloadText(props.icon),
            key: 'down',
            onClick: function onClick() {
              return _this.download(file);
            }
          }) : null, /*#__PURE__*/React__default.createElement('span', {
            className: 'fakelink',
            children: getRemoveText(props.icon),
            key: 'del',
            onClick: function onClick() {
              return _this.remove(file);
            }
          })]
        }),
        key: 1
      }), !props.readonly && status.progress && status.doing ? /*#__PURE__*/React__default.createElement(Loading, {
        className: 'spin',
        key: 'spin',
        type: 2,
        value: ''
      }) : null],
      key: index
    });
  }), /*#__PURE__*/React__default.createElement('div', pointProps));
}

export default Picture;
