import '@writ/scss/components/modalPlus.scss';
import React, { useContext, useEffect, useState, } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { ConfigContext } from '../Config/Context';
import { Flex, FlexItem } from '../Flex';

export const Confirm = props => {
    const { onClose, subTitle, title } = props;
    const { appTitle } = useContext(ConfigContext);
    const [visible, setVisible] = useState(true);
    const [value, setValue] = useState(false);

    const onCloseWrapper = () => {
        setVisible(false);
        setValue(false);
    };
    const onOKWrapper = () => {
        setVisible(false);
        setValue(true);
    };

    useEffect(() => {
        if (visible === false) {
            onClose && onClose(value);
        }
    }, [value, visible]);

    return (
        <Modal
            escOut={false}
            maskClosable={false}
            onClose={onCloseWrapper}
            visible={visible}
            width={420}
        >
            <Flex dir='ttr'>
                <FlexItem shrink={0} className='hdbar'><h6>{title || appTitle}</h6></FlexItem>
                <FlexItem shrink={0} className='bdbar'>{subTitle}</FlexItem>
                <FlexItem shrink={0} className='ftbar'>
                    <Button onClick={onOKWrapper}>确定</Button>
                    <Button onClick={onCloseWrapper} theme='muted'>取消</Button>
                </FlexItem>
            </Flex>
        </Modal>
    );
}

Confirm.defaultProps = {};
if (window.DEV) {
    Confirm.propTypes = {
        onClose: PropTypes.func,
        subTitle: PropTypes.any,
        title: PropTypes.any,
    }
}
