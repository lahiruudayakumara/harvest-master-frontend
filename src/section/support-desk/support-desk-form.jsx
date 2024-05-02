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
    setSupportData({ ...supportData, [e.target.name]: e.target.value });
    // Clear validation error if user starts typing again
    setErrors({ ...errors, [e.target.name]: "" });
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

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await addSupportRequest(supportData);
      // Handle successful submission
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
      <Paper elevation={3} style={{ width: '80%', height: 600, padding: 20 }}>
        <Typography variant="h5" gutterBottom mb={5}>
          Type Of Issue
        </Typography>

        {/* Buttons Row */}
        <Box display="flex" justifyContent="flex-start" marginBottom={2}>
          <Button variant="contained" color="primary" style={{ marginRight: 8 }}>
            Legal
          </Button>
          <Button variant="contained" color="primary" style={{ marginRight: 8 }}>
            General
          </Button>
          <Button variant="contained" color="primary">
            Technical
          </Button>
        </Box>

        {/* Textfield */}
        <TextField
          name='topic'
          onChange={handleChange}
          value={supportData.topic}
          label="Topic Of The Issue"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.topic}
          helperText={errors.topic || " "}
          inputProps={{
            pattern: '^[A-Za-z\s]*$',
            title: 'Topic should contain only letters'
          }}
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
