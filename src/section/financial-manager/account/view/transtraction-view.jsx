import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Transaction } from 'src/stores/slices/paymentSlice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { set, useForm } from 'react-hook-form';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import jsPDF from 'jspdf';
import imgData from '../../../../assets/images/letter-head.png'
import pdfIcon from 'src/assets/icons/pdf.svg'
import excelIcon from 'src/assets/icons/excel.svg'

const VISIBLE_FIELDS = ['transactionId', 'totalPrice', 'transactionDate', 'paymentMethod', 'status'];

const TranstractionView = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState("option1");
    const [selectedMethod, setSelectedMethod] = useState("option1");
    const [sortModel, setSortModel] = useState([
        {
            field: 'totalPrice',
            sort: 'desc',
        },
    ]);

    const transactionData = useSelector(Transaction);
    const [filteredData, setFilteredData] = useState(transactionData);

    useEffect(() => {
        // Filtering based on selected date and status
        const filteredTransactions = transactionData.filter(transaction => {
            let dateFilter = true;
            if (selectedDate) {
                const transactionDate = new Date(transaction.transactionDate);
                const selectedDateValue = selectedDate.toDate();
                dateFilter = transactionDate.toDateString() === selectedDateValue.toDateString();
            }
    
            let statusFilter = true;
            switch (selectedOption) {
                case "option2":
                    statusFilter = transaction.status === "PENDING";
                    break;
                case "option3":
                    statusFilter = transaction.status === "VERIFY";
                    break;
                case "option4":
                    statusFilter = transaction.status === "REFUND";
                    break;
                default:
                    break;
            }
    
            return dateFilter && statusFilter;
        });
    
        // Filtering based on payment method
        if (selectedMethod !== "option1") {
            const methodFilteredTransactions = filteredTransactions.filter(transaction => {
                if (selectedMethod === "option2") {
                    return transaction.paymentMethod === "SLIP";
                } else if (selectedMethod === "option3") {
                    return transaction.paymentMethod === "CARD";
                }
                return true;
            });
            setFilteredData(methodFilteredTransactions);
        } else {
            setFilteredData(filteredTransactions);
        }
    }, [selectedDate, selectedOption, selectedMethod, transactionData]);
    

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleReset = () => {
        setSelectedDate(null);
        setSelectedOption("option1");
        setSelectedMethod("option1");
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

    const generatePDF = () => {
        const doc = new jsPDF();

        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();
              
        const margin = 15;
        doc.addImage(imgData, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
        
        const tableStartY = margin + 55;
        doc.setFontSize(8);
        doc.text(`Transaction Report - ${currentDate} ${currentTime}`, margin , margin + 50);
                
        doc.autoTable({
            startY: tableStartY,
          head: [
            ['Transaction Id', 'Payment Method', 'Total Price', 'Status']
          ],
          body: filteredData.map(product => [
            product.transactionId,
            product.paymentMethod,
            product.totalPrice,
            product.status,
          ])
        });
        doc.save('product_report.pdf');
    }

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleFilterMethod = (event) => {
        setSelectedMethod(event.target.value);
    };

    return (
        <Grid sx={{ width: "100%", }}>
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
                    <FormControl sx={{ minWidth: 180, marginRight: '5px' }}>
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
                        onClick={handleReset}
                        style={{ marginTop: 2, marginRight: 2, backgroundColor: '#fff', color: '#2CA019', marginRight: '10px', borderColor: '#2CA019',  }}
                    >
                        <RestartAltIcon />
                    </Button>
                    <Button
                        color="success"
                        variant="contained"
                        onClick={downloadReport}
                        style={{ marginTop: 2, backgroundColor: '#2CA019', marginRight: '10px',}}
                    >
                        <img src={excelIcon} alt="Download" style={{ width: '20px',  minHeight: '25px' }} />
                    </Button>
                    <Button
                        color="success"
                        variant="contained"
                        onClick={generatePDF}
                        style={{ marginTop: 2, backgroundColor: '#2CA019'}}
                    >
                        <img src={pdfIcon} alt="Download" style={{ width: '20px', marginRight: '5px', minHeight: '25px' }} />
                    </Button>
                </Box>
            </Box>

            <Box sx={{ height: 500, marginTop: 2 }}>
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
