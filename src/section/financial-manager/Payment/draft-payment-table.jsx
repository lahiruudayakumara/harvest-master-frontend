import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Typography } from '@mui/material';
import { selectDraftPayments } from 'src/stores/slices/paymentSlice';

const columns = [
    { id: 'fname', label: 'Name'},
    { id: 'accountNo', label: 'Account\u00a0No'},
    { id: 'date', label: 'Date'},
    { id: 'amount', label: 'Amount(Rs)'},
    { id: 'action', label: 'Action'},
];

export default function DraftPaymentTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const dispatch = useDispatch();

    const rows = useSelector(selectDraftPayments);

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

    // useEffect(() => {
          
    // }, [])

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
                                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, rowIndex) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align="left">
                                                    {column.id === 'action' ? (
                                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                            <Button
                                                                onClick={() => handleApprove(row)}
                                                                style={{ backgroundColor: '#2CA019' }}
                                                                variant="contained"
                                                            >
                                                                <Typography variant="h6" style={{ fontSize: '12px', backgroundColo: '#07bc0c' }}>Approve</Typography>
                                                            </Button>
                                                            <Button
                                                                onClick={() => handleReject(row)}
                                                                style={{ backgroundColor: 'red' }}
                                                                variant="contained"
                                                            >
                                                                <Typography variant="h6" style={{ fontSize: '12px' }}>Reject</Typography>
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        value
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
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