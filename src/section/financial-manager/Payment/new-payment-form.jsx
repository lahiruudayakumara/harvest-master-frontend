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
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import { RHFSelect } from 'src/components/hook-form/rhf-select';
import { createPayment } from 'src/api/financialManagerApi';
import { validateAddress, validateBankAccountNumber, validatePrice, validationName } from 'src/utilities/inputValidations';

export const NewPaymentForm = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const formattedDate = new Date().toISOString().slice(0, 10);


    const defaultValues = {
        name: '',
        bankName: 'SAMPATH',
        accountNo: '',
        date: formattedDate,
        amount: '',
        reference: '',
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
        if (
            data.name === '' ||
            data.accountNo === '' ||
            data.date === '' ||
            data.amount === '' ||
            data.reference === ''
        ) {
            console.log('All fields are required.');
            return;
        } else {
            console.log("sucess")
        }

        try {
            
            createPayment(data, "PENDING").then((response) => {
                dispatch(addDraftPayment(response.data));
            });
            console.log('Saving data:', data);
            reset(defaultValues);
            onClose();
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        createPayment(data, "VERIFY").then((response) => {
            console.log(response)
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
            Add New Payment
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
              Check the details again before making the payment
            </Alert>
            <Box marginY={3}>
                <RHFTextField name="name" onChange={validationName} validation={{ pattern: /^[A-Za-z\s]+$/i }} label="Name" required />
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
              <RHFSelect
                name="bankName"
                native={true}
                helperText="Select an option"
              >
                <option value="BOC">BOC BANK</option>
                <option value="PEOPLES">PEOPLES BANK</option>
                <option value="SAMPATH">SAMPATH BANK</option>
              </RHFSelect>
              <RHFTextField name="accountNo" onChange={validateBankAccountNumber} label="Account No" required />
              <RHFTextField
                name="date"
                label="Date"
                required
                defaultValue={formattedDate}
                disabled
              />
              <RHFTextField name="amount" onChange={validatePrice} label="Amount" required />
            </Box>
            <Box marginY={3}>
              <RHFTextField name="reference" onChange={validationName} label="Reference" required />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={onClose}
              style={{ color: "#2CA019", borderColor: "#2CA019" }}
            >
              Cancel
            </Button>

            <Button
              variant="outlined"
              onClick={() => handleSave(methods.getValues())}
              style={{ color: "#2CA019", borderColor: "#2CA019" }}
            >
              Save
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

NewPaymentForm.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
};
