import React, { useState } from 'react';
import { Paper, Box, Typography, TextField, Button, ThemeProvider, createTheme } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { addSupportRequest } from '../../api/supportApi';

const SupportForm = () => {
  const [supportData, setSupportData] = useState({
    topic: "",
    description: ""
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const inputValue = e.target.value;
    const regex = /^([A-Za-z\s]+\.?)?$/; // Regular expression to match letters and spaces
  
    if (regex.test(inputValue)) {
      // If the input contains only letters and spaces
      setSupportData({ ...supportData, [e.target.name]: inputValue });
      // Clear validation error if user starts typing again
      setErrors({ ...errors, [e.target.name]: "" });
    } else {
      // If the input contains numbers or special characters
      // Handle the error accordingly, for example:
      setErrors({ ...errors, [e.target.name]: "Only letters and spaces are allowed." });
    }
  };
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const validationErrors = {};
    if (!/^[A-Za-z\s]+$/.test(supportData.topic.trim())) {
      validationErrors.topic = 'Topic should contain only letters';
    }
    if (!/^[A-Za-z\s]+$/.test(supportData.description.trim())) {
      validationErrors.description = 'Description should contain only letters';
    }

   

    try {
      const response = await addSupportRequest(supportData);
     if(!response){
      alert("Successfully added");
      window.location.href="/my-requests"
     }

      
      
    } catch (error) {
      console.log(error);
    }
  };

  // Define custom theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2ca019", // Dark green color
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={15} style={{ width: '80%', height: 600, padding: 20,border:2,borderColor:"black" }}>
        <Typography variant="h5" gutterBottom mb={5}>
          Type Of Issue
        </Typography>

        

        {/* Textfield */}
        <TextField
          name='topic'
          onChange={handleChange}
          value={supportData.topic}
          label="Enter Your Issue Details"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.topic}
          helperText={errors.topic || " "}
         
        />

        {/* Textarea */}
        <TextField
          name='description'
          onChange={handleChange}
          value={supportData.description}
          label="Explain The Issue"
          multiline
          rows={10}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.description}
          helperText={errors.description || " "}
          inputProps={{
            pattern: '^[A-Za-z\s]*$',
            title: 'Description should contain only letters'
          }}
        />

        {/* Image Addition Portal */}

        {/* Submit Button */}
        <Box textAlign="left" mt={5}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default SupportForm;
