import '@writ/scss/components/inputFilePicture.scss';
import React from 'react';
import classnames from 'classnames';
import { Cover } from '../Cover';
import { Loading } from '../Loading';
import { CSSUtil } from '../../dependency';
import { getCoverSrc, getDownloadText, getPreviewText, getRemoveText, getUploadText } from './util';
import { ReactComponent as IconImage } from '../../../icons/image.svg';
export default function Picture(props, inputProps) {
    const { fileList } = this.state;
    const pointProps = { key: fileList.length };

    if (props.readonly) {
        pointProps.className = 'i readonly';
    } else {
        pointProps.children = [
            React.createElement('input', inputProps),
            React.createElement(Cover, {
                ratio: 1,
                key: 1,
                src: null,
            }),
            React.createElement('div', {
                className: 'vc',
                children: React.createElement(IconImage, {
                    className: 'svgico x2'
                }),
                key: 2
            })
        ];
        pointProps.className = 'i';
        pointProps.onClick = this.onClick;
        pointProps.onKeyDown = this.onKeyDown;
    };

    return React.createElement('div', {
        className: classnames(CSSUtil.upload, props.className, 'picture'),
        style: props.style,
    }, fileList.map((file, index) => {
        const status = file.status;

        return React.createElement('div', {
            className: 'i',
            children: [
                React.createElement(Cover, {
                    key: 0,
                    ratio: 1,
                    src: getCoverSrc(file, props)
                }),
                props.readonly ? null : React.createElement('div', {
                    className: 'vc fade',
                    children: React.createElement('div', {
                        children: [
                            file.upload.wait || file.upload.doing || file.upload.not ? React.createElement('span', {
                                children: getUploadText(file.upload, props.icon),
                                className: 'fakelink',
                                key: 'do',
                                onClick: () => this.upload(file),
                            }) : null,

                            file.isImage ? React.createElement('span', {
                                className: 'fakelink',
                                children: getPreviewText(props.icon),
                                key: 'look',
                                onClick: () => this.preview(file),
                            }) : null,

                            file.upload.ok || file.upload.done ? React.createElement('span', {
                                className: 'fakelink',
                                children: getDownloadText(props.icon),
                                key: 'down',
                                onClick: () => this.download(file),
                            }) : null,

                            React.createElement('span', {
                                className: 'fakelink',
                                children: getRemoveText(props.icon),
                                key: 'del',
                                onClick: () => this.remove(file),
                            }),
                        ]
                    }),
                    key: 1
                }),
                !props.readonly && status.progress && status.doing ? React.createElement(Loading, {
                    className: 'spin',
                    key: 'spin',
                    type: 2,
                    value: ''
                }) : null
            ],
            key: index,
        });
    }), React.createElement('div', pointProps));
}