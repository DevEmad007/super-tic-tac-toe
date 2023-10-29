import React from 'react';
import { Button,Col,Container,Modal,Row } from 'react-bootstrap';
import { useGameContext } from '../../hooks/useGameContext';
import { CopyAll } from '@mui/icons-material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import useSkipRender from '../../hooks/useSkipRender';

const CreateRoomModal = ({ show,handleCancel,children }) => {
    const { handleOnlinePlay } = useGameContext();
    const [ message,setMessage ] = useState('');

    useSkipRender(() => {
        setMessage('');
    },children);

    const handleCopy = () => {
        setMessage('copied!');
    };

    return (
        <Modal
            show={show}
            onHide={handleCancel}
            backdrop='static'
            centered
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
                            <CopyToClipboard text={children}
                                onCopy={handleCopy}
                            >
                                <span className='text-nowrap'>
                                    {children}
                                    <CopyAll sx={{ marginLeft: '10px' }} />
                                    {message}
                                </span>
                            </CopyToClipboard>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className="w-100 my-2" onClick={handleOnlinePlay}>Enter Game</Button>
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
