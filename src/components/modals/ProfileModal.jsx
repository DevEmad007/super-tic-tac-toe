import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Cancel,Google } from '@mui/icons-material';
import { Col,Container,Row } from 'react-bootstrap';
import useAuth from '../../API/useAuth';

const ProfileModal = ({ show,handleHideModal }) => {
    const screenWidth = screen.width;
    const { user,authWithGoogle,handleLogOut } = useAuth();

    return (
        <Modal
            bsPrefix={`modal ${1200 > screenWidth > 600 ? 'resetModal' : ''}`}
            show={show}
            onHide={handleHideModal}
            centered
            className='p-4'
        >
            <Modal.Header>
                <Modal.Title>
                    Sign In To Play Online
                </Modal.Title>
                <Cancel style={{ cursor: 'pointer' }} onClick={handleHideModal} />
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            User Name
                        </Col>
                        <Col>
                            {user?.displayName}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Email
                        </Col>
                        <Col>
                            {user?.email}
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col>
                            User Name
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            User Name
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                        </Col>
                    </Row> */}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                {
                    user === null ?
                        (<Button onClick={authWithGoogle}>Sign In With Google <Google /></Button>)
                        :
                        <Button variant='danger' onClick={handleLogOut}>Log Out</Button>
                }
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileModal;
