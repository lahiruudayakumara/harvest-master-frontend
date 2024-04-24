import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import { getTransactionById } from 'src/api/financialManagerApi';
import { useDispatch, useSelector } from 'react-redux';
import { TransactionRequest, fetchTransactionRequest } from 'src/stores/slices/paymentSlice';


const OrderApproveBox = ({ open, onClose, selectedOrder }) => {




    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Pending Order Details</DialogTitle>
            <DialogContent>
                <Box></Box>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography variant="body1">Customer Name: {selectedOrder.customer_name}</Typography>
                        <Typography variant="body1">Delivery Address: {selectedOrder.delivery_address}</Typography>
                        <Typography variant="body1">Pickup Address: {selectedOrder.pickup_address}</Typography>
                        <Typography variant="body1">Order Date: {selectedOrder.orderDate}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        {/* {transactionData && transactionData.paymentMethod == 'CARD' ? (
                            <>
                                <h1>Card</h1>
                            </>
                        ) : (
                            <h1>helllo{transactionData.transactionId}</h1>
                        )} */}
                    </Grid>
                </Grid>
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

OrderApproveBox.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedOrder: PropTypes.object,
};

export default OrderApproveBox
