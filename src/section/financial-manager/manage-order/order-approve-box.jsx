import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import { approvedPayment, getTransactionById } from 'src/api/financialManagerApi';
import { useDispatch, useSelector } from 'react-redux';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import { removePaymentVerify } from 'src/stores/slices/pendingOrderSlice';



const OrderApproveBox = ({ open, onClose, selectDelivery }) => {
    const dispatch = useDispatch();
    const [transaction, setTransaction] = useState("");
    useEffect(() => {
        getTransactionById(14).then((response) => {
            setTransaction(response.data[0])
            console.log(response.data)
        })
    },[open])

    const handleApprove = async () => {
        approvedPayment(selectDelivery.delivery_id, true).then((response) => {
            console.log(response)
            dispatch(removePaymentVerify(selectDelivery.delivery_id));
            onClose();
        })
    }

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
          Pending Order Details
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">
                Customer Name: {selectDelivery.order_date}
              </Typography>
              <Typography variant="body1">
                Transaction Amount: {transaction.totalPrice}
              </Typography>
              {/* <Typography variant="body1">Delivery Address: {selectedOrder.delivery_address}</Typography>
                        <Typography variant="body1">Pickup Address: {selectedOrder.pickup_address}</Typography>
                        <Typography variant="body1">Order Date: {selectedOrder.orderDate}</Typography> */}
            </Grid>
            <Grid item xs={6}>
              {transaction && transaction.paymentMethod == "CARD" ? (
                <>
                  <Typography>Payment Method : Card</Typography>
                  <Typography>
                    Payment Sucess Code : {transaction.paymentSuccessCode}
                  </Typography>
                </>
              ) : (
                <Typography>Payment Method : Bank Slip</Typography>
              )}
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
          <Button
            color="primary"
            onClick={handleApprove}
            sx={{
                color: '#fff',
              backgroundColor: "#2CA019",
              "&:hover": {
                backgroundColor: "rgba(44, 160, 25, 0.75)",
              },
            }}
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    );
}

OrderApproveBox.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectDelivery: PropTypes.object,
};

export default OrderApproveBox
