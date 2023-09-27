import React from 'react';
import useAuth from '../../API/useAuth';
import { Cancel,Google,HdrAuto } from '@mui/icons-material';
import Modal from 'react-bootstrap/Modal';

const AuthModal = ({ show,handleCancel }) => {
    const screenWidth = screen.width;
    const { authWithGoogle } = useAuth();

    return (
        <Modal
            bsPrefix={`modal ${1200 > screenWidth > 600 ? 'resetModal' : ''}`}
            show={show}
            onHide={handleCancel}
            centered>
            <Modal.Header>
                <Modal.Title>
                    Sign In First To Play Online
                </Modal.Title>
                <Cancel style={{ cursor: 'pointer' }} onClick={handleCancel} />
            </Modal.Header>
            <button className='m-4 authbtn' onClick={authWithGoogle}>Sign In With Google <Google /></button>
        </Modal>
    );
};

export default AuthModal;
