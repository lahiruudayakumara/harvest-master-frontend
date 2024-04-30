import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Transaction } from 'src/stores/slices/paymentSlice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useForm } from 'react-hook-form';

const VISIBLE_FIELDS = ['transactionId', 'totalPrice', 'transactionDate', 'paymentMethod', 'status'];

const TranstractionView = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [sortModel, setSortModel] = useState([
        {
            field: 'totalPrice',
            sort: 'desc',
        },
    ]);

    const transactionData = useSelector(Transaction);
    const [filteredData, setFilteredData] = useState(transactionData);

    useEffect(() => {
        if (!selectedDate) {
            setFilteredData(transactionData);
            return;
        }

        const filteredTransactions = transactionData.filter(transaction => {
            const transactionDate = new Date(transaction.transactionDate); // Assuming transactionDate is a string representing the date
            const selectedDateValue = selectedDate.toDate();
            return transactionDate.toDateString() === selectedDateValue.toDateString();
        });

        setFilteredData(filteredTransactions);
    }, [selectedDate, transactionData]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleReset = () => {
        setSelectedDate(null);
        setFilteredData(transactionData);
    };

    const downloadReport = () => {
        const excelData = filteredData.map(
            ({ transactionId, paymentMethod, totalPrice, status }) => ({
                "transaction Id": transactionId,
                "paymentMethod": paymentMethod,
                "totalPrice": totalPrice,
                "status": status,
            })
        );

        const columnHeaders = Object.keys(excelData[0]);
        const csvContent =
            "data:text/csv;charset=utf-8," +
            [columnHeaders.join(",")].concat(excelData.map((data) => Object.values(data).join(","))).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "product_report.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <Grid sx={{ width: "100%" }}>
            <Box display="flex" sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex' }}>
                    {/* <Typography>Search Date : {selectedDate == null ? '' : selectedDate.format('YYYY-MM-DD')} </Typography> */}
                    <Box sx={{ marginRight: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                onChange={handleDateChange}
                                value={selectedDate}
                                renderInput="date"
                            />
                        </LocalizationProvider>
                    </Box>
                    <FormControl sx={{ minWidth: 180 }}>
                        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                        // value={selectedOption}
                        // onChange={handleChange}
                        >
                            <MenuItem value="option1">ALL</MenuItem>
                            <MenuItem value="option2">PENDING</MenuItem>
                            <MenuItem value="option3">VERIFY</MenuItem>
                            <MenuItem value="option3">REFUND</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={handleReset}
                        style={{ marginTop: 2, marginRight: 2 }}
                    >
                        Reset Date
                    </Button>
                    <Button
                        color="success"
                        variant="contained"
                        onClick={downloadReport}
                        style={{ marginTop: 2 }}
                    >
                        Download Report
                    </Button>
                </Box>
            </Box>

            <Box sx={{ height: 400, marginTop: 2 }}>
                <DataGrid
                    rows={filteredData}
                    columns={VISIBLE_FIELDS.map(field => ({
                        field,
                        headerName: field.charAt(0).toUpperCase() + field.slice(1),
                        flex: 1,
                    }))}
                    sortingOrder={['asc', 'desc', null]} // Set the sorting order
                    sortModel={sortModel}
                    onSortModelChange={(newModel) => setSortModel(newModel)}
                    getRowId={(row) => row.transactionId} // Specify the unique identifier for each row
                />
            </Box>
        </Grid>
    );
};

export default TranstractionView;
