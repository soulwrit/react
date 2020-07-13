import '@writ/scss/components/inputFileDragbox.scss';
import React from 'react';
import classnames from 'classnames';
import fst from '@writ/utils/file-size-transform';

import { CSSUtil } from '../../dependency';
import { ProgressBar } from '../ProgressBar';
import { ReactComponent as IconFile } from '../../../icons/file.svg';
import { ReactComponent as IconImage } from '../../../icons/image.svg';
import { ReactComponent as IconInbox } from '../../../icons/inbox.svg';
import { getDownloadText, getPreviewText, getRemoveText, getUploadText } from './util';
import { code } from './statuses';
export default function Dragbox(props, inputProps) {
    const { fileList } = this.state;
    const pointProps = {};

    if (props.readonly) {
        pointProps.className = classnames(CSSUtil.upload, 'inbox xs', 'readonly');
        pointProps.children = props.message || props.children;
    } else {
        pointProps.className = classnames(CSSUtil.upload, 'inbox xs');
        pointProps.children = React.createElement('div', {
            children: [
                React.createElement('input', inputProps),
                React.createElement(IconInbox, {
                    className: 'svgico x3',
                    key: 0
                }),
                React.createElement(React.Fragment, {
                    key: 1,
                    children: props.message || props.children
                })
            ]
        });
        pointProps.onClick = this.onClick;
        pointProps.onKeyDown = this.onKeyDown;
        pointProps.onDrop = e => {
            e.preventDefault();
            if (e.type === 'dragover') {
                return;
            }

            if (this.props.directory) {
                try {
                    const handle = file => {
                        this.fileStack.set(file, code.wait);
                        this.setState({ fileList: this.fileStack.get() }, () => {
                            if (this.props.upload.auto) {
                                this.upload(file);
                            }
                        });
                    };
                    // 读取文件夹是异步的 
                    for (const file of e.dataTransfer.items) {
                        treeTraverse(handle, file.webkitGetAsEntry(), file => {
                            return isAccepted(file, this.props.accept);
                        });
                    }
                } catch (err) {
                    if (this.props.upload.onError) {
                        return this.props.upload.onError(err);
                    }
                    throw err;
                }
                return;
            }

            let files = Array.prototype.slice.call(e.dataTransfer.files).filter(file => {
                return isAccepted(file, this.props.accept);
            });
            if (files.length > 0) {
                if (!this.props.multiple) {
                    files = files.slice(0, 1);
                }

                this.fileStack.set(files, code.wait);
                this.setState({ fileList: this.fileStack.get() }, () => {
                    if (this.props.upload.auto) {
                        if (this.props.upload.bulk) {
                            return console.log('Not Supported.');
                        }
                        this.state.fileList.forEach(file => this.upload(file));
                    }
                });
            }
        };
        pointProps.onDragOver = pointProps.onDrop;
    }

    return (
        <>
            {React.createElement('div', pointProps)}
            <div className={classnames(CSSUtil.upload, props.className, 'list')} style={props.style}>
                {fileList.map((file, index) => {
                    const status = file.status;
                    return (
                        <div className='i xs' key={index}>
                            <div className='name'>
                                {file.isImage ? <IconImage className='svgico x1' /> : <IconFile className='svgico x1' />}
                                {props.showFileSize ? <span className='size'>[{fst.toUpper(file.size)}]</span> : null}
                                <span className='text' title={file.name}>{file.name}</span>
                            </div>
                            {props.readonly || !props.showStatusText ? null : <div className={classnames('status', 'color-'.concat(status.statusName))}>{status.statusText}</div>}
                            {props.readonly ? null :
                                <div className='action'>
                                    {file.upload.wait || file.upload.doing || file.upload.not ? <span className='fakelink' onClick={() => this.upload(file)}> {getUploadText(file.upload, props.icon)} </span> : null}
                                    {file.isImage ? <span className='fakelink' onClick={() => this.preview(file)}>{getPreviewText(props.icon)}</span> : null}
                                    {file.upload.ok || file.upload.done ? <span className='fakelink' onClick={() => this.download(file)}>{getDownloadText(props.icon)}</span> : null}
                                    <span className='fakelink' onClick={() => this.remove(file)}>{getRemoveText(props.icon)}</span>
                                </div>
                            }
                            {!props.readonly && status.progress && status.doing ? <ProgressBar className='fl' value={(status.progress.percentage * 100).toFixed(2)} height={2} /> : null}
                        </div>
                    );
                })}
            </div>
        </>
    );
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
        }

        loop();
    }
}