import { PropTypes } from 'prop-types';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useDispatch } from "react-redux";

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useForm } from 'react-hook-form';
import { addDraftPayment } from 'src/stores/slices/paymentSlice';

export const NewPaymentForm = ({ open, onClose }) => {
    const dispatch = useDispatch();
    
    const defaultValues = {
        fname: '',
        accountNo: '',
        date: '',
        amount: '',
        description: '',
    }

    const methods = useForm({
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const handleSave = async (data) => {
        try {
            dispatch(addDraftPayment(data));
            console.log('Saving data:', data);
            onClose();
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        reset(defaultValues);
        onClose();
    });

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
            <FormProvider methods={methods} onSubmit={onSubmit}>
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
                        <RHFTextField name="fname" label="First Name" />
                        <RHFTextField name="accountNo" label="Account No" />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button variant="outlined" onClick={() => handleSave(methods.getValues())}>
                        Save
                    </Button>

                    <LoadingButton
                        style={{ backgroundColor: '#2CA019' }}
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                    >
                        Pay Now
                    </LoadingButton>
                </DialogActions>
            </FormProvider>
        </Dialog>
    )
}

NewPaymentForm.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
};
