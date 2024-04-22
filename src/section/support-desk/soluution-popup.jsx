import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, Box } from "@mui/material";

const PopupDialogSupport = (props) => {
  const [open, setOpen] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextAreaChange = (e) => {
    setTextAreaValue(e.target.value);
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log(textAreaValue);
    handleClose();
  };

  return (
    <Box width={500}>
      <Button variant="contained" onClick={handleOpen}>Provide Solution</Button>
      <Dialog open={open} onClose={handleClose} sx={{ width: "70%", maxWidth: "100%", height: "80vh" }}>


        <DialogTitle><Typography variant="h5">Provide Solution</Typography></DialogTitle>
        <DialogContent sx={{ width:500, height:400, display:"flex", flexDirection:"column", gap:2,pb:5 ,mt:5}} >
          <Typography variant="h6">Issue</Typography>
          <Typography variant="body2" mb={3}>{props.data.issue}</Typography>

          <Typography variant="h6" mb={1}>Enter the solution</Typography>
          <TextField
          variant="outlined"
            multiline
            rows={5}
            fullWidth
            value={textAreaValue}
            onChange={handleTextAreaChange}
            placeholder="Type your text here..."
            inputProps={{ maxLength: 200 }} // Limiting to 200 characters
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
      </Box>
  );
};

export default PopupDialogSupport;