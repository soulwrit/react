import '@writ/scss/components/inputFileList.scss';
import React from 'react';
import classnames from 'classnames';
import fst from '@writ/utils/file-size-transform';

import { CSSUtil } from '../../dependency';
import { ProgressBar } from '../ProgressBar';
import { ReactComponent as IconFile } from '../../../icons/file.svg';
import { ReactComponent as IconImage } from '../../../icons/image.svg';
import { getDownloadText, getPreviewText, getRemoveText, getUploadText } from './util';

export default function List(props, inputProps) {
    const { fileList } = this.state;
    const pointProps = props.readonly ? { className: classnames(CSSUtil.upload, 'point', 'readonly'), style: props.style } : {
        className: classnames(CSSUtil.upload, 'point'),
        onClick: this.onClick,
        onKeyDown: this.onKeyDown,
        style: props.style
    };

    return (
        <>
            {React.createElement('div', pointProps, React.createElement('input', inputProps), props.children)}
            {props.message}
            <div className={classnames(CSSUtil.upload, props.className, 'list')}>
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