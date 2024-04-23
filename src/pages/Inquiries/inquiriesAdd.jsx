import React, { useState } from "react";
import { TextField, Button, Box, Paper } from "@mui/material";
import axios from "axios";

const InquriesAdd = () => {
  const [inquiryData, setInquiryData] = useState({
    date: "",
    farmerName: "",
    fieldLocation: "",
    imageData: "",
    observedIssues: "",
    damagedSection: "",
    status: "pending",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State to manage error messages
  const [successMessage, setSuccessMessage] = useState(""); // State to manage success messages

  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image_data") {
      setInquiryData({ ...inquiryData, imageData: files[0] });
    } else {
      setInquiryData({ ...inquiryData, [name]: value });
    }

    console.log(inquiryData);
  };

  // Event handler for form submission
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

    // // Check if any required fields are empty
    // if (
    //   !date ||
    //   !farmerName ||
    //   !fieldLocation ||
    //   !imageData ||
    //   !observedIssues ||
    //   !damagedSection
    // ) {
    //   setErrorMessage("Please fill all required fields.");
    //   return;
    // }

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
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setErrorMessage("Error submitting inquiry. Please try again later.");
    }
  };

  return (
    <Box sx={{ padding: "20px" }} mt={8}>
      <Paper elevation={3} sx={{ padding: "20px", m: 10 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="date"
            name="date"
            value={inquiryData.date}
            onChange={handleChange}
            label="Date"
            variant="outlined"
            style={{ marginBottom: "20px" }} // Increased gap
          />
          <TextField
            fullWidth
            type="text"
            name="farmerName"
            value={inquiryData.farmerName}
            onChange={handleChange}
            label="Farmer Name"
            variant="outlined"
            style={{ marginBottom: "20px" }} // Increased gap
          />
          <TextField
            fullWidth
            type="text"
            name="fieldLocation"
            value={inquiryData.fieldLocation}
            onChange={handleChange}
            label="Field Location"
            variant="outlined"
            style={{ marginBottom: "20px" }} // Increased gap
          />
          <TextField
            fullWidth
            type="file"
            name="image_data"
            onChange={handleChange}
            label="Images"
            variant="outlined"
            style={{ marginBottom: "20px" }} // Increased gap
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            name="observedIssues"
            value={inquiryData.observedIssues}
            onChange={handleChange}
            label="Observed Issues"
            variant="outlined"
            style={{ marginBottom: "20px" }} // Increased gap
          />
          <TextField
            fullWidth
            type="text"
            name="damagedSection"
            value={inquiryData.damagedSection}
            onChange={handleChange}
            label="Damaged Section"
            variant="outlined"
            style={{ marginBottom: "20px" }} // Increased gap
          />
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

export default InquriesAdd;
