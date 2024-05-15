import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateDeliverySchedule } from 'src/api/logisticHandlerApi';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { updateDelivery } from 'src/stores/slices/pendingOrderSlice';

const DeliveryScheduleUpdateForm = ({ open, onClose, selectedProduct }) => {
    const dispatch = useDispatch();

    const defaultValues = {
        delivery_id: selectedProduct.delivery_id,
        customer_name: selectedProduct.customer_name,
        delivery_address: selectedProduct.delivery_address,
        pickup_address: selectedProduct.pickup_address,
        order_date: selectedProduct.order_date,
        delivery_date: selectedProduct.delivery_date,
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
        updateDeliverySchedule({
            delivery_id: selectedProduct.delivery_id,
            delivery_address: data.delivery_address,
            pickup_address: data.pickup_address
        }).then(() => {
            dispatch(updateDelivery(data));
            console.log("data: ", data);
        });

        reset(defaultValues);
        onClose();
    });

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm" // Set max width to small
            fullWidth // Expand dialog to full width
        >
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <DialogTitle>Update Details</DialogTitle>
                <DialogContent>
                    <Box
                        marginTop={3}
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                    >
                        <RHFTextField name="delivery_id" label="Delivery Id" defaultValue={selectedProduct.delivery_id} style={{ display: 'none' }} />
                        <RHFTextField name="customer_name" label="Customer Name" defaultValue={selectedProduct.customer_name} disabled />
                        <RHFTextField name="delivery_address" label="Delivery Address" defaultValue={selectedProduct.delivery_address} />
                        <RHFTextField name="pickup_address" label="Pickup Address" defaultValue={selectedProduct.pickup_address} />
                    </Box>
                    <Box
                        marginY={2}
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        <RHFTextField name="order_date" label="Order Date" defaultValue={selectedProduct.order_date} disabled />
                        <RHFTextField name="delivery_date" label="Delivery Date" defaultValue={selectedProduct.delivery_date} disabled />
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={onClose}
                        color="primary"
                        style={{ backgroundColor: "#D32F2F", color: "white" }}
                    >
                        Cancel
                    </Button>
                    <LoadingButton
                        style={{ backgroundColor: '#2CA019' }}
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                    >
                        Save Changes
                    </LoadingButton>
                </DialogActions>
            </FormProvider>
        </Dialog>
    )
}

export default DeliveryScheduleUpdateForm;
