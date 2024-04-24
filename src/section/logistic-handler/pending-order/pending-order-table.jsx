import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPendingApproval, selectPendingApproval } from 'src/stores/slices/pendingOrderSlice';
import { getPendingOrders, rejectPendingOrder } from 'src/api/logisticHandlerApi';
import { useState } from 'react';
import { useBoolean } from 'src/hooks/use-boolean';
import { set } from 'react-hook-form';
import PendingOrderUpdateForm from './pending-order-update-form';
import PendingOrderViewBox from './pending-order-view-box';

const columns = [
    { id: 'delivery_id', label: 'Delivery Id' },
    { id: 'order_date', label: 'Date' },
    { id: 'customer_name', label: 'Name' },
    { id: 'action', label: 'Action' },
];

export default function PendingOrderTable() {

    const quickEdit = useBoolean();
    const quickEdit2 = useBoolean();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectApproved, setSelectApprove] = useState('');
    const [selectedOrder, setSelectedOrder] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDetails = (row) => {
        // Handle Details action
        quickEdit2.onTrue();
        setSelectedOrder(row);
        console.log('Details:', row);
    };

    const handleApprove = (data) => {
        // Handle approve action
        quickEdit.onTrue();
        console.log('Approved:', data);
        setSelectApprove(data);
    };

    const handleReject = (row) => {
        console.log('Rejected:', row);
        dispatch(rejectPendingOrder(row.delivery_id));
        rejectPendingOrder(row.delivery_id);
    };


    const rows = useSelector(selectPendingApproval);
    console.log(rows);
    const dispatch = useDispatch();

    const filterData = {
        "order_Status": "PENDING",
        "payment_status": "APPROVED"
    }

    useEffect(() => {
        getPendingOrders(filterData).then((data) => {
            dispatch(fetchPendingApproval(data));
            console.log('Pending Approval:', data);

        });
    }, [dispatch]);

    // Function to format date in "YYYY-MM-DD" format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
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
                                            const value = column.id === 'order_date' ? formatDate(row[column.id]) : row[column.id]; // Format date Validaion
                                            return (
                                                <TableCell key={column.id} align="left">
                                                    {column.id === 'action' ? (
                                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                            <Button onClick={() => handleDetails(row)} style={{ backgroundColor: 'blue' }} variant="contained">
                                                                <Typography variant="h6" style={{ fontSize: '12px', backgroundColo: '#07bc0c' }}>Details</Typography>
                                                            </Button>
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
            <PendingOrderUpdateForm open={quickEdit.value} onClose={quickEdit.onFalse} deliveryData={selectApproved} />
            <PendingOrderViewBox open={quickEdit2.value} onClose={quickEdit2.onFalse} selectedOrder={selectedOrder} />
        </Box>

    );
}