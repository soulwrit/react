import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from './Modal';
import { Button } from './Button';
export const Confirm = props => {
    const { children, onClose, onConfirm, size, title, visible, width } = props;

    return (
        <Modal visible={visible} onClose={onClose} size={size} title={title} footer={
            <>
                <Button theme='primary' size={size} onClick={onConfirm}>确定</Button>
                <Button theme='muted' size={size} onClick={onClose}>取消</Button>
            </>
        } width={width}> {children} </Modal>
    );
}
Confirm.defaultProps = {
    width: 450
};
if (window.DEV) {
    Confirm.propTypes = {
        onClose: PropTypes.func,
        onConfirm: PropTypes.func,
    };
}