//instructor update solution
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const SolutionsUpdate = ({ open, handleCloseDialog, selectedSolution, handleFieldChange, handleSubmit }) => {
     // State to manage error messages
     const [errorMessage, setErrorMessage] = useState('');

     // Function to handle form submission
     const handleFormSubmit = () => {
         // Check if any of the fields are empty
         if (!selectedSolution.document_url || !selectedSolution.solution || !selectedSolution.instructor || !selectedSolution.date) {
             setErrorMessage('Please fill all required fields.');
             return;
         }
     
         // Validate document_url to be a valid HTTP URL
         const urlRegex = /^(http|https):\/\/[^ "]+$/;
         if (!urlRegex.test(selectedSolution.document_url)) {
             setErrorMessage('Please enter a valid HTTP URL for the Document URL field.');
             return;
         }

         // Validate instructor name to contain only alphabetical letters
         if (!/^[a-zA-Z\s]*$/.test(selectedSolution.instructor)) {
             setErrorMessage('Please enter only alphabetical letters for the Instructor Name field.');
             return;
         }
 

         // Proceed with form submission if all validations pass
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
                name="document_url"
                value={selectedSolution?.document_url || ''}
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
                        inputProps={{ min: new Date().toISOString().split('T')[0] }} // Set minimum date to today
                    />

            <TextField
                fullWidth
                type="hidden"
                name="issue_id"
                value={selectedSolution?.issue_id || ''}
                onChange={handleFieldChange}
                margin="normal"
                variant="outlined"
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

export default SolutionsUpdate;
