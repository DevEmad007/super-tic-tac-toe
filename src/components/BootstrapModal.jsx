import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function BootstrapModal({ show,handleReset,handleClose,winner }) {
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
                        {winner !== null ? `${winner}'s winner` : `Reset Game?`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    {winner === null ?
                        (
                            <>
                                <Button variant="secondary" onClick={handleReset}>
                                    Yes
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
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

export default BootstrapModal;