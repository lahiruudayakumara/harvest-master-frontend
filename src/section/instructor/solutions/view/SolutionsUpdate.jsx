import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const SolutionsUpdate = ({ open, handleCloseDialog, selectedSolution, handleFieldChange, handleSubmit }) => {
     // State to manage error messages
     const [errorMessage, setErrorMessage] = useState('');

     // Function to handle form submission
     const handleFormSubmit = () => {
         // Check if any of the fields are empty
         if (!selectedSolution.documentUrl || !selectedSolution.solution || !selectedSolution.instructor || !selectedSolution.date) {
             setErrorMessage('Please fill all required fields.');
             return;
         }
 
         // Check if the entered date is today or later
         const selectedDate = new Date(selectedSolution.date);
         const currentDate = new Date();
         if (selectedDate < currentDate) {
             setErrorMessage('Please enter a valid date (today or later)');
             return;
         }
 
         // All fields are filled and date is valid, proceed with form submission
         handleSubmit();
         setErrorMessage(''); 
         handleCloseDialog(); 
     };
 
  return (
    <Dialog open={open} onClose={handleCloseDialog}>
    <DialogTitle>Update Solution</DialogTitle>
    <DialogContent>
        <form>
            
            <TextField
                fullWidth
                type="text"
                name="documentUrl"
                value={selectedSolution?.documentUrl || ''}
                onChange={handleFieldChange}
                margin="normal"
                variant="outlined"
                label="Document Url"
            />
           
            <TextField
                fullWidth
                multiline
                rows={4}
                name="solution"
                value={selectedSolution?.solution || ''}
                onChange={handleFieldChange}
                margin="normal"
                variant="outlined"
                label="Solution"
            />
            
            <TextField
                fullWidth
                type="text"
                name="instructor"
                value={selectedSolution?.instructor || ''}
                onChange={handleFieldChange}
                margin="normal"
                variant="outlined"
                label="Instructor Name"
            />
            
            <TextField
                fullWidth
                type="date"
                name="date"
                value={selectedSolution?.date || ''}
                onChange={handleFieldChange}
                margin="normal"
                variant="outlined"
                label="Date Submitted"
            />
        </form>
    </DialogContent>
    <DialogActions>

        
        <Button onClick={handleCloseDialog} style={{ backgroundColor: '#2CA019', color: 'white' }}>Cancel</Button>
        <Button onClick={handleFormSubmit} style={{ backgroundColor: '#2CA019', color: 'white' }}>Submit</Button>
    </DialogActions>

    {/* Dialog for displaying error messages */}
    <Dialog open={!!errorMessage} onClose={() => setErrorMessage('')} fullWidth maxWidth="xs">
        <DialogTitle>Error</DialogTitle>
        <DialogContent>{errorMessage}</DialogContent>
        <DialogActions>
            
            {/* Button to close the error dialog */}
            <Button onClick={() => setErrorMessage('')} style={{ backgroundColor: '#2CA019', color: 'white' }}>OK</Button>
        </DialogActions>
    </Dialog>
</Dialog>
);
};
  



export default SolutionsUpdate