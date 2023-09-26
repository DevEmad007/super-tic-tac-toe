import React from 'react';
import { ButtonGroup,Button,Container,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGameContext } from '../hooks/useGameContext';

const Home = () => {
    const { handleTwistMode,handleNormalMode } = useGameContext();
    return (
        <>
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
                        <Link to={'game-online'}>
                            <Button variant='primary' className='m-3 '>Play Online</Button>
                        </Link>
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
