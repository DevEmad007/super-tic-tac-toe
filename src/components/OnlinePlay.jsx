import React,{ useRef,useState } from 'react';
import { Link } from 'react-router-dom';
import { Button,Container,Row,Col } from 'react-bootstrap';
import useDb from '../API/useDb';
import CreateRoomModal from './modals/CreateRoomModal';
import JoinRoom from './modals/JoinRoom';
import { useGameContext } from '../hooks/useGameContext';

const OnlinePlay = () => {
    const [ isModalOpen,setIsModalOpen ] = useState(false);
    const [ isJoinModalOpen,setIsJoinModalOpen ] = useState(false);
    const [ roomID,setRoomID ] = useState(null);
    const { createRoom } = useGameContext();
    const generateRoomNum = () => Math.floor(Math.random() * 10000);

    const handleCreate = () => {
        const roomID = generateRoomNum();
        setRoomID(roomID);
        createRoom(roomID);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const openJoinModal = () => {
        setIsJoinModalOpen(true);
    };

    const closeJoinModal = () => {
        setIsJoinModalOpen(false);
    };

    return (
        <div className='onlineRoom'>
            <CreateRoomModal show={isModalOpen} handleCancel={handleCancel} >
                Room id {roomID}
            </CreateRoomModal>
            <JoinRoom
                show={isJoinModalOpen}
                cancelModal={closeJoinModal}
            />
            <div style={{ display: 'grid',placeContent: 'center',height: '100vh' }}>
                <Button className='m-2' onClick={handleCreate}>Create Room</Button>
                <Button className='m-2' onClick={openJoinModal}>Join Room</Button>
            </div>
        </div>
    );
};

export default OnlinePlay;
