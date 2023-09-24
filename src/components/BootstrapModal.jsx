import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function BootstrapModal({ show,handleReset,handleClose,winner }) {

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered>
                <Modal.Body>
                    <Modal.Title>
                        {winner !== null ? `${winner}'s winner` : `Reset Game?`}
                    </Modal.Title>
                </Modal.Body>
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