import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const columns = [
    { id: 'oid', label: 'Order Id', minWidth: 170 },
    { id: 'date', label: 'Date', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'details', label: 'Details', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 },
];

function createData(oid, date, name, details, action) {
    return { oid, date, name, details, action };
}

const rows = [
    createData('O1234', '2024-02-19', 'Binuki Mihara', 'Driver name,id,vehicle number'),
    createData('O1235', '2023-10-15', 'Budathri Amaya', 'Driver name,id,vehicle number'),
    createData('O1236', '2024-03-10', 'Kavitha Amandhi', 'Driver name,id,vehicle number'),
    createData('O1237', '2024-02-28', 'Pipuni Devindi', 'Driver name,id,vehicle number'),
    createData('O1238', '2024-03-05', 'Jayani Jayaprapha', 'Driver name,id,vehicle number'),
    createData('O1239', '2024-02-14', 'Udara Vidarshi', 'Driver name,id,vehicle number')
];

export default function PendingOrderTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleApprove = (row) => {
        // Handle approve action
        console.log('Approved:', row);
    };

    const handleReject = (row) => {
        // Handle reject action
        console.log('Rejected:', row);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align="left"
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align="left">
                                                        {column.id === 'action' ?
                                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                                <Button onClick={() => handleApprove(row)} style={{ backgroundColor: '#2CA019' }} variant="contained">
                                                                    <Typography variant="h6" style={{ fontSize: '12px', backgroundColo: '#07bc0c' }}>Approve</Typography>
                                                                </Button>
                                                                <Button onClick={() => handleReject(row)} style={{ backgroundColor: 'red' }} variant="contained">
                                                                    <Typography variant="h6" style={{ fontSize: '12px' }}>Reject</Typography>
                                                                </Button>
                                                            </div> :
                                                            value
                                                        }
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>

    );
}