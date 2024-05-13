//farmers adding inquiries
import React, { useState } from "react";
import { TextField, Button, Box, Paper, Select, MenuItem, InputLabel } from "@mui/material";
import axios from "axios";

const InquiriesAdd = () => {
  const [inquiryData, setInquiryData] = useState({
    date: "",
    farmerName: "",
    fieldLocation: "",
    imageData: "",
    observedIssues: "",
    damagedSection: "",
    status: "pending",
  });

  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessages, setErrorMessages] = useState({
    farmerName: "",
    fieldLocation: ""
  });
  
  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    // Prevent typing of numbers and special characters
    if ((name === 'farmerName' || name === 'fieldLocation') && /[^\sa-zA-Z]/.test(value)) {
      e.preventDefault(); // Prevent the default behavior of typing the character
      setErrorMessages({ ...errorMessages, [name]: `Please enter only alphabetical letters for the ${name === 'farmerName' ? 'Farmer Name' : 'Field Location'} field.` });
      return; 
    }
  
    // Reset error message when the input is valid
    setErrorMessages({ ...errorMessages, [name]: "" }); // Clear error message
  
    if (name === "image_data") {
      setInquiryData({ ...inquiryData, imageData: files[0] });
    } else {
      setInquiryData({ ...inquiryData, [name]: value });
    }
  };
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const {
      date,
      farmerName,
      fieldLocation,
      imageData,
      observedIssues,
      damagedSection,
    } = inquiryData;

    // Check if any required fields are empty
    if (
      !date ||
      !farmerName ||
      !fieldLocation ||
      !imageData ||
      !observedIssues ||
      !damagedSection
    ) {
      setErrorMessage("Please fill all required fields.");
      return;
    } else {
      setErrorMessage(""); // Clear error message if all required fields are filled
    }
    
    // Create a new FormData object
    const formData = new FormData();
    formData.append("date", date);
    formData.append("farmer_name", farmerName);
    formData.append("field_location", fieldLocation);
    formData.append("observed_issues", observedIssues);
    formData.append("damaged_section", damagedSection);

    // Append image file to the formData object
    const imageFile = e.target.elements.image_data.files[0];
    if (imageFile) {
      formData.append("image_data", imageFile);
    }

    // Submit the inquiry data
    try {
      const response = await axios.post(
        "http://localhost:8080/issue/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage("Inquiry added successfully!");
      setErrorMessage(""); 
      setInquiryData({
        date: "",
        farmerName: "",
        fieldLocation: "",
        imageData: "", 
        observedIssues: "",
        damagedSection: "",
        status: "pending",
      }); // Reset form fields
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setErrorMessage("Error submitting inquiry. Please try again later.");
    }
  };

  return (
    <Box sx={{ padding: "20px" }} mt={8}>
      <Paper elevation={3} sx={{ padding: "20px", m: 10 }}>
        <h2 style={{ textAlign: "center" }}>Inquiry</h2>
        <form onSubmit={handleSubmit}>

          
          <InputLabel htmlFor="date">Date</InputLabel>
          <TextField
            fullWidth
            type="date"
            name="date"
            value={inquiryData.date}
            onChange={handleChange}
            variant="outlined"
            style={{ marginBottom: "20px" }}
            inputProps={{ min: new Date().toISOString().split('T')[0] }} 
          />

         
          <InputLabel htmlFor="farmerName">Farmer Name</InputLabel>
          <TextField
            fullWidth
            type="text"
            name="farmerName"
            value={inquiryData.farmerName}
            onChange={handleChange}
            variant="outlined"
            style={{ marginBottom: "20px" }} 
            error={!!errorMessages.farmerName} // Check if there's an error message for Farmer Name
            helperText={errorMessages.farmerName} // Display error message if it exists
          />

          
          <InputLabel htmlFor="fieldLocation">Field Location</InputLabel>
          <TextField
            fullWidth
            type="text"
            name="fieldLocation"
            value={inquiryData.fieldLocation}
            onChange={handleChange}
            variant="outlined"
            style={{ marginBottom: "20px" }} 
            error={!!errorMessages.fieldLocation} // Check if there's an error message for Field Location
            helperText={errorMessages.fieldLocation} // Display error message if it exists
          />

          
          <InputLabel htmlFor="image_data">Images</InputLabel>
          <TextField
            fullWidth
            type="file"
            name="image_data"
            onChange={handleChange}
            variant="outlined"
            style={{ marginBottom: "20px", marginTop: "20px" }}
          />

         
          <InputLabel htmlFor="observedIssues">Observed Issues</InputLabel>
          <TextField
            fullWidth
            multiline
            rows={4}
            name="observedIssues"
            value={inquiryData.observedIssues}
            onChange={handleChange}
            variant="outlined"
            style={{ marginBottom: "20px" }} 
          />

          
          <InputLabel htmlFor="damagedSection">Damaged Section</InputLabel>
          <Select
            fullWidth
            value={inquiryData.damagedSection}
            onChange={handleChange}
            name="damagedSection"
            variant="outlined"
            style={{ marginBottom: "20px" }}
          >
            <MenuItem value="Stem">Stem</MenuItem>
            <MenuItem value="Leaves">Leaves</MenuItem>
            <MenuItem value="Roots">Roots</MenuItem>
            <MenuItem value="Panicles">Panicles</MenuItem>
            <MenuItem value="Grains">Grains</MenuItem>
            <MenuItem value="Internodes">Internodes</MenuItem>
            <MenuItem value="Sheaths">Sheaths</MenuItem>
          </Select>

          
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "#2CA019",
              color: "white",
              marginTop: "20px",
            }}
          >
            Submit
          </Button>

          {/* Display error message if any */}
          {errorMessage && (
            <div style={{ color: "red", marginTop: "20px" }}>
              {errorMessage}
            </div>
          )}

          {/* Display success message if any */}
          {successMessage && (
            <div style={{ color: "green", marginTop: "20px" }}>
              {successMessage}
            </div>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default InquiriesAdd;
