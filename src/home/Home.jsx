import React,{ useState } from 'react';
import { Button,Container,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGameContext } from '../hooks/useGameContext';
import RoomModal from '../components/modals/RoomModal';
const Home = () => {
    const { handleTwistMode,handleNormalMode } = useGameContext();
    const [ isRoomModalOpen,setIsRoomModalOpen ] = useState(false);

    const handleOpenModal = () => {
        setIsRoomModalOpen(true);
    };

    const handleCancel = () => {
        setIsRoomModalOpen(false);
    };

    return (
        <>
            <RoomModal
                show={isRoomModalOpen}
                handleCancel={handleCancel}
            />
            <Container className='home'>
                <Row>
                    <Col>
                        <Link to={'/game'}>
                            <Button onClick={handleNormalMode} variant='primary' className='m-3 '>Play</Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to={'/game'}>
                            <Button onClick={handleTwistMode} variant='primary' className='m-3 '>Play Twisted</Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={handleOpenModal} variant='primary' className='m-3 '>Tic-Tac-Toe Online</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to={'game-tutorial'}>
                            <Button variant='primary' className='m-3 '>Tutorial</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;
