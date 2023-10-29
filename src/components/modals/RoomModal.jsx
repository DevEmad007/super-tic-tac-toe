import { useState } from 'react';
import { Button,Col,Container,Modal,Row } from 'react-bootstrap';
import CreateRoomModal from './CreateRoomModal';
import JoinRoom from './JoinRoom';

const RoomModal = ({ show,handleCancel,children }) => {
    const [ isModalOpen,setIsModalOpen ] = useState(false);
    const [ isJoinModalOpen,setIsJoinModalOpen ] = useState(false);
    const [ roomID,setRoomID ] = useState(null);

    const generateRandomNumberWithoutZero = () => {
        // Generate a random number between 1 and 999999
        let randomNumber = Math.floor(Math.random() * 999999) + 1;

        if (randomNumber.toString().indexOf('0') !== -1) {
            // If it does, generate a new random number
            randomNumber = Math.floor(Math.random() * 999999) + 1;
        }

        // Return the random number
        return randomNumber;
    };

    const handleCreateRoomModal = () => {
        setRoomID(() => {
            while (generateRandomNumberWithoutZero().length < 6) {
                return generateRandomNumberWithoutZero();
            }
            return generateRandomNumberWithoutZero();
        });
        setIsModalOpen(true);
    };

    const handleCancelCreateModal = () => {
        setIsModalOpen(false);
        setRoomID('');
    };

    const closeJoinModal = () => {
        setIsJoinModalOpen(false);
    };


    const openJoinModal = () => {
        setIsJoinModalOpen(true);
    };

    return (
        <>
            <CreateRoomModal
                show={isModalOpen}
                handleCancel={handleCancelCreateModal}
                roomID={roomID}
            />
            <JoinRoom
                show={isJoinModalOpen}
                cancelModal={closeJoinModal}
            />
            <Modal
                show={show}
                onHide={handleCancel}
                centered
                className='p-2'
            >
                <Modal.Body
                    className='mt-2'
                >
                    <Container>
                        <Row >
                            <Col className='text-center'>
                                <Button onClick={handleCreateRoomModal}>Create Room</Button>
                            </Col>
                            <Col className='text-center'>
                                <Button onClick={openJoinModal}>Join Room</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Button className='m-3' onClick={handleCancel}> Cancle </Button>
            </Modal>
        </>
    );
};

export default RoomModal;