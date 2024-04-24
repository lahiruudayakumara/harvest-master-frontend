import React, { useState } from 'react';
import { Paper, Box, Typography, TextField, Button, ThemeProvider, createTheme } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { addSupportRequest } from '../../api/supportApi';

const SupportForm = () => {
  const[supportData,setSupportData] = useState({
    topic:"",
    description:""


})
  const handlechange = (e)=> {setSupportData ({...supportData, [e.target.name]: e.target.value})} 
  const handlesubmit = async (e)=> {e.preventDefault
    try{
      const response = addSupportRequest(supportData)

    } catch (error) {console.log(error)}
  }



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
          onChange={handlechange}
          value={supportData.topic}
          label="Topic Of The Issue"
          variant="outlined"
          fullWidth
          margin="normal"
        />

        {/* Textarea */}
        <TextField
          name='description'
          onChange={handlechange}
          value={supportData.description}
          label="Explain The Issue"
          multiline
          rows={10}
          variant="outlined"
          fullWidth
          margin="normal"
        />

        {/* Image Addition Portal */}
        

        {/* Submit Button */}
        <Box textAlign="left" mt={8}>
          <Button variant="contained" color="primary" onClick={handlesubmit}>
            Submit
          </Button>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default SupportForm;