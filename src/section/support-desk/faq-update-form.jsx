import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, Box } from "@mui/material";
import { updateSupportFaq } from "src/api/supportApi";

const PopupDialogFaqUpdate = (props) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(props.data);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Regular expression to match only letters and a full stop at the end
    const regex = /^[A-Za-z\s]+\.?$/;

    // Check if the input value matches the regex pattern
    if (regex.test(value) || value === "") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await updateSupportFaq(props.data.faq_id, formData);

    if (response.status === 200) {
      alert("Successfully updated");
    } else {
      alert("Update unsuccessful");
    }

    handleClose();
  };

  return (
    <Box>
      <Button variant="contained" sx={{ backgroundColor: "#008000", '&:hover': { backgroundColor: 'darkgreen' }}} onClick={handleOpen}>Update Faq</Button>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle m={3}><Typography variant="h5">Update Solution</Typography></DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 5, mt: 5 }}>
          <form>
            <Box display={"flex"} flexDirection={"column"} gap={5} width={700} m={2}>
              <TextField
                label="Topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                error={!/^[A-Za-z\s]+\.?$/.test(formData.topic)}
                helperText={!/^[A-Za-z\s]+\.?$/.test(formData.topic) ? "Invalid input" : ""}
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!/^[A-Za-z\s]+\.?$/.test(formData.description)}
                helperText={!/^[A-Za-z\s]+\.?$/.test(formData.description) ? "Invalid input" : ""}
              />
              <TextField
                label="Solution"
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                error={!/^[A-Za-z\s]+\.?$/.test(formData.solution)}
                helperText={!/^[A-Za-z\s]+\.?$/.test(formData.solution) ? "Invalid input" : ""}
              />
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" sx={{ backgroundColor: "#008000", '&:hover': { backgroundColor: 'darkgreen' }}} >Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: "#008000", '&:hover': { backgroundColor: 'darkgreen' }}} >Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PopupDialogFaqUpdate;
