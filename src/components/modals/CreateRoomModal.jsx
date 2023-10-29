import React from 'react';
import { Button,Modal } from 'react-bootstrap';
import { useGameContext } from '../../hooks/useGameContext';

const CreateRoomModal = ({ show,handleCancel,children }) => {
    const { handleOnlinePlay } = useGameContext();
    return (
        <Modal
            show={show}
            onHide={handleCancel}
            backdrop='static'
            centered
        >
            <Modal.Body >
                {children}
            </Modal.Body>
            <Button onClick={handleOnlinePlay}>Enter Game</Button>
            <Button onClick={handleCancel}> Cancle </Button>
        </Modal>
    );
};

export default CreateRoomModal;
