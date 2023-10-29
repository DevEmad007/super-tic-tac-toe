import React,{ useState } from 'react';
import { Button,Modal,Form } from 'react-bootstrap';
import useDb from '../../API/useDb';
import { useGameContext } from '../../hooks/useGameContext';

const JoinRoom = ({ show,cancelModal }) => {
    const [ roomID,setRoomID ] = useState();
    const { joinRoom } = useGameContext();

    const handleJoin = () => {
        joinRoom(roomID);
    };

    return (
        <Modal
            show={show}
            centered
            onHide={cancelModal}
        >
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>
                            Enter Room ID
                        </Form.Label>
                        <Form.Control onChange={e => setRoomID(e.target.value)} type="number"></Form.Control>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={handleJoin}>
                    Join
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default JoinRoom;
