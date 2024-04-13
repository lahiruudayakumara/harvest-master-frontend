//farmers adding inquries
import React, { useState} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';

const InquriesAdd = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        date: '',
        farmer_name: '',
        field_location: '',
        image_data: '',
        observed_issues: '',
        damaged_section: '',
        status: 'pending',
    });

    const [error, setError] = useState(''); // State to manage error messages
    const [successMessage, setSuccessMessage] = useState(''); // State to manage success messages
    const [isFormModified, setIsFormModified] = useState(false); // State to track if form is modified
    const[issues,setIssues]=useState([]);

    // Event handler for input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setIsFormModified(true); // Set form modified flag
    };

    

    // Event handler for form submission
    const handleSubmit = async () => {
        const { date, farmer_name, field_location, image_data, observed_issues, damaged_section } = formData;

        // Check if any required fields are empty
        if (!date || !farmer_name || !field_location || !image_data || !observed_issues || !damaged_section) {
            setError('Please fill all required fields.');
            return;
        }

        // Submit the inquiry data
        try {
            const response = await axios.post('http://localhost:8080/issue/add', formData);
            onClose(true); // Close dialog with success status
            setSuccessMessage('Inquiry added successfully!');
        } catch (error) {
            console.error('Error submitting inquiry:', error);
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

    return (
        <>
            {/* Dialog for adding inquiries */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add Inquiry</DialogTitle>
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
                        name="farmer_name"
                        value={formData.farmer_name}
                        onChange={handleChange}
                        label="Farmer Name"
                        variant="outlined"
                        style={{ marginBottom: '10px' }}
                    />
                    <TextField
                        fullWidth
                        type="text"
                        name="field_location"
                        value={formData.field_location}
                        onChange={handleChange}
                        label="Field Location"
                        variant="outlined"
                        style={{ marginBottom: '10px' }}
                    />
                    <TextField
                        fullWidth
                        type="file"
                        name="image_data"
                        onChange={handleChange}
                        label="Images"
                        variant="outlined"
                        style={{ marginBottom: '10px' }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        name="observed_issues"
                        value={formData.observed_issues}
                        onChange={handleChange}
                        label="Observed Issues"
                        variant="outlined"
                        style={{ marginBottom: '10px' }}
                    />
                    <TextField
                        fullWidth
                        type="text"
                        name="damaged_section"
                        value={formData.damaged_section}
                        onChange={handleChange}
                        label="Damaged Section"
                        variant="outlined"
                        style={{ marginBottom: '10px' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{ backgroundColor: '#2CA019', color: 'white' }}>Cancel</Button>
                    <Button onClick={handleSubmit} style={{ backgroundColor: '#2CA019', color: 'white' }}>Submit</Button>
                </DialogActions>

                {/* Dialog for displaying error messages */}
                <Dialog open={!!error} onClose={() => setError('')}>
                    <DialogTitle>Error</DialogTitle>
                    <DialogContent>{error}</DialogContent>
                    <DialogActions>
                        <Button onClick={() => setError('')} style={{ backgroundColor: '#2CA019', color: 'white' }}>OK</Button>
                    </DialogActions>
                </Dialog>
            </Dialog>

            {/* Dialog for displaying success message */}
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

export default InquriesAdd;

