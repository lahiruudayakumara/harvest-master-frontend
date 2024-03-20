import React from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const CustomForm = () => {
  // Define custom theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#006400", // Dark green color
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} style={{ width: "80%", height: 600, padding: 20 }}>
        <Typography variant="h5" gutterBottom>
          My Topic
        </Typography>

        {/* Buttons Row */}
        <Box display="flex" justifyContent="flex-start" marginBottom={2}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 8 }}
          >
            Button 1
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 8 }}
          >
            Button 2
          </Button>
          <Button variant="contained" color="primary">
            Button 3
          </Button>
        </Box>

        {/* Textfield */}
        <TextField
          label="Textfield Label"
          variant="outlined"
          fullWidth
          margin="normal"
        />

        {/* Textarea */}
        <TextField
          label="Textarea Label"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
        />

        {/* Image Addition Portal */}
        <Box display="flex" alignItems="center" marginBottom={2}>
          <AddPhotoAlternateIcon />
          <Typography variant="body2" marginLeft={1}>
            Add Image
          </Typography>
        </Box>

        {/* Submit Button */}
        <Box textAlign="left">
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default CustomForm;
