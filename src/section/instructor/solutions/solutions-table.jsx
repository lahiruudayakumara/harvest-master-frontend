import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Dialog, Typography, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SolutionsUpdate from './view/SolutionsUpdate';

const SolutionsTable = () => {
     // State to manage solutions data
    const [solutions, setSolutions] = useState([]);
    // State to manage dialog for editing solution
    const [openDialog, setOpenDialog] = useState(false);
    // State to manage selected solution for editing
    const [selectedSolution, setSelectedSolution] = useState(null);

    // State for delete confirmation dialog
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    // State to store the delete function to execute
    const [deleteFunction, setDeleteFunction] = useState(null);

    // Fetch solutions data on component mount
    useEffect(() => {
        fetchSolutions();
    }, []);

    //Functionssss
    // Function to fetch solutions data from server
    const fetchSolutions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/solution/getAll');
            setSolutions(response.data);
        } catch (error) {
            console.error('Error fetching solutions:', error);
        }
    };

    // Function to delete a solution
    const deleteSolution = (id) => {
       
        const handleDeleteConfirmation = async () => {
            try {
                await axios.delete(`http://localhost:8080/solution/solution/${id}`);
                fetchSolutions();
            } catch (error) {
                console.error('Error deleting solution:', error);
            }
        };

        // Open dialog for confirmation
        setOpenDeleteDialog(true);

        // Set the function to execute when user confirms deletion
        setDeleteFunction(() => handleDeleteConfirmation);
    };

    // Function to handle delete confirmation dialog close
    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

    // Function to confirm deletion and execute delete function
    const handleDeleteConfirmation = () => {
        if (deleteFunction) {
            deleteFunction();
            setOpenDeleteDialog(false);
        }
    };

    // Function to handle edit button click
    const handleEditClick = (solution) => {
        setSelectedSolution(solution);
        setOpenDialog(true); 
    };

    // Function to handle dialog close
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Function to handle field change in the edit solution form
    const handleFieldChange = (e) => {
        setSelectedSolution({
            ...selectedSolution,
            [e.target.name]: e.target.value
        });
    };

    // Function to handle form submission for editing solution
    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:8080/solution/update/${selectedSolution.id}`, selectedSolution);
            setOpenDialog(false);
            fetchSolutions();
        } catch (error) {
            console.error('Error updating solution:', error);
        }
    };

    return (
        <>
            <TableContainer component={Paper} style={{ marginBottom: '10px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Document Url</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Solution</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Instructor Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Date Submitted</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>issue_id</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {solutions.map((solution, index) => (
                            <TableRow key={index}>
                                <TableCell>{solution.documentUrl}</TableCell>
                                <TableCell>{solution.solution}</TableCell>
                                <TableCell>{solution.instructor}</TableCell>
                                <TableCell>{solution.date}</TableCell>
                                <TableCell>{solution.issue_id}</TableCell>
                                <TableCell>
                                    <Box display="flex">
                                        {/* Button to edit solution */}
                                        <Button variant="contained" style={{ backgroundColor: '#2CA019', color: 'white', marginRight: '8px' }} onClick={() => handleEditClick(solution)}>Update</Button>
                                        {/* Button to delete solution */}
                                        <Button variant="contained" style={{ backgroundColor: '#FF0000', color: 'white' }} onClick={() => deleteSolution(solution.id)}>Delete</Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
             {/* Edit Solution Dialog */}
             <SolutionsUpdate
                open={openDialog} 
                handleCloseDialog={handleCloseDialog} 
                selectedSolution={selectedSolution} 
                handleFieldChange={handleFieldChange} 
                handleSubmit={handleSubmit} 
            />

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Are you sure you want to delete the solution?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} style={{ backgroundColor: '#2CA019', color: 'white' }}>Cancel</Button>
                    <Button onClick={handleDeleteConfirmation} style={{ backgroundColor: '#2CA019', color: 'white' }}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SolutionsTable
