//Farmers viewing inquiries and solutions to those inquiries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, Typography, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const InquiriesView = ({issue_id}) => {
    
    const [issues, setIssues] = useState([]); // Holds the list of issues fetched from the backend
    const [selectedIssue, setSelectedIssue] = useState(null); // Holds the selected issue for editing
    const [openEditDialog, setOpenEditDialog] = useState(false); // Controls the visibility of the edit dialog
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Controls the visibility of the delete confirmation dialog
    const [deleteFunction, setDeleteFunction] = useState(null); // Function to execute when confirming deletion
    const [solutions, setSolutions] = useState([]); // Holds the list of solutions fetched for a particular issue

    // useEffect hook to fetch issues from backend when component mounts
    useEffect(() => {
        fetchIssues();
    }, []);
    

    // Function to fetch issues from the backend
    const fetchIssues = async () => {
        try {
            const response = await axios.get('http://localhost:8080/issue/getAll');
            setIssues(response.data);
        } catch (error) {
            console.error('Error fetching issues:', error);
        }
    };

    // Function to fetch solutions for a particular issue from the backend
    const fetchSolutionsForIssue = async (issueId) => {
        try {
            const response = await axios.get(`http://localhost:8080/solution/solutions/${issue_id}`);
            setSolutions(response.data);
        } catch (error) {
            console.error('Error fetching solutions:', error);
        }
    };

    // Function to handle "View Solutions" button click
    const handleViewSolutions = (issueId) => {
        setSelectedIssue(issueId);
        fetchSolutionsForIssue(issueId);
    };

    // Function to handle "Edit" button click
    const handleEditClick = (issue) => {
        setSelectedIssue(issue);
        setOpenEditDialog(true);
    };

    // Function to handle closing of the edit dialog
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    // Function to handle field change in the edit form
    const handleFieldChange = (e) => {
        setSelectedIssue({
            ...selectedIssue,
            [e.target.name]: e.target.value
        });
    };

    // Function to handle form submission for editing
    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:8080/issue/update/${selectedIssue.id}`, selectedIssue);
            setOpenEditDialog(false);
            fetchIssues(); 
        } catch (error) {
            console.error('Error updating issue:', error);
        }
    };

    // Function to delete an issue
    const deleteIssue = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/issue/issue/${id}`);
            fetchIssues(); // Refresh issues list after deletion
        } catch (error) {
            console.error('Error deleting issue:', error);
        }
    };

    // Function to handle delete confirmation dialog open
    const handleDeleteConfirmation = (id) => {
        setOpenDeleteDialog(true);
        setDeleteFunction(() => () => deleteIssue(id));
    };

    // Function to handle delete confirmation dialog close
    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

    // Function to handle confirm delete in delete confirmation dialog
    const handleConfirmDelete = () => {
        if (deleteFunction) {
            deleteFunction();
            setOpenDeleteDialog(false);
        }
    };

    return (
        <>
            
            <TableContainer component={Paper} style={{ marginBottom: '10px' }}>
                <Table>
                    <TableHead>
                       
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Farmer Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Field Location</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Images</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Observed Issues</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Damaged Section</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        {issues.map((issue, index) => (
                            <TableRow key={index}>
                                <TableCell>{issue.date}</TableCell>
                                <TableCell>{issue.farmer_name}</TableCell>
                                <TableCell>{issue.field_location}</TableCell>
                                <TableCell>{issue.observed_issues}</TableCell>
                                <TableCell>{issue.image_data}</TableCell>
                                <TableCell>{issue.damaged_Section}</TableCell>
                                <TableCell>
                                    <Box display="flex">
                                        {/* Button to edit an issue */}
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: '#2CA019', color: 'white', marginRight: '8px', fontSize: '10px' }}
                                            onClick={() => handleEditClick(issue)}
                                        >
                                            Update
                                        </Button>
                                        {/* Button to delete an issue */}
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: '#FF0000', color: 'white', fontSize: '10px' }}
                                            onClick={() => handleDeleteConfirmation(issue.id)}
                                        >
                                            Delete
                                        </Button>
                                        {/* Button to view solutions for an issue */}
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: '#0000FF', color: 'white', marginLeft: '8px', fontSize: '10px' }}
                                            onClick={() => handleViewSolutions(issue.id)}
                                        >
                                            View Solutions
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Inquiry Dialog */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Update Inquiry</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} style={{ backgroundColor: '#2CA019', color: 'white' }}>Cancel</Button>
                    <Button onClick={handleSubmit} style={{ backgroundColor: '#2CA019', color: 'white' }}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Are you sure you want to delete the inquiry?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} style={{ backgroundColor: '#2CA019', color: 'white' }}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} style={{ backgroundColor: '#2CA019', color: 'white' }}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default InquiriesView;
