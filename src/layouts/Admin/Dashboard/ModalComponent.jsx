import React, { useEffect, useState, useRef, memo } from 'react';
import { Modal, Button } from 'antd';
import ButtonCreateComponent from '../../../components/Buttons/ButtonCreateComponent';

function ModalComponent(props) {
    return (
        <>
            <Modal
                title="Create transports"
                centered
                visible={props.visible}
                onOk={() => props.setVisible(false)}
                onCancel={() => props.setVisible(false)}
                width={1200}
                okText={<span>Create</span>}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </>
    )
}

export default memo(ModalComponent);