import React, { useContext, useEffect, useState, } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import { Input } from '../Input';
import { Modal } from '../Modal';
import { ConfigContext } from '../Config/Context';
import { Flex, FlexItem } from '../Flex';

export const Prompt = (props) => {
    const { defaultValue, onCancel, onOK, subTitle, title, } = props;
    const { appTitle } = useContext(ConfigContext);
    const [value, setValue] = useState(defaultValue);
    const [visible, setVisible] = useState(true);
    const [type, setType] = useState(-1);
    const onCloseWrapper = () => {
        setVisible(false);
        setType(0);
    };
    const onOKWrapper = () => {
        setVisible(false);
        setType(1);
    };

    useEffect(() => {
        if (visible === false) {
            switch (type) {
                case 0:
                    onCancel && onCancel();
                    break;
                case 1:
                    onOK && onOK(value);
                    break;
                default: break;
            }
        }
    }, [visible, type]);

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
                    <Input value={defaultValue} width='100%' onChange={setValue} />
                    <p style={{marginTop: '1em'}}>
                        <Button onClick={onOKWrapper}>确定</Button>
                        <Button onClick={onCloseWrapper} theme='muted'>取消</Button>
                    </p>
                </FlexItem>
            </Flex>
        </Modal>
    );
}

Prompt.defaultProps = {};
if (window.DEV) {
    Prompt.propTypes = {
        onCancel: PropTypes.func,
        onOK: PropTypes.func,
        subTitle: PropTypes.any,
        title: PropTypes.any,
    }
}
