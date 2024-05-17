import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import {
  approvedPayment,
  getTransactionById,
} from "src/api/financialManagerApi";
import { useDispatch, useSelector } from "react-redux";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import { removePaymentVerify } from "src/stores/slices/pendingOrderSlice";

const OrderApproveBox = ({ open, onClose, selectDelivery }) => {
  const dispatch = useDispatch();
  const [transaction, setTransaction] = useState("");
  const [bankSlipImage, setBankSlipImage] = useState(null);
  useEffect(() => {
    getTransactionById(14).then((response) => {
      setTransaction(response.data[0]);
      console.log(response.data[0]);

      const base64String = response.data[0].bankSlipImage;

      // Convert the Base64 string back to binary data
      const binaryData = atob(base64String);

      // Create a Uint8Array to hold the binary data
      const byteArray = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
      }

      // Create a Blob object from the binary data
      const blob = new Blob([byteArray], { type: "image/png" });

      // Generate a URL for the Blob object
      const imageUrl = URL.createObjectURL(blob);

      // Set the image URL to state
      setBankSlipImage(imageUrl);
    });
  }, [open]);

  const handleApprove = async () => {
    approvedPayment(selectDelivery.delivery_id, true).then((response) => {
      console.log(response);
      dispatch(removePaymentVerify(selectDelivery.delivery_id));
      onClose();
    });
  };

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
            {/* <Typography variant="body1">
                Transaction Amount: {transaction.totalPrice}
              </Typography> */}
            <Typography variant="body1">
              Delivery Address: {selectDelivery.delivery_address}
            </Typography>
            <Typography variant="body1">
              Order Date: {selectDelivery.orderDate}
            </Typography>
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
              <>
                <Typography>Payment Method : Bank Slip</Typography>
                <img src={bankSlipImage} alt="Bank Slip" />
              </>
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
            color: "#fff",
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
};

OrderApproveBox.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectData: PropTypes.object,
};

export default OrderApproveBox;
