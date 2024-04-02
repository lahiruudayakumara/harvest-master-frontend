import React, { useState, useEffect } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import axios from 'axios';
import InquiriesAdd from './InquiriesAdd';

const InquiriesTable = () => {
    const [issues, setIssues] = useState([]);
    const [selectedIssueId, setSelectedIssueId] = useState(null);
    const [openInquiriesAddDialog, setOpenInquiriesAddDialog] = useState(false);

    useEffect(() => {
        // Fetch issues from backend when the component mounts
        const fetchIssues = async () => {
            try {
                const response = await axios.get('http://localhost:8080/issue/getAll');
                setIssues(response.data); // Set the fetched issues to the state
            } catch (error) {
                console.error('Error fetching issues:', error);
            }
        };

        fetchIssues(); 
    }, []); 

    const handleAddSolutionClick = (issueId) => {
        setSelectedIssueId(issueId);
        setOpenInquiriesAddDialog(true);
    };

    const handleCloseInquiriesAddDialog = (success) => {
        setOpenInquiriesAddDialog(false);
        if (success) {
            // Optionally, you can fetch the updated issues after submitting the solution
            // fetchIssues();
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
                                    <Box display="flex">
                                        <Button 
                                          variant="contained" 
                                          style={{ backgroundColor: '#2CA019', color: 'white', marginRight: '8px', fontSize: '10px' }}
                                          onClick={() => handleAddSolutionClick(issue.id)}
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
            <InquiriesAdd 
              open={openInquiriesAddDialog} 
              onClose={handleCloseInquiriesAddDialog} 
              issueId={selectedIssueId} 
            />
        </>
    );
};

export default InquiriesTable;
