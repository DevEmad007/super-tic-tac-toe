import { Col,Container,Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function InGameModal({ isHomeBtnClicked,show,handleReset,handleClose,winner,isDraw }) {
    const screenWidth = screen.width;
    return (
        <>
            <Modal
                bsPrefix={`modal ${1200 > screenWidth > 600 ? 'resetModal' : ''}`}
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered>
                <Modal.Header>
                    <Modal.Title>
                        {isHomeBtnClicked ? `Quit Game? ` :
                            isDraw ? 'Game Is Draw ' :
                                winner !== null ? `${winner}'s winner` : `Reset Game?`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    {winner === null ?
                        isDraw ?
                            (<Button variant="secondary" onClick={handleReset}>
                                Reset Game
                            </Button>)
                            :
                            (
                                <>
                                    <Button variant="danger " onClick={handleReset}>
                                        Yes
                                    </Button>
                                    <Button variant="success" onClick={handleClose}>
                                        No
                                    </Button>
                                </>
                            )
                        :
                        (<Button variant="secondary" onClick={handleReset}>
                            Reset Game
                        </Button>)
                    }
                </Modal.Footer>

            </Modal>
        </>
    );
}

export default InGameModal;