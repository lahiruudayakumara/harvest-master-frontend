import { PropTypes } from 'prop-types';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import HorizontalLinearStepper from './linear-stepper';
import { IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';

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
            <DialogTitle sx={{ color: '#2CA019', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                    <Box display={'flex'} alignItems={'center'}>
                        <Box
                            boxShadow={4}
                            p={1}
                            width={25}
                            height={25}
                            marginRight={2}
                            borderRadius={1}
                        >
                            <RequestQuoteOutlinedIcon />
                        </Box>
                        <Typography>Checkout Process</Typography>
                    </Box>
                    <IconButton onClick={onClose} style={{ color: '#2CA019' }}>
                        <CloseRoundedIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <HorizontalLinearStepper />
            </DialogContent>

        </Dialog>
    )
}

export default CheckoutDialogBox

CheckoutDialogBox.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
};
