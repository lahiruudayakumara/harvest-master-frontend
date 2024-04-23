import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import BidGraph from "./bid-graph";
import { Box, Paper, Typography } from "@mui/material";
import splitNumbers from "src/utilities/priceConversions";

const FormBid = (props) => {
  
  const { formData, setformData,data, onSubmit, title, pricelabel,amount,startPrice,qualityValue,startValue } = props;
  const [open, setOpen] = useState(false);




 

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
   
    setOpen(true);
    console.log(startPrice);
    setformData({price:startPrice})
  };

  const handleClose = () => {
  
    // setformData("")
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit();

    handleClose();
  };
  

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        {title}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
        maxWidth={"60vw"}
      >
        <DialogContent>
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
                  data={data}
                  width={600}
                  height={400}
                  xAxisName="Time"
                  seriesName="Value"
                />
              </Box>
              <Box
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
              </Box>
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
                  Place Your Bid
                </Typography>
              </DialogContentText>
              <TextField
                autoFocus
                required
                id="name"
                name="price"
                value={formData.price}
                onChange={handleChange}
                label={pricelabel}
                type="number"
                fullWidth
                variant="outlined"
                style={{ marginBottom: "30px", marginTop: "20px" }}
              />
              <Box display={"flex"} mb={8} mt={6} p={1}>
                <Box display={"flex"} flexDirection={"column"} gap={2} flex={2}>
                  <Typography fontSize={16} >
                    Amount{" "}
                  </Typography>
                  <Typography fontSize={16} >
                    Price Per Kg
                  </Typography>
                  <Typography fontSize={16}  mt={2}>
                    Total Price
                  </Typography>
                </Box>
                <Box display={"flex"} flexDirection={"column"} gap={2} flex={1}>
                  <Typography fontSize={16} fontWeight={400} textAlign={"end"}>
                    {amount} Kg
                  </Typography>
                  <Typography fontSize={16} fontWeight={400} textAlign={"end"}>
                    {formData.price}
                  </Typography>
                  <Typography
                    fontSize={16}
                    fontWeight={400}
                    mt={2}
                    textAlign={"end"}
                  >
                    {splitNumbers(formData.price * amount)}
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
                <Button
                  onClick={handleClose}
                  variant="contained"
                  color="warning"
                  size="large"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" size="large">
                  Confirm
                </Button>
              </DialogActions>{" "}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default FormBid;
