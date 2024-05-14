import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLogActivity } from 'src/api/logisticHandlerApi';
import { fetchLogActivity, selectLogActivity } from 'src/stores/slices/pendingOrderSlice';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import pdfIcon from 'src/assets/icons/pdf.svg';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import autoTable plugin
import imgData from 'src/assets/images/letter-head.png';
import { green } from '@mui/material/colors';

const columns = [
    { id: 'date', label: 'Date' },
    { id: 'time', label: 'Time' },
    { id: 'cart_id', label: 'Cart ID' },
    { id: 'detail', label: 'Details' },
];

export default function LogActivityTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedDate, setSelectedDate] = useState(null);
    const dispatch = useDispatch();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        getLogActivity().then((data) => {
            dispatch(fetchLogActivity(data));
        });
    }, [dispatch]);

    const logActivity = useSelector(selectLogActivity);
    const [filteredData, setFilteredData] = useState(logActivity);

    useEffect(() => {
        // Filtering based on selected date
        if (selectedDate) {
            const filteredTransactions = logActivity.filter(transaction => {
                const transactionDate = new Date(transaction.date); // Assuming 'date' is the property name
                return transactionDate.toDateString() === selectedDate.toDate().toDateString();
            });
            setFilteredData(filteredTransactions);
        } else {
            setFilteredData(logActivity);
        }
    }, [selectedDate, logActivity]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleReset = () => {
        setSelectedDate(null);
    };

    const generatePDF = () => {
        const doc = new jsPDF();

        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();

        const margin = 15;
        doc.addImage(imgData, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

        const tableStartY = margin + 55;

        doc.setFontSize(8);
        doc.text(`Log Activity Report - ${currentDate} ${currentTime}`, margin, margin + 50);

        doc.autoTable({
            startY: tableStartY,
            head: [
                ['Date', 'Time', 'Cart Id', 'Details']
            ],
            body: filteredData.map(activity => [
                activity.date,
                activity.time,
                activity.cart_id,
                activity.detail,
            ]),
            theme: 'grid', // Add grid lines
            headStyles: {
                fillColor: green[800]
            },
        });

        doc.save('logistic_handler_log_activity_report.pdf');
    }

    return (
        <Grid sx={{ width: "100%" }}>
            <Box display="flex" sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ marginRight: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                onChange={handleDateChange}
                                value={selectedDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        onClick={handleReset}
                        style={{ marginTop: 2, marginRight: 2, backgroundColor: '#fff', color: '#2CA019', marginRight: '10px', borderColor: '#2CA019' }}
                    >
                        <RestartAltIcon />
                    </Button>
                    <Button
                        color="success"
                        variant="contained"
                        onClick={generatePDF}
                        style={{ marginTop: 2, backgroundColor: '#2CA019' }}
                    >
                        <img src={pdfIcon} alt="Download" style={{ width: '20px', marginRight: '5px', minHeight: '25px' }} />
                    </Button>
                </Box>
            </Box>

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
                                {filteredData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {value}
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
                        count={filteredData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </Grid>
    );
}
