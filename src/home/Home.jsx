import React,{ useEffect,useState } from 'react';
import { ButtonGroup,Button,Container,Row,Col } from 'react-bootstrap';
import { Link,redirect,useNavigate } from 'react-router-dom';
import { useGameContext } from '../hooks/useGameContext';
import useDb from '../API/useDb';
import AuthModal from '../components/AuthModal';
import useAuth from '../API/useAuth';
import useSkipRender from '../components/useSkipRender';
import { Avatar } from '@mui/material';
import ProfileModal from '../components/modals/ProfileModal';
import ShowDp from '../components/ShowDp';

const Home = () => {
    const { handleTwistMode,handleNormalMode } = useGameContext();
    const { writeUserData } = useDb();
    const { user,userUID } = useAuth();
    const navigate = useNavigate();
    const [ isAuthModalOpen,setIsAuthModalOpen ] = useState(false);
    const [ isProfileShowed,setIsProfileShowed ] = useState(false);


    const handleOpenModal = () => {
        if (user === null) {
            setIsAuthModalOpen(true);
        } else {
            setIsAuthModalOpen(false);
            navigate('/game-online');
        }
    };

    const handleCancel = () => {
        setIsAuthModalOpen(false);
    };

    useSkipRender(() => {
        setIsAuthModalOpen(false);
    },user);

    const handleProfileModal = () => {
        setIsProfileShowed(true);
    };

    const handleHideModal = () => {
        setIsProfileShowed(false);
    };

    return (
        <>
            <AuthModal
                show={isAuthModalOpen}
                handleCancel={handleCancel}
            />
            <Container className='home'>
                <div className='profile' onClick={handleProfileModal}>
                    {
                        user === null ?
                            <Avatar />
                            :
                            <ShowDp img={user.photoURL} />
                    }
                </div>
                <ProfileModal show={isProfileShowed} handleHideModal={handleHideModal} />
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
                        <Button onClick={handleOpenModal} variant='primary' className='m-3 '>Play Online</Button>
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
