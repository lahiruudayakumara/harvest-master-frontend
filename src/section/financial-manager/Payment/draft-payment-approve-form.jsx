import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { PropTypes } from 'prop-types';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import FormProvider from "src/components/hook-form/form-provider";
import { RHFTextField } from "src/components/hook-form";
import { LoadingButton } from "@mui/lab";
import { deleteDraftPayment } from "src/stores/slices/paymentSlice";
import { createPayment } from "src/api/financialManagerApi";
import { validateBankAccountNumber, validatePrice, validationName } from "src/utilities/inputValidations";
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';

const DraftPaymentApproveForm = ({
    open,
    onClose,
    updateData
}) => {
    const dispatch = useDispatch();

    console.log(updateData.name);

    const defaultValues = {
        name: updateData.name,
        accountNo: updateData.accountNo,
        bankName: updateData.bankName,
        date: updateData.date,
        amount: updateData.amount,
        reference: updateData.reference,
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
        createPayment(data, "APPROVED").then((response) => {
            console.log(response)
            dispatch(deleteDraftPayment(updateData.id));
        })
        
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
          <DialogTitle
            sx={{ color: "#2CA019", display: "flex", alignItems: "center" }}
          >
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
            Approve Payment
          </DialogTitle>
          <DialogContent>
            <Alert
              variant="outlined"
              severity="info"
              sx={{
                mb: 3,
                borderColor: "#2CA019",
                color: "#2CA019",
                "& .MuiAlert-icon": {
                  color: "#2CA019",
                },
              }}
            >
              Please Check Payment Details
            </Alert>
            <Box marginY={3}>
              <RHFTextField
                name="name"
                label="First Name"
                defaultValue={updateData.name}
                disabled
              />
            </Box>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField
                name="bankName"
                label="Bank Name"
                defaultValue={updateData.bankName}
                disabled
              />
              <RHFTextField
                name="accountNo"
                label="Account No"
                defaultValue={updateData.accountNo}
                onChange={validateBankAccountNumber}
                disabled
              />
              <RHFTextField
                name="date"
                label="Date"
                defaultValue={updateData.date}
                disabled
              />
              <RHFTextField
                name="amount"
                label="Amount"
                defaultValue={updateData.amount}
                onChange={validatePrice}
              />
            </Box>
            <Box marginY={3}>
              <RHFTextField
                name="reference"
                label="Reference"
                defaultValue={updateData.reference}
                onChange={validationName}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton
              style={{ backgroundColor: "#2CA019" }}
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Pay Now
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    );
}

export default DraftPaymentApproveForm

DraftPaymentApproveForm.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    updateData: PropTypes.object,
};
