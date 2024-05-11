//instructor add solution
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';

const SolutionsAdd = ({ open, onClose, issueId }) => {
  // State for managing form data
  const [formData, setFormData] = useState({
    date: '',
    document_url: '',
    instructor: '',
    issueId: issueId,
    solution: '',
    status: '',
    observed_issues: '',
  });

  // State for managing error messages
  const [error, setError] = useState('');

  // State for managing success message
  const [successMessage, setSuccessMessage] = useState('');

  // State to track if form is modified
  const [isFormModified, setIsFormModified] = useState(false);

  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate instructor name to contain only alphabetical letters
    if (name === 'instructor') {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setError('Please enter only alphabetical letters for the Instructor Name field.');
        return;
      }
    }

    // Validate document URL to not contain numbers
    if (name === 'document_url') {
      if (/\d/.test(value)) {
        setError('Please do not enter numbers for the Document URL field.');
        return;
      }
    }

    // Update form data and set form modified flag
    setFormData({ ...formData, [name]: value });
    setIsFormModified(true);
  };

  // Event handler for form submission
  const handleSubmit = async () => {
    const { date, document_url, instructor, solution } = formData;

    // Check if any required fields are empty
    if (!date || !document_url || !instructor || !solution) {
      setError("Please fill all required fields.");
      return;
    }

    // Validate document_url to be a valid HTTP URL
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(document_url)) {
      setError("Please enter a valid HTTP URL for the Document URL field.");
      return;
    }

    // Submit the solution data
    try {
      await axios.post(
        `http://localhost:8080/solution/add/${issueId}`,
        formData
      );
      onClose(true); // Close dialog with success status
      setSuccessMessage("Solution added successfully!");
    } catch (error) {
      console.error("Error submitting solution:", error);
    }
  };

  // Event handler for dialog close
  const handleClose = () => {
    if (isFormModified) {
      // If form is modified, confirm with the user before closing
      if (window.confirm('Are you sure you want to discard changes?')) {
        onClose(false);
      }
    } else {
      // If form is not modified, close the dialog directly
      onClose(false);
    }
  };

  // Event handler for success message dialog close
  const handleSuccessMessageClose = () => {
    setSuccessMessage('');
    window.location.reload();
  };

  // Function to get current date as string in 'YYYY-MM-DD' format
  const getCurrentDateString = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };


  return (
    <>
      {/* Dialog for adding solutions */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Provide Solution</DialogTitle>
        <DialogContent>
          {/* Date input field */}
          <TextField
            fullWidth
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            label="Date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: getCurrentDateString(), // Set the minimum date to today
            }}
            style={{ marginBottom: "10px" }}
          />
          {/* Document URL input field */}
          <TextField
            fullWidth
            type="text"
            name="document_url"
            value={formData.document_url}
            onChange={handleChange}
            label="Document Url"
            variant="outlined"
            style={{ marginBottom: "10px" }}
          />

          {/* Instructor name input field */}
          <TextField
            fullWidth
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            label="Instructor Name"
            variant="outlined"
            style={{ marginBottom: "10px" }}
          />
          
          {/* Solution input field */}
          <TextField
            fullWidth
            type="text"
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            label="Solution"
            multiline
            rows={4}
            variant="outlined"
          />
          {/* Hidden field for status */}
          <TextField
            fullWidth
            type="hidden"
            name="status"
            value={formData.status}
            onChange={handleChange}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          {/* Cancel button */}
          <Button
            onClick={handleClose}
            style={{ backgroundColor: "#2CA019", color: "white" }}
          >
            Cancel
          </Button>
          {/* Submit button */}
          <Button
            onClick={handleSubmit}
            style={{ backgroundColor: "#2CA019", color: "white" }}
          >
            Submit
          </Button>
        </DialogActions>
        {/* Dialog for displaying error messages */}
        <Dialog open={!!error} onClose={() => setError("")}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>{error}</DialogContent>
          <DialogActions>
            <Button
              onClick={() => setError("")}
              style={{ backgroundColor: "#2CA019", color: "white" }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Dialog>
      {/* Dialog for displaying success message */}
      <Dialog open={!!successMessage} onClose={handleSuccessMessageClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>{successMessage}</DialogContent>
        <DialogActions>
          <Button
            onClick={handleSuccessMessageClose}
            style={{ backgroundColor: "#2CA019", color: "white" }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SolutionsAdd;
