import { PropTypes } from 'prop-types';
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import FormProvider from "src/components/hook-form/form-provider";
import { RHFTextField } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import { deleteOrder } from 'src/api/logisticHandlerApi';
import { useDispatch } from 'react-redux';
import { removePendingPayment } from 'src/stores/slices/cartSlice';
import { RHFSelect } from 'src/components/hook-form/rhf-select';
import { addRefund } from 'src/api/financialManagerApi';

const RefundRequestForm = ({ open, onClose, orderInfo }) => {
    const dispatch = useDispatch();
    const formattedDate = new Date().toISOString().slice(0, 10);
    const defaultValues = {
        bankName: 'sampath',
        accountNo: '',
        date: formattedDate,
        amount: orderInfo.total_amount,
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

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        addRefund(data).then((response) => {
            console.log(response)
            deleteOrder(orderInfo.delivery_id).then((responseDel) => {
              console.log(responseDel)
              dispatch(removePendingPayment(orderInfo.delivery_id))
            })
        })
        reset(defaultValues);
        onClose();
    });

    const handleClose = () => {
      deleteOrder(orderInfo.delivery_id).then((response) => {
        console.log(response)
        dispatch(removePendingPayment(orderInfo.delivery_id))
      })
      onClose();
    }


  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={false}
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
          Refund Request
        </DialogTitle>
        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            You don't need to refund money. Skip this form.
          </Alert>
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
              <option value="boc">BOC  BANK</option>
              <option value="peoples">PEOPLES BANK</option>
              <option value="sampath">SAMPATH BANK</option>
            </RHFSelect>
            <RHFTextField name="accountNo" label="Account No" required />
            <RHFTextField
              name="date"
              label="Date"
              required
              defaultValue={formattedDate}
              disabled
            />
            <RHFTextField name="amount" label="Amount" required disabled defaultValue={orderInfo.total_amount} />
          </Box>
          <Box marginY={3}>
            <RHFTextField name="reference" label="Your Request" required />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ borderColor: "#2CA019", color: "#2CA019" }}
            variant="outlined"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            style={{ borderColor: "#2CA019", color: "#2CA019" }}
            variant="outlined"
            onClick={handleClose}
          >
            Skip
          </Button>
          <LoadingButton
            style={{ backgroundColor: "#2CA019" }}
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default RefundRequestForm;

RefundRequestForm.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
};