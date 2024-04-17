import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react'

function pendingOrderDeleteForm(open, onClose, deliveryData) {
  const confirmDeleteHandler = () => {
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
      <DialogTitle>Delete Order</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete this order?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
        <Button
          onClick={confirmDeleteHandler}
          style={{ color: "#FF0000" }}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>


  )
}

export default pendingOrderDeleteForm;
