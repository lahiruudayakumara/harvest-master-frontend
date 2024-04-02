import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';

const InquiriesAdd = ({ open, onClose, issueId }) => {
  const [formData, setFormData] = useState({
    date: '',
    documentUrl: '',
    instructor: '',
    issueId: issueId,
    solution: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isFormModified, setIsFormModified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsFormModified(true); // Set form modified flag
  };

  const handleSubmit = async () => {
    const { date, documentUrl, instructor, solution } = formData;

    // Check if any required fields are empty
    if (!date || !documentUrl || !instructor || !solution) {
      setError('Please fill all required fields.');
      return;
    }

    // Validate if the entered date is today or later
    const selectedDate = new Date(date);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      setError('Please enter a valid date (today or later)');
      return;
    }

    // Submit the solution data
    try {
      await axios.post(`http://localhost:8080/solution/add`, formData);
      onClose(true); // Close dialog with success status
      setSuccessMessage('Solution added successfully!');
    } catch (error) {
      console.error('Error submitting solution:', error);
    }
  };

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

  const handleSuccessMessageClose = () => {
    setSuccessMessage('');
  };

  return (
    <>
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
            style={{ marginBottom: '10px' }}
          />
          <TextField
            fullWidth
            type="text"
            name="documentUrl"
            value={formData.documentUrl}
            onChange={handleChange}
            label="Document URL"
            variant="outlined"
            style={{ marginBottom: '10px' }}
          />
          <TextField
            fullWidth
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            label="Instructor Name"
            variant="outlined"
            style={{ marginBottom: '10px' }}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ backgroundColor: '#2CA019', color: 'white' }}>Cancel</Button>
          <Button onClick={handleSubmit} style={{ backgroundColor: '#2CA019', color: 'white' }}>Submit</Button>
        </DialogActions>

        {/* Dialog for displaying error */}
        <Dialog open={!!error} onClose={() => setError('')}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>{error}</DialogContent>
          <DialogActions>
            <Button onClick={() => setError('')} style={{ backgroundColor: '#2CA019', color: 'white' }}>OK</Button>
          </DialogActions>
        </Dialog>
      </Dialog>

      {/* Success message dialog */}
      <Dialog open={!!successMessage} onClose={handleSuccessMessageClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>{successMessage}</DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessMessageClose} style={{ backgroundColor: '#2CA019', color: 'white' }}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InquiriesAdd;
