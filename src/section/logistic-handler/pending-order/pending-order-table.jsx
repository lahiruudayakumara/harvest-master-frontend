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
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'account', label: 'Account\u00a0No', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 100 },
    { id: 'amount', label: 'Amount(Rs)', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 },
];

function createData(name, account, date, amount, status) {
    return { name, account, date, amount, status };
}

const rows = [
    createData('Duvindu Nimsara', '5454 5455 4545 1234', '2024-02-19', '15,100.00'),
    createData('John Smith', '1234 5678 9012 3456', '2023-10-15', '20,500.00'),
    createData('Michael Brown', '2468 1357 8024 6793', '2024-03-10', '12,300.00'),
    createData('Sophia Garcia', '6543 2109 8765 4321', '2024-02-28', '18,900.00'),
    createData('Daniel Martinez', '1357 2468 6793 8024', '2024-03-05', '6,500.00'),
    createData('Olivia Taylor', '3210 9876 5432 1098', '2024-02-14', '15,750.00')
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