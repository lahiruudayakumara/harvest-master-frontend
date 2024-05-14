import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLogActivity } from 'src/api/logisticHandlerApi';
import { fetchLogActivity, selectLogActivity } from 'src/stores/slices/pendingOrderSlice';

const columns = [
    { id: 'date', label: 'Date' },
    { id: 'time', label: 'Time' },
    { id: 'cart_id', label: 'Cart ID' },
    { id: 'detail', label: 'Details' },
];


// function createData(date, time, details) {
//     return { date, time, details };
// }

// const rows = [
//     createData('2024-02-19', '10:00 AM', 'Delivered to the customer'),
//     createData('2023-10-15', '11:00 AM', 'Picked up from the warehouse'),
//     createData('2024-03-10', '12:00 PM', 'Delivered to the customer'),
//     createData('2024-02-28', '01:00 PM', 'Picked up from the warehouse'),
//     createData('2024-03-05', '02:00 PM', 'Delivered to the customer'),
//     createData('2024-02-14', '03:00 PM', 'Picked up from the warehouse')
// ];

export default function LogActivityTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
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

    const rows = useSelector(selectLogActivity);

    return (
        <Grid sx={{ width: "100%" }}>
            <Box display="flex" sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex' }}>
                    {/* <Typography>Search Date : {selectedDate == null ? '' : selectedDate.format('YYYY-MM-DD')} </Typography> */}
                    <Box sx={{ marginRight: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                // onChange={handleDateChange}
                                // value={selectedDate}
                                renderInput="date"
                            />
                        </LocalizationProvider>
                    </Box>
                    <FormControl sx={{ minWidth: 180 }}>
                        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedOption}
                            onChange={handleChange}
                        >
                            <MenuItem value="option1">ALL</MenuItem>
                            <MenuItem value="option2">PENDING</MenuItem>
                            <MenuItem value="option3">VERIFY</MenuItem>
                            <MenuItem value="option4">REFUND</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 180 }}>
                        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedMethod}
                            onChange={handleFilterMethod}
                        >
                            <MenuItem value="option1">ALL</MenuItem>
                            <MenuItem value="option2">SLIP</MenuItem>
                            <MenuItem value="option3">CARD</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        // onClick={handleReset}
                        style={{ marginTop: 2, marginRight: 2, backgroundColor: '#fff', color: '#2CA019', borderColor: '#2CA019' }}
                    >
                        <RestartAltIcon />
                    </Button>
                    <Button
                        color="success"
                        variant="contained"
                        // onClick={downloadReport}
                        style={{ marginTop: 2, backgroundColor: '#2CA019' }}
                    >
                        <img src={excelIcon} alt="Download" style={{ width: '20px', marginRight: '5px' }} />
                    </Button>
                    <Button
                        color="success"
                        variant="contained"
                        // onClick={generatePDF}
                        style={{ marginTop: 2, backgroundColor: '#2CA019' }}
                    >
                        <img src={pdfIcon} alt="Download" style={{ width: '20px', marginRight: '5px' }} />
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
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
        </Grid>
    );
}