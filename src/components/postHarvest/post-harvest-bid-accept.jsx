import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Box, IconButton, Paper, Typography } from "@mui/material";
import splitNumbers from "src/utilities/priceConversions";
import BidGraph from "../communityMarket/bid-graph";
import { useDispatch, useSelector } from "react-redux";
import { selectPaddyStock } from "src/stores/slices/paddyStockSlice";
import { CloseRounded } from "@mui/icons-material";
import { removeBid, selectBid } from "src/stores/slices/bidSlice";
import { acceptBid, rejectBid } from "src/api/postHarvestApi";

const FormBidAccept = (props) => {

    const dispatch = useDispatch();

  const { data } = props;

    const { paddyStock } = useSelector(selectPaddyStock);
    
    const { bids} = useSelector(selectBid)

  const amount = paddyStock.amount;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = (event) => {
    event.preventDefault();

    const response = acceptBid(paddyStock.ps_id,data.bidid)

    handleClose();
  };
  const handleReject = (event) => {
    event.preventDefault();

      const response = rejectBid(data.bidid);
      dispatch(removeBid(data.bidid));
      

    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        View
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
        }}
        maxWidth={"60vw"}
      >
        <DialogContent>
          <Box width={"100%"} display={"flex"} justifyContent={"flex-end"}>
            <IconButton onClick={handleClose}>
              <CloseRounded />
            </IconButton>
          </Box>
          <Box
            display={"flex"}
            width={800}
            height={"100%"}
            minHeight={400}
            ml={2}
            mr={2}
            mt={1}
          >
            <Box flex={1} display={"flex"} flexDirection={"column"}>
              <Typography
                fontWeight={700}
                fontFamily={"sans-serif"}
                borderRadius={1.5}
                variant="h5"
                color={"#000000"}
              >
                Stock Details
              </Typography>

              <Box flex={1} ml={-2}>
                <BidGraph
                  data={bids}
                  width={500}
                  height={355}
                  xAxisName="Time"
                  seriesName="Value"
                />
              </Box>
              {/* <Box
                flex={1}
                display={"flex"}
                flexDirection={"row"}
                gap={3}
                width={"80%"}
                ml={3.5}
                pb={2.1}
              >
                <Box flex={1}>
                  <Paper
                    elevation={5}
                    sx={{ height: "100%", width: "100%" }}
                  ></Paper>
                </Box>

                <Box flex={0.5}>
                  <Paper
                    elevation={5}
                    sx={{ height: "100%", width: "100%" }}
                  ></Paper>
                </Box>
              </Box> */}
            </Box>
            <Box flex={0.5}>
              <DialogContentText>
                <Typography
                  fontWeight={700}
                  fontFamily={"sans-serif"}
                  borderRadius={1.5}
                  variant="h5"
                  color={"#000000"}
                  mb={4}
                >
                  Bid Checkout
                </Typography>
              </DialogContentText>
              <TextField
                autoFocus
                disabled
                required
                id="name"
                name="price"
                value={data.price}
                label="Bid"
                type="number"
                fullWidth
                variant="outlined"
                style={{ marginBottom: "30px", marginTop: "20px" }}
              />
              <Box display={"flex"} mb={5} mt={6} p={1}>
                <Box display={"flex"} flexDirection={"column"} gap={2} flex={2}>
                  <Typography variant="body1">Amount </Typography>
                  <Typography variant="body1">Price Per Kg</Typography>
                  <Typography variant="body1" mt={2}>
                    Total Price
                  </Typography>
                </Box>
                <Box display={"flex"} flexDirection={"column"} gap={2} flex={1}>
                  <Typography variant="body1" textAlign={"end"}>
                    {amount} Kg
                  </Typography>
                  <Typography variant="body1" textAlign={"end"}>
                    {data.price}
                  </Typography>
                  <Typography variant="body1" mt={2} textAlign={"end"}>
                    {splitNumbers(data.price * amount)}
                  </Typography>
                </Box>
              </Box>
              {/* <TextField
            autoFocus
            required
            id="name"
            name="amount"
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          /> */}
              <DialogActions>
                <Button onClick={handleAccept} variant="contained" size="large">
                  Accept
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="warning"
                  onClick={handleReject}
                >
                  Reject
                </Button>
              </DialogActions>{" "}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default FormBidAccept;
