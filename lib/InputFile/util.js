import React from 'react';
import { ReactComponent as IconUpload } from '../../../icons/upload.svg';
import { ReactComponent as IconDownload } from '../../../icons/download.svg';
import { ReactComponent as IconLook } from '../../../icons/look.svg';
import { ReactComponent as IconRemove } from '../../../icons/remove.svg';
import { ReactComponent as IconAbort } from '../../../icons/abort.svg';
import { ReactComponent as IconRedo } from '../../../icons/redo.svg';

export function getCoverSrc(file, getPath) {
    var path = typeof getPath === 'function' ? getPath(file) : file.path;

    return file.isImage ? path instanceof File ? window.URL.createObjectURL(path) : path : undefined;
}

export function getUploadText(status, icon) {
    return icon ? React.createElement(status.wait ? IconUpload : status.doing ? IconAbort : IconRedo, {
        className: 'svgico x1'
    }) : status.wait ? '上传' : status.doing ? '中止' : '重新上传';
}

export function getPreviewText(icon) {
    return icon ? React.createElement(IconLook, {
        className: 'svgico x1'
    }) : '预览';
}

export function getDownloadText(icon) {
    return icon ? React.createElement(IconDownload, {
        className: 'svgico x1'
    }) : '下载';
}

export function getRemoveText(icon) {
    return icon ? React.createElement(IconRemove, {
        className: 'svgico x1'
    }) : '删除';
}