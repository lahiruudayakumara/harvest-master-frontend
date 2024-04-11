import { PropTypes } from 'prop-types';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';



export const NewPaymentForm = ({ open, onClose }) => {
    return (
        <Dialog
            fullWidth
            maxWidth={false}
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { maxWidth: 720 },
            }}
        >
            {/* <FormProvider methods={methods} onSubmit={onSubmit}> */}
            <FormProvider>
                <DialogTitle>Add New Tenant</DialogTitle>
                <DialogContent>
                    <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
                        Add New Payment
                    </Alert>
                    <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        {/* <RHFTextField name="fname" label="First Name" /> */}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>

                    {/* <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        Add Tenant
                    </LoadingButton> */}
                </DialogActions>
            </FormProvider>
        </Dialog>
    )
}

NewPaymentForm.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
};
