import { useState } from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const SolutionsTable = () => {
    const [solutions, setSolutions] = useState([]);

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
                                <TableCell>
                                    <Box display="flex">
                                        {/* Button to edit solution */}
                                        <Button variant="contained" style={{ backgroundColor: '#2CA019', color: 'white', marginRight: '8px' }} onClick={() => handleEditClick(solution)}>Edit</Button>
                                        {/* Button to delete solution */}
                                        <Button variant="contained" style={{ backgroundColor: '#FF0000', color: 'white' }} onClick={() => deleteSolution(solution.id)}>Delete</Button>
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

export default SolutionsTable
