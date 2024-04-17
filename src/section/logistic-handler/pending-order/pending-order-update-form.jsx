import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { approvePendingOrder } from 'src/stores/slices/pendingOrderSlice';
import { managePendingOrder } from 'src/api/logisticHandlerApi';


function PendingOrderUpdateForm({ open, onClose, deliveryData }) {
    const dispatch = useDispatch();

    const confirmUpdateHandler = () => {
        onClose();
        //deliveryData.action = "APPROVED";
        //dispatch(approvePendingOrder(deliveryData));
        managePendingOrder(deliveryData.delivery_id);
        console.log(deliveryData);
    }

    return (

        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Approve Delivery Request</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    Are you sure you want to approve this request?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    onClick={confirmUpdateHandler}
                    style={{ color: "#FF0000" }}
                    autoFocus
                >
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PendingOrderUpdateForm;
