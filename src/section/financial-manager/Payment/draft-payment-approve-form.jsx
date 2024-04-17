import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { PropTypes } from 'prop-types';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import FormProvider from "src/components/hook-form/form-provider";
import { RHFTextField } from "src/components/hook-form";
import { LoadingButton } from "@mui/lab";

const DraftPaymentApproveForm = ({
    open,
    onClose,
    fname,
    accountNo,
    date,
    amount,
    reference,
}) => {
    const dispatch = useDispatch();

    const defaultValues = {
        fname: fname,
        accountNo: accountNo,
        date: date,
        amount: amount,
        reference: reference,
    }

    const methods = useForm({
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

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
                <DialogTitle>Approve Payment</DialogTitle>
                <DialogContent>
                    <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
                        Please Check Payment Details
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
                        <RHFTextField name="fname" label="First Name" defaultValue={fname}/>
                        <RHFTextField name="accountNo" label="Account No" />
                        <RHFTextField name="date" label="Date" defaultValue={date}  disabled />
                        <RHFTextField name="amount" label="Amount" />
                    </Box>
                    <Box
                        marginY={3}
                    >
                        <RHFTextField name="reference" label="Reference" />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
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

export default DraftPaymentApproveForm

DraftPaymentApproveForm.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    fname: PropTypes.string,
    accountNo: PropTypes.string,
    date: PropTypes.string,
    amount: PropTypes.string,
    reference: PropTypes.string,
};
