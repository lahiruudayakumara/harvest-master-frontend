import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Typography } from '@mui/material';
import { fetchDraftPayment, filterPayment, selectFilteredDraftPayments } from 'src/stores/slices/paymentSlice';


const columns = [
    { id: 'name', label: 'Name'},
    { id: 'account', label: 'Account\u00a0No'},
    { id: 'date', label: 'Date'},
    { id: 'amount', label: 'Amount(Rs)'},
    { id: 'action', label: 'Action'},
];

const rows2 = [
    { name: 'Duvindu Nimsara', account: '5454 5455 4545 1234', date: '2024-02-19', amount: '15,100.00', status: 'pending' },
    { name: 'John Smith', account: '1234 5678 9012 3456', date: '2023-10-15', amount: '20,500.00', status: '' },
    { name: 'Michael Brown', account: '2468 1357 8024 6793', date: '2024-03-10', amount: '12,300.00', status: '' },
    { name: 'Sophia Garcia', account: '6543 2109 8765 4321', date: '2024-02-28', amount: '18,900.00', status: '' },
    { name: 'Daniel Martinez', account: '1357 2468 6793 8024', date: '2024-03-05', amount: '6,500.00', status: '' },
    { name: 'Olivia Taylor', account: '3210 9876 5432 1098', date: '2024-02-14', amount: '15,750.00', status: '' }
];


export default function ManageOrderTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const dispatch = useDispatch();
    const [filterData, setFilterData] = useState({
        status: 'pending',
        date: 'all',
        search: ''
    })
    const rows = useSelector(selectFilteredDraftPayments);

    useEffect(() => {
        dispatch(fetchDraftPayment(rows2));
        dispatch(filterPayment(filterData))
    }, [dispatch, filterData]);

    console.log(rows)

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