//farmers adding inquiries
import React, {  useState } from "react";
import { TextField, Button, Box, Paper,Select,MenuItem,InputLabel} from "@mui/material";
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

  const [errorMessage, setErrorMessage] = useState(""); // State to manage error messages
  const [successMessage, setSuccessMessage] = useState(""); // State to manage success messages


  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    // Validate farmer name to contain only alphabetical letters
    if (name === 'farmerName' && !/^[a-zA-Z\s]*$/.test(value)) {
      setErrorMessage('Please enter only alphabetical letters for the Farmer Name field.');
      return;
    }
  
    // Validate field Location to contain only alphabetical letters
    if (name === 'fieldLocation' && !/^[a-zA-Z\s]*$/.test(value)) {
      setErrorMessage('Please enter only alphabetical letters for the Field Location.');
      return;
    }
  
    if (name === "image_data") {
      setInquiryData({ ...inquiryData, imageData: files[0] });
    } else {
      setInquiryData({ ...inquiryData, [name]: value });
    }
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
      setErrorMessage(""); // Reset error message
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
             inputProps={{ min: new Date().toISOString().split('T')[0] }} // Set min date
              />

           <InputLabel htmlFor="farmerName">Farmer Name</InputLabel>
          <TextField
            fullWidth
            type="text"
            name="farmerName"
            value={inquiryData.farmerName}
            onChange={handleChange}
            variant="outlined"
            style={{ marginBottom: "20px" }} // Increased gap
          />

          <InputLabel htmlFor="fieldLocation">Field Location</InputLabel>
          <TextField
            fullWidth
            type="text"
            name="fieldLocation"
            value={inquiryData.fieldLocation}
            onChange={handleChange}
            variant="outlined"
            style={{ marginBottom: "20px" }} // Increased gap
          />

          <InputLabel htmlFor="image_data">Images</InputLabel>
          <TextField
            fullWidth
            type="file"
            name="image_data"
            onChange={handleChange}
            variant="outlined"
            style={{ marginBottom: "20px", marginTop: "20px" }}// Increased gap
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
            style={{ marginBottom: "20px" }} // Increased gap
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
