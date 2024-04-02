import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import axios from 'axios';

const InquiriesTable = () => {
    const [issues, setIssues] = useState([]);

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
                                        {/* Link to add solution */}
                                        <Link to={`/AddSolution/${issue.id}`}>
                                            <Button variant="contained" style={{ backgroundColor: '#2CA019', color: 'white', marginRight: '8px', fontSize: '10px' }}>
                                                Add
                                            </Button>
                                        </Link>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default InquiriesTable;
