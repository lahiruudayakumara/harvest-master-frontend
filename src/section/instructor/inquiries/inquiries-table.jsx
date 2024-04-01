import { useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const InquiriesTable = () => {
    const [pendingIssues, setPendingIssues] = useState([]);

    return (
        <>
            <TableContainer component={Paper} style={{ marginBottom: '10px' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Farmer Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Field Location</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Images</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Observed Issues</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingIssues.map((issue, index) => (
                            <TableRow key={index}>
                                <TableCell>{issue.date}</TableCell>
                                <TableCell>{issue.farmerName}</TableCell>
                                <TableCell>{issue.fieldLocation}</TableCell>
                                <TableCell>
                                    <img src={issue.imageData} alt="Image" style={{ maxWidth: '50px', maxHeight: '50px' }} />
                                </TableCell>
                                <TableCell>{issue.observedIssues}</TableCell>
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
    )

}

export default InquiriesTable