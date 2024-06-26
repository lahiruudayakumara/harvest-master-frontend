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
import { getPendingOrders } from 'src/api/logisticHandlerApi';
import { fetchPaymentVerify, removePaymentVerify, selectVerifyPayment } from 'src/stores/slices/pendingOrderSlice';
import { useBoolean } from 'src/hooks/use-boolean';
import OrderApproveBox from './order-approve-box';
import { approvedPayment } from 'src/api/financialManagerApi';


const columns = [
    { id: 'delivery_id', label: 'Delivery Id'},
    { id: 'order_date', label: 'Date'},
    { id: 'delivery_address', label: 'Deivery Address'},
    { id: 'action', label: 'Action'},
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
    const [selectDelivery, setSelectDelivery] = useState("")
    const rows = useSelector(selectVerifyPayment);
    const quickEdit = useBoolean();

    const pendingPayment = {
        "order_Status": "PENDING",
        "payment_status": "PENDING"
    }

    useEffect(() => {
        getPendingOrders(pendingPayment).then((data) => {
            dispatch(fetchPaymentVerify(data));
        });
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
        quickEdit.onTrue();
        setSelectDelivery(row)
        console.log('Approved:', row);
    };

    const handleReject = (row) => {
        approvedPayment(row.delivery_id, false).then((response) => {
            console.log(response)
            dispatch(removePaymentVerify(row.delivery_id));
        })
    };

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

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
                                            const value = column.id === 'order_date' ? formatDate(row[column.id]) : row[column.id];
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
            <OrderApproveBox open={quickEdit.value} onClose={quickEdit.onFalse} selectDelivery={selectDelivery} />
        </Box>
    );
}