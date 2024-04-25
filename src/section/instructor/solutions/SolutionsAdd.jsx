//instructor add solution
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';

const SolutionsAdd = ({ open, onClose, issueId }) => {
  const [formData, setFormData] = useState({
    date: '',
    document_url: '',
    instructor: '',
    issueId: issueId,
    solution: '',
    status: '',
    observed_issues: '',
  });
  

  const [error, setError] = useState(''); // State to manage error messages
  const [successMessage, setSuccessMessage] = useState(''); // State to manage success messages
  const [isFormModified, setIsFormModified] = useState(false); // State to track if form is modified
  const [issues, setIssue] = useState([]);

  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate instructor name to contain only alphabetical letters
    if (name === 'instructor' && !/^[a-zA-Z\s]*$/.test(value)) {
      setError('Please enter only alphabetical letters for the Instructor Name field.');
      return;
    }

    setFormData({ ...formData, [name]: value });
    setIsFormModified(true); // Set form modified flag
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

    // Check if the selected date is today's date or a future date
    const currentDate = new Date();
    const selectedDate = new Date(date);

    if (selectedDate < currentDate) {
      setError("Please select today's date or a future date.");
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
  const getCurrentDateString = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    // Pad single digit month and day with a leading zero
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
          <Button
            onClick={handleClose}
            style={{ backgroundColor: "#2CA019", color: "white" }}
          >
            Cancel
          </Button>
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
