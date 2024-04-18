import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react'

function PendingOrderViewBox({ open, onClose, selectedOrder }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm" // Set max width to small
            fullWidth // Expand dialog to full width
        >
            <DialogTitle>Pending Order Details</DialogTitle>
            <DialogContent>
                <Box
                    marginY={2}
                    rowGap={3}
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                    }}
                >
                    <Typography variant="body1">Customer Name: {selectedOrder.customer_name}</Typography>
                    <Typography variant="body1">Delivery Address: {selectedOrder.delivery_address}</Typography>
                    <Typography variant="body1">Pickup Address: {selectedOrder.pickup_address}</Typography>
                    <Typography variant="body1">Order Date: {selectedOrder.order_date}</Typography>
                    <Typography variant="body1">Delivery Date: {selectedOrder.delivery_date}</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color="primary"
                    style={{ backgroundColor: "#D32F2F", color: "white" }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PendingOrderViewBox;
