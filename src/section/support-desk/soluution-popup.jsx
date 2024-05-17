import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Box,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { updateSupportSolution } from "src/api/supportApi";

// Define custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#008000",
    },
  },
});

const PopupDialogSupport = (props) => {
  const [open, setOpen] = useState(false);
  const [solution, setSolution] = useState(props.data.solution);
  const [errors, setErrors] = useState("");

  useEffect(() => {

   

    if (props.data.status == "Pending") {
      setSolution("");
    }
    
    if(props.data.status == "Answered"){
      setSolution(props.data.solution);
    }

    

  
  }, [props]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors("");
  };

  const handleTextAreaChange = (e) => {
    const inputValue = e.target.value;
    const regex = /^([A-Za-z\s]+\.?)?$/;
    // Regular expression to match only letters, spaces, and one optional full stop at the end

    if (regex.test(inputValue)) {
      setSolution(inputValue);
      setErrors(""); // Clear any previous validation errors
    } else {
      setErrors("Only letters are allowed."); // Set validation error message
    }
  };

  const handleSubmit = async () => {
    const response = await updateSupportSolution(
      props.data.r_Id,
      props.data.topic,
      props.data.issue,
      solution
    );

    if (response.status === 200) {
      alert("Success");
    } else {
      alert("Failed");
    }

    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box width={500}>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            width: "30px",
            fontSize: "10px",
            "&:hover": { backgroundColor: "darkgreen" }, // Dark green on hover
          }}
        >
          Solution
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{ mt: 10, width: "100%" }}
          maxWidth={"sm"}
        >
          <DialogTitle>
            <Typography variant="h5">Provide Solution</Typography>
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pb: 5,
              mt: 5,
            }}
          >
            <Typography variant="h6">Issue</Typography>
            <Typography variant="body2" mb={3}>
              {props.data.issue}
            </Typography>
            <Typography variant="h6" mb={1}>
              Enter the solution
            </Typography>
            <TextField
              variant="outlined"
              multiline
              rows={5}
              fullWidth
              value={solution}
              onChange={handleTextAreaChange}
              placeholder="Type your text here..."
              inputProps={{ maxLength: 200 }} // Limiting to 200 characters
              error={Boolean(errors)} // Set error state based on whether there are validation errors
              helperText={errors} // Display validation error message
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "green", // Green border on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "green", // Green border when focused
                  },
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={solution == null || solution == ""}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default PopupDialogSupport;
