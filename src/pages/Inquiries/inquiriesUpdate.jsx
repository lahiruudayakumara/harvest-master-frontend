//farmers updating inquries
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const InquiriesUpdate = ({ open, handleCloseDialog, selectedIssue, handleFieldChange, handleSubmit }) => {
    // State to manage error messages
    const [errorMessage, setErrorMessage] = useState('');

    // Log the selectedIssue when it changes
    useEffect(() => {
        console.log('Selected Issue:', selectedIssue);
    }, [selectedIssue]);

    // Function to handle form submission
    const handleFormSubmit = () => {
        // Check if any of the fields are empty
        if (!selectedIssue.date || !selectedIssue.farmerName || !selectedIssue.fieldLocation || !selectedIssue.image_data || !selectedIssue.observedIssues || !selectedIssue.damagedSection) {
            setErrorMessage('Please fill all required fields.');
            return;
        }

        // Validate farmerName to contain only alphabetical letters
        if (!/^[a-zA-Z\s]*$/.test(selectedIssue.farmerName)) {
            setErrorMessage('Please enter only alphabetical letters for the Farmer Name field.');
            return;
        }

        // Check if the selected date is today's date or a future date
        const currentDate = new Date();
        const selectedDate = new Date(selectedIssue.date);
        if (selectedDate < currentDate) {
            setErrorMessage('Please select today\'s date or a future date.');
            return;
        }

        // Proceed with form submission if all validations pass
        handleSubmit();
        setErrorMessage('');
        handleCloseDialog();
    };

    // Function to handle cancel action
    const handleCancel = () => {
        handleCloseDialog(); // Close the dialog
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
                        value={selectedIssue?.farmerName || ''}
                        onChange={handleFieldChange}
                        margin="normal"
                        variant="outlined"
                        label="Farmer Name"
                    />
                    <TextField
                        fullWidth
                        type="text"
                        name="fieldLocation"
                        value={selectedIssue?.fieldLocation || ''}
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
                        type="text"
                        name="observedIssues"
                        value={selectedIssue?.observedIssues || ''}
                        onChange={handleFieldChange}
                        margin="normal"
                        variant="outlined"
                        label="Observed Issues"
                    />
                    <TextField
                        fullWidth
                        type="text"
                        name="damagedSection"
                        value={selectedIssue?.damagedSection || ''}
                        onChange={handleFieldChange}
                        margin="normal"
                        variant="outlined"
                        label="Damaged Section"
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} style={{ backgroundColor: '#FF0000', color: 'white' }}>Cancel</Button>
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

export default InquiriesUpdate;
