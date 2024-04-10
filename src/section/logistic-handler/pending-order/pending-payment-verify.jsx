import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentVerify, selectVerifyPayment } from 'src/stores/slices/pendingOrderSlice';
import { getPendingOrders } from 'src/api/logisticHandlerApi';
import { useEffect } from 'react';

const columns = [
    { id: 'id', label: 'Order Id', minWidth: 170 },
    { id: 'date', label: 'Place Order Date', minWidth: 100 },

];

// const rows = [
//     { id: 'O1234 ', date: '2024-02-19' },
//     { id: 'O1235', date: '2023-10-15' },
//     { id: 'O1236', date: '2024-03-10' },
//     { id: 'O1237', date: '2024-02-28' },
//     { id: 'O1238', date: '2024-03-05' },
//     { id: 'O1239', date: '2024-02-14' },
// ];

export default function PendingPaymentVerifyTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const rows = useSelector(selectVerifyPayment);
    console.log(rows);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const dispatch = useDispatch();

    const filterData = {
        "order_Status": "PENDING",
        "payment_status": "PENDING"
    }

    useEffect(() => {
        getPendingOrders(filterData).then((data) => {
            dispatch(fetchPaymentVerify(data));
        });
    }, []);

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
                                        align={column.align}
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
                                .map((row, rowIndex) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
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