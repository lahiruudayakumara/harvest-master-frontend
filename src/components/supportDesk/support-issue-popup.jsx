import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, Box, createTheme, ThemeProvider } from "@mui/material";
import { updateSupportSolution } from "src/api/supportApi";

const theme = createTheme({
  palette: {
    primary: {
      main: '#008000',
    },
  },
});

const UpdateDialog = (props) => {
  const [open, setOpen] = useState(false);
  const [updatedTopic, setUpdatedTopic] = useState(props.topic);
  const [updatedIssue, setUpdatedIssue] = useState(props.issue);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTopicChange = (e) => {
    const inputValue = e.target.value;
    const regex = /^[A-Za-z\s]+\.?$/; // Regular expression to match only letters, spaces, and one optional full stop at the end

    if (regex.test(inputValue) || inputValue === '') {
      setUpdatedTopic(inputValue);
    }
  };

  const handleIssueChange = (e) => {
    const inputValue = e.target.value;
    const regex = /^[A-Za-z\s]+\.?$/; // Regular expression to match only letters, spaces, and one optional full stop at the end

    if (regex.test(inputValue) || inputValue === '') {
      setUpdatedIssue(inputValue);
    }
  };

  const handleUpdate = async () => {
    const response = await updateSupportSolution(props.id,updatedTopic,updatedIssue,"") 

    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button variant="contained" onClick={handleOpen} sx={{ color: '#ffffff', backgroundColor: '#008000', '&:hover': { backgroundColor: '#006400' } }}>Edit</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Support Request</DialogTitle>
          <DialogContent>
            <TextField
              label="Topic"
              value={updatedTopic}
              onChange={handleTopicChange}
              fullWidth
              margin="normal"
              sx={{ '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#008000' }, '&.Mui-focused fieldset': { borderColor: '#008000' } } }}
            />
            <TextField
              label="Issue"
              value={updatedIssue}
              onChange={handleIssueChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              sx={{ '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#008000' }, '&.Mui-focused fieldset': { borderColor: '#008000' } } }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" sx={{ color: '#FFFFFF',backgroundColor:"#008000" }}>Cancel</Button>
            <Button onClick={handleUpdate} variant="contained" sx={{ color: '#FFFFFF',backgroundColor:"#008000" }}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default UpdateDialog;
