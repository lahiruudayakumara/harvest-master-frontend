//farmers updating inquries
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import axios from "axios";

const InquiriesUpdate = ({ open, onClose, inquiryData, onUpdate }) => {
  const [updatedInquiryData, setUpdatedInquiryData] = useState({ ...inquiryData });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setUpdatedInquiryData({ ...inquiryData });
  }, [inquiryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInquiryData({ ...updatedInquiryData, [name]: value });
  };
  
  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:8080/issue/update/${inquiryData.id}`,
        updatedInquiryData
      );
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating inquiry:", error);
      setErrorMessage("Error updating inquiry. Please try again later.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Inquiry</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            fullWidth
            label="Date"
            name="date"
            value={updatedInquiryData.date}
            onChange={handleChange}
            variant="outlined"
            style={{ marginBottom: "20px" }}
            type="date"
            inputProps={{ min: new Date().toISOString().split('T')[0] }} // Set min date
          />
          <TextField
            fullWidth
            label="Farmer Name"
            name="farmerName"
            value={updatedInquiryData.farmerName}
            onChange={handleChange}
            variant="outlined"
            style={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            label="Field Location"
            name="fieldLocation"
            value={updatedInquiryData.fieldLocation}
            onChange={handleChange}
            variant="outlined"
            style={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            label="Observed Issues"
            name="observedIssues"
            value={updatedInquiryData.observedIssues}
            onChange={handleChange}
            variant="outlined"
            style={{ marginBottom: "20px" }}
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Damaged Section"
            name="damagedSection"
            value={updatedInquiryData.damagedSection}
            onChange={handleChange}
            variant="outlined"
            style={{ marginBottom: "20px" }}
          />
        </Box>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InquiriesUpdate;
