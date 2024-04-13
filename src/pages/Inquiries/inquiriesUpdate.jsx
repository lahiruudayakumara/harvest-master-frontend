//farmers updating inquries
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const inquiriesUpdate = ({ open, handleCloseDialog, selectedIssue, handleFieldChange, handleSubmit }) => {
    // State to manage error messages
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle form submission
    const handleFormSubmit = () => {
        // Check if any of the fields are empty
        if (!selectedIssue.farmer_name || !selectedIssue.field_location || !selectedIssue.image_data || !selectedIssue.observed_issues || !selectedIssue.damaged_Section) {
            setErrorMessage('Please fill all required fields.');
            return;
        }

        // All fields are filled, proceed with form submission
        handleSubmit();
        setErrorMessage(''); 
        handleCloseDialog(); 
    };

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>Update Inquiry</DialogTitle>
            <DialogContent>
                <form>
                    <TextField
                        fullWidth
                        type="date"
                        name="date"
                        value={selectedIssue?.date || ''}
                        onChange={handleFieldChange}
                        margin="normal"
                        variant="outlined"
                        label="Date"
                    />
                    <TextField
                        fullWidth
                        type="text"
                        name="farmerName"
                        value={selectedIssue?.farmer_name || ''}
                        onChange={handleFieldChange}
                        margin="normal"
                        variant="outlined"
                        label="Farmer Name"
                    />
                    <TextField
                        fullWidth
                        type="text"
                        name="fieldLocation"
                        value={selectedIssue?.field_location || ''}
                        onChange={handleFieldChange}
                        margin="normal"
                        variant="outlined"
                        label="Field Location"
                    />
                    <TextField
                        fullWidth
                        type="file"
                        name="image_data"
                        value={selectedIssue?.image_data || ''}
                        onChange={handleFieldChange}
                        margin="normal"
                        variant="outlined"
                        label="Images"
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        name="observedIssues"
                        value={selectedIssue?.observed_issues || ''}
                        onChange={handleFieldChange}
                        margin="normal"
                        variant="outlined"
                        label="Observed Issues"
                    />
                    <TextField
                        fullWidth
                        type="text"
                        name="damagedSection"
                        value={selectedIssue?.damaged_Section || ''}
                        onChange={handleFieldChange}
                        margin="normal"
                        variant="outlined"
                        label="Damaged Section"
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
                    <Button onClick={() => setErrorMessage('')} style={{ backgroundColor: '#2CA019', color: 'white' }}>OK</Button>
                </DialogActions>
            </Dialog>
        </Dialog>
    );
};

export default inquiriesUpdate;
