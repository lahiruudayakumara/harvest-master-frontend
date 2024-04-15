import { PropTypes } from 'prop-types';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import HorizontalLinearStepper from './linear-stepper';
import { IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const CheckoutDialogBox = ({ open, onClose }) => {
    return (
        <Dialog
            fullWidth
            maxWidth={false}
            open={open}
            PaperProps={{
                sx: { maxWidth: 720 },
            }}
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                    <Typography>Checkout Process</Typography>
                    <IconButton onClick={onClose} style={{ color: '#2CA019' }}>
                        <CloseRoundedIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <HorizontalLinearStepper />
            </DialogContent>
            <DialogActions>
                {/* <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button> */}
            </DialogActions>
        </Dialog>
    )
}

export default CheckoutDialogBox

CheckoutDialogBox.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
};
