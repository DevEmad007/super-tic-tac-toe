import React,{ useState } from 'react';
import { Button,Modal,Form } from 'react-bootstrap';
import { useGameContext } from '../../hooks/useGameContext';

const JoinRoom = ({ show,cancelModal }) => {
    const [ roomID,setRoomID ] = useState();
    const { joinRoom } = useGameContext();

    const handleJoin = () => {
        joinRoom(roomID.toString());
    };

    return (
        <Modal
            show={show}
            centered
            onHide={cancelModal}
            className='p-2'
        >
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>
                            Enter Room ID
                        </Form.Label>
                        <Form.Control autoFocus onChange={e => setRoomID(e.target.value)} type="number"></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Button
                className='mx-3 mt-2 m-3'
                onClick={handleJoin}>
                Join
            </Button>
        </Modal>
    );
};

export default JoinRoom;
