import '@writ/scss/components/modalPlus.scss';
import React, { useContext, useEffect, useState, } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { ConfigContext } from '../Config/Context';
import { Flex, FlexItem } from '../Flex';

export const Alert = props => {
    const { onClose, subTitle, title } = props;
    const { appTitle } = useContext(ConfigContext);
    const [visible, setVisible] = useState(true);
    const onCloseWrapper = () => {
        setVisible(false);
    };

    useEffect(() => {
        if (visible === false) {
            onClose && onClose();
        }
    }, [visible]);

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
                    <Button onClick={onCloseWrapper}>确定</Button>
                </FlexItem>
            </Flex>
        </Modal>
    );
}

Alert.defaultProps = {};
if (window.DEV) {
    Alert.propTypes = {
        onClose: PropTypes.func,
        subTitle: PropTypes.any,
        title: PropTypes.any,
    }
}
