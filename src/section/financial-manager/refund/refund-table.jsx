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
import { fetchRefunds, selectRefunds } from 'src/stores/slices/paymentSlice';
import { pendingRefund, approvedPayment } from 'src/api/financialManagerApi';
import { useBoolean } from 'src/hooks/use-boolean';


const columns = [
    { id: 'date', label: 'Date' },
    { id: 'bankName', label: 'Bank Name' },
    { id: 'accountNo', label: 'Account No' },
    { id: 'amount', label: 'Amount' },
    { id: 'status', label: 'Status' },
    // { id: 'action', label: 'Action' },
];

export default function RefundViewTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const dispatch = useDispatch();
    const [selectRefund, setSelectRefund] = useState("");
    const rows = useSelector(selectRefunds);
    const quickEdit = useBoolean();

    console.log(rows);

    const value = { status: 'PENDING' };

    useEffect(() => {
        pendingRefund(value).then((response) => {
            dispatch(fetchRefunds(response.data));
        });
    }, [dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleApprove = (row) => {
        quickEdit.onTrue();
        setSelectRefund(row);
        console.log('Approved:', row);
    };

    const handleReject = (row) => {
        approvedPayment(row.delivery_id, false).then((response) => {
            console.log(response);
            dispatch(removePaymentVerify(row.delivery_id));
        });
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
                            {rows.map((row, rowIndex) => (
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
