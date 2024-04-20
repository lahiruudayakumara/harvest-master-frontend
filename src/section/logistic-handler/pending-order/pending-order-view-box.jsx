import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react'

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    console.log(date); // Add this line for debugging
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


function PendingOrderViewBox({ open, onClose, selectedOrder }) {

    // Format order date and delivery date to "YYYY-MM-DD" format
    const orderDate = formatDate(selectedOrder.order_date);
    const deliveryDate = formatDate(selectedOrder.delivery_date);

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
                    <Typography variant="body1">Order Date: {orderDate}</Typography>
                    <Typography variant="body1">Delivery Date: {deliveryDate}</Typography>
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
