import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Input, Paper, Typography } from "@mui/material";
import { stockPrices } from "../../api/postHarvestApi";
import { Form } from "react-router-dom";
import BidGraph from "../communityMarket/bid-graph";
import { useSelector } from "react-redux";
import { selectPostHarvestAudit } from "src/stores/slices/postharvestAuditSlice";

const FormDialog = (props) => {
  
 const { formData, setformData, onSubmit, title, pricelabel, variety, fert } = props
            
 const { auditData } = useSelector(selectPostHarvestAudit);
  const [open, setOpen] = useState(false);
  const[remaining,setRemaining] = useState(auditData.weight-formData.amount)


  const[stockData,setStockData] = useState([])

  const stockValues=(e) => {
    
    stockPrices(variety,fert).then((stocks) => {
      setStockData(stocks);
      console.log(stocks);
    });

  }



 const handleChange = (e) => {
   const { name, value } = e.target;
   // Check if the input value contains only numbers or is an empty string
   if (/^\d*$/.test(value) || value === "") {
    
     if (name === "amount" && parseInt(value) > auditData.weight) {
       // Corrected access to value variable
      return;
     } else {
       
       if (name === "amount") {
         
         if (value === "") {
           setRemaining(auditData.weight);
         } else {
           setRemaining(auditData.weight - parseInt(value));
         }
       }
       
       setformData({ ...formData, [name]: value });
     }
     
   }
 };


 
  const [selectedFileUrl, setSelectedFileUrl] = useState(formData.imagefile);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setformData((prevState) => ({
      ...prevState,
      imagefile: file,
    }));

    // Display the selected file
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setSelectedFileUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleClickOpen = () => {
        
    stockValues();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
     
    onSubmit();

    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        sx={{ fontSize: 16 }}
        size="medium"
        onClick={handleClickOpen}
      >
        {title}
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth={"60vw"}>
        <Box
          display={"flex"}
          width={800}
          height={"100%"}
          minHeight={500}
          m={3}
        >
          <Box
            flex={1}
            display={"flex"}
            flexDirection={"column"}
            p={1.7}
            gap={4}
          >
            <Typography
              fontWeight={700}
              fontFamily={"sans-serif"}
              borderRadius={1.5}
              fontSize={20}
            >
              Market Trends
            </Typography>
            <Box flex={1}>
              <Paper elevation={5} sx={{ height: "100%", width: "100%" }}>
                <BidGraph
                  data={stockData}
                  width={500}
                  height={400}
                  xAxisName="Time"
                  seriesName="Stock Price"

                />
              </Paper>
            </Box>
          </Box>
          <Form onSubmit={handleSubmit}>
            <DialogTitle
              fontWeight={700}
              fontFamily={"sans-serif"}
              borderRadius={1.5}
              fontSize={20}
            >
              Place Your Bid
            </DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                autoFocus
                required
                id="name"
                name="price"
                value={formData.price}
                onChange={handleChange}
                label={pricelabel}
                type="text"
                fullWidth
                variant="outlined"
                style={{ marginBottom: "30px", marginTop: "20px" }}
              />
              <TextField
                autoFocus
                required
                id="name"
                name="amount"
                label="Amount"
                type="text"
                value={formData.amount}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                helperText={`Available: ${remaining} KG`}
              />
              <div>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="image-input"
                  type="file"
                  onChange={handleImageChange}
                />

                {selectedFileUrl && (
                  <Box mt={2}>
                    <div>
                      <img
                        src={selectedFileUrl}
                        alt="Selected File"
                        height={100}
                        width={100}
                        style={{ borderImage: "round" }}
                      />
                    </div>
                  </Box>
                )}
              </div>
              <label htmlFor="image-input">
                <Box
                  display={"flex"}
                  height={55}
                  justifyContent={"center"}
                  mt={3}
                  gap={3}
                >
                  <Button component="span" variant="contained" color="primary">
                    Upload
                  </Button>
                  <TextField
                    variant="outlined"
                    fullWidth
                    sx={{ height: "100%" }}
                    InputProps={{ readOnly: true }}
                    value={
                      formData.imagefile
                        ? formData.imagefile.name
                        : "Upload Image"
                    }
                  />
                </Box>
              </label>
            </DialogContent>
            <DialogActions style={{ padding: "10px" }}>
              <Button onClick={handleClose} variant="contained" color="warning">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Confirm
              </Button>
            </DialogActions>
          </Form>{" "}
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default FormDialog;
