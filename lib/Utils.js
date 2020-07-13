import React from 'react';
import { mount } from './Common/global';
import { Alert } from './Modal/Alert';
import { Confirm } from './Modal/Confirm';
import { Prompt } from './Modal/Prompt';

export function prompt(message, defaultValue, title) {
    return new Promise((resolve, reject) => {
        const element = React.createElement(Prompt, {
            title,
            defaultValue,
            subTitle: message,
            onOK(value) {
                resolve(value);
            },
            onCancel() {
                unmount();
                reject();
            }
        });
        const unmount = mount(element);
    }).catch(() => void 0);
}

export function alert(message, title) {
    return new Promise(resolve => {
        const element = React.createElement(Alert, {
            title,
            subTitle: message,
            onClose() {
                resolve();
                unmount();
            }
        });
        const unmount = mount(element);
    }).catch(() => void 0);
}

export function confirm(message, title) {
    return new Promise(resolve => {
        const element = React.createElement(Confirm, {
            title,
            subTitle: message,
            onClose(value) {
                resolve(value);
                unmount();
            }
        });
        const unmount = mount(element);
    }).catch(() => false);
}
