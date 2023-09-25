import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function BootstrapModal({ show,handleReset,handleClose,winner }) {
    const screenWidth = screen.width;
    return (
        <>
            <Modal
                bsPrefix={`modal ${screenWidth > 600 ? 'resetModal' : ''}`}
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered>
                <Modal.Header>
                    <Modal.Title>
                        {winner !== null ? `${winner}'s winner` : `Reset Game?`}
                    </Modal.Title>
                </Modal.Header>
                {winner === null ?
                    (
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleReset}>
                                Yes
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                No
                            </Button>
                        </Modal.Footer>
                    )
                    :
                    (<Button variant="secondary" onClick={handleReset}>
                        Reset Game
                    </Button>)
                }

            </Modal>
        </>
    );
}

export default BootstrapModal;