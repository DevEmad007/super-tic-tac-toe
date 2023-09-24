import { Modal,Box,Typography } from "@mui/material";
const ModalHooq = ({ open }) => {
    const handleClose = () => {

    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            aria-describedby="modal-modal-description"
            centered
        >
            <Box sx={''}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </Modal>
    );
};

export default ModalHooq;
