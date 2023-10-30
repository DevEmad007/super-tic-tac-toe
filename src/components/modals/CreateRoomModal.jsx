import React from 'react';
import { Button,Col,Container,Modal,Row } from 'react-bootstrap';
import { useGameContext } from '../../hooks/useGameContext';
import { CopyAll } from '@mui/icons-material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import useSkipRender from '../../hooks/useSkipRender';

const CreateRoomModal = ({ show,handleCancel,roomID }) => {
    const { createRoom } = useGameContext();
    const [ message,setMessage ] = useState('');

    useSkipRender(() => {
        setMessage('');
    },roomID);

    const handleCopy = () => {
        setMessage('copied!');
    };

    const handleCreateRoom = () => {
        createRoom(roomID);
    };

    return (
        <Modal
            show={show}
            onHide={handleCancel}
            backdrop='static'
            centered
            className='p-2'
        >
            <Modal.Body >
                <Container fluid>
                    <Row className='px-4'>
                        <Col className='text-center h3'>
                            <span className='text-nowrap'>
                                Room id
                            </span>
                        </Col>
                        <Col className='text-center'>
                            <CopyToClipboard text={roomID}
                                onCopy={handleCopy}
                            >
                                <span className='text-nowrap'>
                                    {roomID}
                                    <CopyAll sx={{ marginLeft: '10px' }} />
                                    {message}
                                </span>
                            </CopyToClipboard>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                className="w-100 my-2"
                                onClick={handleCreateRoom}
                            >
                                Enter Game
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className="w-100 my-2" onClick={handleCancel}> Cancle </Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default CreateRoomModal;
