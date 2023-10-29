import React from 'react';

const RoomModal = ({ show,handleCancel,children }) => {
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
        </Modal>
    );
};

export default RoomModal;