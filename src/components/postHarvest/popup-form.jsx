import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input } from "@mui/material";

const FormDialog = ({ formData, setformData, onSubmit, title, pricelabel }) => {
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
    
  };

 const handleImageChange = (e) => {
   const file = e.target.files[0];
   setformData((prevState) => ({
     ...prevState,
     imagefile: file,
   }));
 };

  const handleClickOpen = () => {
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
      >
        <DialogTitle
          fontWeight={700}
          fontFamily={"sans-serif"}
          borderRadius={1.5}
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
            type="number"
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
            type="number"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="image-input"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="image-input">
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{ readOnly: true }}
              value={formData.imagefile ? formData.imagefile.name : "Upload Image"}
            />
            <Button component="span" variant="contained" color="primary">
              Upload
            </Button>
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
      </Dialog>
    </React.Fragment>
  );
};

export default FormDialog;
