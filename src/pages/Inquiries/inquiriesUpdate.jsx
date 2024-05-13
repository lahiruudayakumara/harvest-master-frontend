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
  // State variables to manage form data, error messages, and error states
  const [updatedInquiryData, setUpdatedInquiryData] = useState({ ...inquiryData });
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldLocationError, setFieldLocationError] = useState(false);
  const [farmerNameError, setFarmerNameError] = useState(false);
  const [damagedSectionError, setDamagedSectionError] = useState(false);

  // Effect to update form data when inquiryData prop changes
  useEffect(() => {
    setUpdatedInquiryData({ ...inquiryData });
  }, [inquiryData]);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Validate and update form data
    if (name === "fieldLocation" || name === "farmerName" || name === "damagedSection") {
      updatedValue = value.replace(/[^a-zA-Z\s]/g, ""); // Remove any characters that are not alphabets or spaces
      // Set error state based on validation result
      if (updatedValue !== value) {
        if (name === "fieldLocation") {
          setFieldLocationError(true);
        } else if (name === "farmerName") {
          setFarmerNameError(true);
        } else {
          setDamagedSectionError(true);
        }
      } else {
        if (name === "fieldLocation") {
          setFieldLocationError(false);
        } else if (name === "farmerName") {
          setFarmerNameError(false);
        } else {
          setDamagedSectionError(false);
        }
      }
    }

    // Update form data
    setUpdatedInquiryData({ ...updatedInquiryData, [name]: updatedValue });
  };

  
 // Function to handle form submission
const handleSubmit = async () => {
  console.log("Form data before submission:", updatedInquiryData);
  // Clear error message
  setErrorMessage("");

  // Check if any required field is empty
  if (
    !updatedInquiryData.date ||
    !updatedInquiryData.farmerName ||
    !updatedInquiryData.fieldLocation ||
    !updatedInquiryData.observedIssues ||
    !updatedInquiryData.damagedSection
  ) {
    console.log("Required fields are not filled.");
    setErrorMessage("Please fill all required fields.");
    return;
  }

  try {
    // Submit form data
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
          {/* Form fields */}
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
            error={farmerNameError}
            helperText={farmerNameError ? "Please fill alphabetical letters only" : ""}
          />
          <TextField
            fullWidth
            label="Field Location"
            name="fieldLocation"
            value={updatedInquiryData.fieldLocation}
            onChange={handleChange}
            variant="outlined"
            style={{ marginBottom: "20px" }}
            error={fieldLocationError}
            helperText={fieldLocationError ? "Please fill alphabetical letters only" : ""}
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
            error={damagedSectionError}
            helperText={damagedSectionError ? "Please fill alphabetical letters only" : ""}
          />
        </Box>
        {/* Error message */}
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "green" }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} style={{ color: "green" }}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InquiriesUpdate;
