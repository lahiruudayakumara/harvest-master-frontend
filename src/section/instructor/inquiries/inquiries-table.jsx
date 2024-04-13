//view inquries in instructor's dashboard
import React, { useState, useEffect } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import axios from 'axios';
import InquiriesAdd from '../solutions/SolutionsAdd';

const InquiriesTable = () => {
    const [issues, setIssues] = useState([]); // Holds the list of issues fetched from the backend
    const [selectedIssueId, setSelectedIssueId] = useState(null); // Holds the ID of the selected issue
    const [openInquiriesAddDialog, setOpenInquiriesAddDialog] = useState(false); // Controls the visibility of the InquiriesAdd dialog

    useEffect(() => {
        // Fetch issues from backend when the component mounts
        const fetchIssues = async () => {
            try {
                const response = await axios.get('http://localhost:8080/issue/getAll');
                setIssues(response.data);
            } catch (error) {
                console.error('Error fetching issues:', error);
            }
        };

        fetchIssues();
    }, []);

    // Event handler for "Provide Solution" button click
    const handleAddSolutionClick = (issueId) => {
        setSelectedIssueId(issueId);
        setOpenInquiriesAddDialog(true);
    };

    // Event handler for closing the InquiriesAdd dialog
    const handleCloseInquiriesAddDialog = (success) => {
        setOpenInquiriesAddDialog(false); // Close the InquiriesAdd dialog
        if (success) {

        }
    };

    return (
        <>

            <TableContainer component={Paper} style={{ marginBottom: '10px' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Farmer Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Field Location</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Damaged Section</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {issues.map((issue, index) => (
                            <TableRow key={index}>
                                <TableCell>{issue.date}</TableCell>
                                <TableCell>{issue.farmerName}</TableCell>
                                <TableCell>{issue.fieldLocation}</TableCell>
                                <TableCell>{issue.damagedSection}</TableCell>
                                <TableCell>
                                    {/* Button to provide a solution for the selected issue */}
                                    <Box display="flex">
                                        <Button
                                            variant="contained"
                                            style={{
                                                backgroundColor: issue.status === 'accepted' ? '#cccccc' : '#2CA019',
                                                color: 'white',
                                                marginRight: '8px',
                                                fontSize: '10px'
                                            }}
                                            onClick={() => handleAddSolutionClick(issue.id)}
                                            disabled={issue.status === 'accepted'}
                                        >
                                            Provide Solution
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* InquiriesAdd dialog */}
            <InquiriesAdd
                open={openInquiriesAddDialog}
                onClose={handleCloseInquiriesAddDialog}
                issueId={selectedIssueId}
            />
        </>
    );
};

export default InquiriesTable;
