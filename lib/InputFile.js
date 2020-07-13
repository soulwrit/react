import '@writ/scss/components/inputFile.scss';
import React from 'react';
import PropTypes from 'prop-types';
import assert from '@writ/utils/assert-console';
import assertCall from '@writ/utils/assert-call';
import request from '@writ/utils/request-fetch';
import promisify from '@writ/utils/promisify';

import { FileStack } from './InputFile/fileStack';
import { code } from './InputFile/statuses';

class InputFile extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        if ('fileList' in nextProps) {
            return {
                fileList: nextProps.fileList || []
            };
        }

        return null;
    }
    constructor(props) {
        super();
        this.fileInput = null;
        this.fileStack = new FileStack(props.value, code.done);
        this.state = {
            fileList: this.fileStack.get(),
            render: props.render
        };
        this.loadView(!!props.render, props.type);
    }
    loadView(isCustomized, key) {
        if (isCustomized === false) {
            let render;
            switch (key) {
                case 'picture':
                    render = import('./InputFile/Picture');
                    break;
                case 'dragbox':
                    render = import('./InputFile/Dragbox');
                    break;
                case 'list':
                default:
                    render = import('./InputFile/List');
                    break;
            }

            return render.then(res => {
                this.setState({
                    render: res.default
                });
            }).catch(err => assert(false, err));
        }
    }
    bindFileInputRef = element => this.fileInput = element
    onClick = () => {
        if (!this.fileInput) return;

        this.fileInput.value = '';
        this.fileInput.click();
    }
    onKeyDown = e => {
        if (e.key === 'Enter') this.onClick();
    }
    onChange = e => {
        const files = Array.prototype.slice.call(e.target.files);

        if (this.props.onChange && this.props.onChange(files)) {
            return;
        }

        if (!this.props.multiple) {
            this.fileStack.clear(); // 单文件模式
            if (files.length > 1) {
                files.splice(1);
            }
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
    // 数据请求
    request(file, key) {
        if (!this.props[key]) {
            return assert(false, '请提供与'.concat(key).concat('对应的处理方案！'));
        }

        const props = this.props;
        const { method, action, body, onBefore, onError, onOK, onProgress, onAbort, option, dataType } = props[key];
        const status = file[key];
        const required = [
            promisify(action, file),
            promisify(body, file, props)
        ];

        return Promise.all(required).then(([action, body]) => {
            const rOption = {};
            const fetchOpt = Object.assign({
                headers: props.headers,
                mode: typeof props.cors === 'boolean' ? 'cors' : props.cors
            }, option);

            for (const key in fetchOpt) {
                if (fetchOpt.hasOwnProperty(key)) {
                    rOption[key] = fetchOpt[key];
                }
            }

            rOption.action = action;
            rOption.body = body;
            rOption.download = key === 'download';
            rOption.contentLength = file.size;
            rOption.method = method || 'post';
            rOption.onOK = res => res[dataType || props.dataType || 'json']();
            rOption.onBefore = (opt, controller) => {
                const befored = onBefore ? onBefore(opt, file) : void 0;

                status.status = code.doing;
                status.abort = callback => {
                    status.abort = null;
                    controller.abort();
                    status.status = code.not;
                    status.progress = null;
                    this.setState({ fileList: this.fileStack.get() }, () => {
                        if (onAbort) onAbort(file);
                        typeof callback === 'function' ? callback() : null;
                    });
                };

                this.setState({ fileList: this.fileStack.get() }, () => {
                    if (befored === false) {
                        status.abort();
                    }
                });

                if (befored === false) {
                    status.abort();
                    return false;  // 由用户取消 
                }
            };
            rOption.onProgress = progress => {
                status.progress = progress;
                this.setState({ fileList: this.fileStack.get() }, () => {
                    if (onProgress) onProgress(file);
                });
            };

            return request(rOption).then(ret => {
                status.abort = null;
                status.progress = null;
                if (onOK) {
                    ret = onOK(ret, file);
                }

                if (ret) {
                    const timer = setTimeout(() => {
                        clearTimeout(timer);
                        status.status = code.ok;
                        if (key === 'remove') {
                            this.fileStack.remove(file); // 从fileList中删除该文件
                        }
                        this.setState({ fileList: this.fileStack.get() }, () => {
                            if (key === 'upload') {
                                file.path = Object.assign({ name: file.name }, ret);
                            }
                        });
                    }, 100);
                } else {
                    status.status = code.not;
                    throw new Error('User Defined Expection.');
                }
            }).catch(err => {
                status.abort = null;
                status.progress = null;
                status.status = code.not;
                this.setState({ fileList: this.fileStack.get() }, () => {
                    if (onError) return onError(err, file);
                    assert(false, err);
                });
            });
        });
    }
    // 图片预览
    preview(file) {
        if (this.props.preview) {
            this.props.
                preview(file);
        }
    }
    // 文件上传
    upload(file) {
        if (!(file.path instanceof File)) {
            // 已经上传过了 
            return assertCall(
                this.props.upload && this.props.upload.onError,
                '`FakeFile` not map to native `File` instance.'
            );
        }
        file.status = file.upload;
        // 文件已经上传 文件上传成功
        if (file.upload.done || file.upload.ok) {
            return;
        }
        // 文件上传中, 中止
        if (file.upload.doing) {
            return file.upload.abort();
        }
        // 开始上传
        return this.request(file, 'upload');
    }
    // 文件下载
    download(file) {
        file.status = file.download;
        // 避免重复下载，当文件已经下载了，就返回一个错误
        if (file.download.ok || file.download.done) {
            return assertCall(
                this.props.download && this.props.download.onError,
                '文件已经下载到了本地，请不要重复下载！'
            );
        }
        // 文件正子啊下载中，中止下载
        if (file.download.doing) {
            return file.download.abort();
        }
        // 文件已经删除或者正在删除，不能下载
        if (file.remove.ok || file.remove.done || file.remove.doing) {
            return assertCall(
                this.props.download && this.props.download.onError,
                '文件正在删除，或者已删除，无法下载'
            );
        }
        // 文件加入 fileList 但没有上传，不能下载
        if (file.upload.wait) {
            return assertCall(
                this.props.download && this.props.download.onError,
                '文件还没有上传，无法下载，可以尝试预览或本地浏览！'
            );
        }
        // 文件正在上传或者上传出错，不能下载
        if (file.upload.doing || file.upload.not) {
            return assertCall(
                this.props.download && this.props.download.onError,
                '文件正在上传或者上传失败，无法从服务器下载！'
            );
        }
        // 已经上传至服务器空间, 从服务端下载
        if (file.upload.done || file.upload.ok) {
            return this.request(file, 'download');
        }
    }
    // 文件删除
    remove(file) {
        file.status = file.remove;
        // 文件正在删除中, [中止删除]
        if (file.remove.doing) {
            return file.remove.abort();
        }

        // 上传中, 先终止上传
        if (file.upload.doing) {
            if (!!(this.props.remove || {}).force) {
                return file.upload.abort();
            }
            return assertCall(
                this.props.remove && this.props.remove.onError,
                '文件正在上传中，不可删除'
            );
        }

        // 下载中,说明文件已经上传至服务器，需要先终止下载
        if (file.download.doing) {
            if (!!(this.props.remove || {}).force) {
                return file.download.abort(() => {
                    return this.request(file, 'remove');
                });
            }

            return assertCall(
                this.props.remove && this.props.remove.onError,
                '文件正在下载中，不可删除'
            );
        }

        // 已经上传至服务器空间, 从服务端删除 
        if (file.upload.done || file.upload.ok) {
            return this.request(file, 'remove');
        }

        // 从fileStack中移除当前文件
        this.fileStack.remove(file);
        this.setState({ fileList: this.fileStack.get() }, () => {
            if (this.props.remove && this.props.remove.onOK) {
                return this.props.remove.onOK(file);
            }
        });
    }
    render() {
        const props = this.props;
        const render = this.state.render || props.render;
        const inputProps = {
            accept: props.accept,
            directory: props.directory ? 'directory' : null,
            multiple: props.multiple,
            onClick: e => e.stopPropagation(),
            onChange: this.onChange,
            ref: this.bindFileInputRef,
            style: { display: 'none' },
            tabIndex: '0',
            type: 'file',
            webkitdirectory: props.directory ? 'webkitdirectory' : null,
            name: props.name,
            key: 'input'
        };

        return typeof render === 'function' ? render.call(this, props, inputProps) : props.children;
    }
}

InputFile.defaultProps = {
    name: 'file',
    type: 'list',
    icon: true
};

export { InputFile };

if (window.DEV) {
    const requestType = {
        action: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired, // 请求的URL
        body: PropTypes.oneOfType([PropTypes.Object, PropTypes.func]).isRequired, // 请求时附带的参数
        method: PropTypes.string, // 请求使用的http方法
        onAbort: PropTypes.func,  // 请求被中止
        onBefore: PropTypes.func, // 请求开始执行前
        onError: PropTypes.func,  // 请求产生错误
        onOK: PropTypes.func.isRequired, // 请求执行成功
        option: PropTypes.object, // fetch请求时的配置参数
        dataType: PropTypes.oneOf(['arrayBuffer', 'blob', 'json', 'text', 'formData']), // 返回值处理类型
    };
    const upRequestType = PropTypes.shape({
        auto: PropTypes.bool, // 是否自动上传
        bulk: PropTypes.bool, // 是否批量上传，该功能目前不支持
        ...requestType
    });
    const dnRequestType = PropTypes.shape({
        bulk: PropTypes.bool, // 是否批量下载，该功能目前不支持
        ...requestType
    });
    const rmRequestType = PropTypes.shape({
        bulk: PropTypes.bool, // 批量删除
        // 如果为true，则文件正在下载中时，用户点击删除，将强行中止下载，执行删除；
        // 反之，则退出提示正在执行的操作
        force: PropTypes.force,
        ...requestType
    });

    InputFile.propTypes = {
        accept: PropTypes.string,   // 同 input 的 accept 属性
        directory: PropTypes.bool,  // 同 input 的 directory 属性
        name: PropTypes.string,     // input file 字段名称
        multiple: PropTypes.bool,   // 多文件模式，同 input 的 multiple 属性
        onChange: PropTypes.func, // input file 产生变化时的相应 

        upload: PropTypes.objectOf(upRequestType).isRequired, // 文件上传
        download: PropTypes.objectOf(dnRequestType), // 文件下载
        remove: PropTypes.objectOf(rmRequestType), // 文件删除
        preview: PropTypes.func, // 图片预览

        value: PropTypes.array, // 默认的 fileList
        fileList: PropTypes.array, // 用于受控模式，管理文件列表
        message: PropTypes.any, // 提示信息，可友好提醒用户 

        readonly: PropTypes.bool, // 只读模式
        disabled: PropTypes.bool, // 禁用模式
        type: PropTypes.oneOf('list', 'picture', 'dragbox'), // 视图类型
        render: PropTypes.func, // 自定义视图,
        showFileSize: PropTypes.bool, // 显示文件大小
        showStatusText: PropTypes.bool, // 显示请求过程中的状态文本
        headers: PropTypes.object, // 请求头
        cors: PropTypes.bool, // 是否跨域
        dataType: requestType.dataType, // 期待的http返回值格式
        icon: PropTypes.bool, // 是否启用 icon 代替按钮文本
        getPath: PropTypes.func, // 返回文件相对于服务器的路径函数
    };
}