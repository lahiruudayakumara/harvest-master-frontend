//view inquries in instructor's dashboard
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import InquiriesAdd from '../solutions/SolutionsAdd';

const InquiriesTable = () => {
  
  const [issues, setIssues] = useState([]); // Holds the list of issues fetched from the backend
  const [selectedIssueId, setSelectedIssueId] = useState(null); // Holds the ID of the selected issue
  const [openInquiriesAddDialog, setOpenInquiriesAddDialog] = useState(false); // Controls the visibility of the InquiriesAdd dialog
  const [selectedMonth, setSelectedMonth] = useState(''); // State to hold the selected month
  const [searchObservedIssues, setSearchObservedIssues] = useState('');
  const [searchDamagedSection, setSearchDamagedSection] = useState('');
  const [searchFieldLocation, setSearchFieldLocation] = useState('');

  useEffect(() => {
    // Fetch issues from backend when the component mounts
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://localhost:8080/issue/getAll');
        setIssues(response.data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []);

  // Function to generate the PDF report
  const generateReport = () => {
    console.log('Generating report...');
    const pdf = new jsPDF();

  

    // Filter data based on selected month
    const filteredData = issues.filter(issue => issue.date.includes(selectedMonth));
  
    // Sort filtered data by date
    filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Convert filtered data to table format
    const tableData = filteredData.map((issue) => [
      issue.date,
      issue.farmerName,
      issue.fieldLocation,
      issue.damagedSection,
      issue.observedIssues,
    ]);
  
    // Add table to PDF
    pdf.autoTable({
      head: [['Date', 'Farmer Name', 'Field Location', 'Damaged Section', 'Observed Issues']],
      body: tableData,
    });
  
    // Calculate observed issue counts
    const observedIssueCounts = filteredData.reduce((counts, issue) => {
      counts[issue.observedIssues] = (counts[issue.observedIssues] || 0) + 1;
      return counts;
    }, {});
  
    // Add observed issue counts to PDF
    let y = pdf.autoTable.previous.finalY + 10;
    pdf.setFontSize(12);
    pdf.text(10, y, 'Observed Issue Counts:');
    y += 10;
  
    Object.keys(observedIssueCounts).forEach((issue, index) => {
      pdf.text(20, y + index * 10, `${issue}: ${observedIssueCounts[issue]}`);
    });
  
    // Open PDF in a new window
    pdf.output('dataurlnewwindow');
  };

  // Event handler for "Provide Solution" button click
  const handleAddSolutionClick = (issueId) => {
    setSelectedIssueId(issueId);
    setOpenInquiriesAddDialog(true);
  };

  // Event handler for closing the InquiriesAdd dialog
  const handleCloseInquiriesAddDialog = (success) => {+p
    setOpenInquiriesAddDialog(false); // Close the InquiriesAdd dialog
    if (success) {
      // Optionally, you can add further logic here after the dialog is closed
    }
  };

  // Function to filter issues based on search criteria
  const filteredIssues = issues.filter((issue) => {
    return (
      issue.observedIssues.toLowerCase().includes(searchObservedIssues.toLowerCase()) &&
      issue.damagedSection.toLowerCase().includes(searchDamagedSection.toLowerCase()) &&
      issue.fieldLocation.toLowerCase().includes(searchFieldLocation.toLowerCase())
    );
  });

  return (
    <>
      <Box mb={2}>
        {/* Search input fields */}
        <TextField
          label="Search Observed Issues"
          variant="outlined"
          size="small"
          value={searchObservedIssues}
          onChange={(e) => setSearchObservedIssues(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Search Damaged Section"
          variant="outlined"
          size="small"
          value={searchDamagedSection}
          onChange={(e) => setSearchDamagedSection(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Search Field Location"
          variant="outlined"
          size="small"
          value={searchFieldLocation}
          onChange={(e) => setSearchFieldLocation(e.target.value)}
        />
        {/* Dropdown to select month */}
        <TextField
          select
          label="Select Month"
          variant="outlined"
          size="small"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={{ marginLeft: '10px', minWidth: '150px' }} // Increased width of the TextField
        >
          {/* Options for each month */}
          <MenuItem value="1">January</MenuItem>
          <MenuItem value="2">February</MenuItem>
          <MenuItem value="3">March</MenuItem>
          <MenuItem value="4">April</MenuItem>
          <MenuItem value="5">May</MenuItem>
          <MenuItem value="6">June</MenuItem>
          <MenuItem value="7">July</MenuItem>
          <MenuItem value="8">August</MenuItem>
          <MenuItem value="9">September</MenuItem>
          <MenuItem value="10">October</MenuItem>
          <MenuItem value="11">November</MenuItem>
          <MenuItem value="12">December</MenuItem>
        </TextField>

        {/* Button to generate report */}
        <Button variant="contained" onClick={generateReport}style={{ marginLeft: '10px', backgroundColor: '#2CA019', color: 'white' }} 
>

          Generate Report
        </Button>
      </Box>

      <TableContainer component={Paper} style={{ marginBottom: '10px' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Farmer Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Field Location</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Damaged Section</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Observed Issues</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIssues.map((issue, index) => (
              <TableRow key={index}>
                <TableCell>{issue.date}</TableCell>
                <TableCell>{issue.farmerName}</TableCell>
                <TableCell>{issue.fieldLocation}</TableCell>
                <TableCell>{issue.damagedSection}</TableCell>
                <TableCell>{issue.observedIssues}</TableCell>
                <TableCell>
                    
                  {/* Button to provide a solution for the selected issue */}
                  <Box display="flex">
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: issue.status === 'accepted' ? '#cccccc' : '#2CA019',
                        color: 'white',
                        marginRight: '8px',
                        fontSize: '10px'
                      }}
                      onClick={() => handleAddSolutionClick(issue.id)}
                      disabled={issue.status === 'accepted'}
                    >
                      Provide Solution
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* InquiriesAdd dialog */}
      <InquiriesAdd
        open={openInquiriesAddDialog}
        onClose={handleCloseInquiriesAddDialog}
        issueId={selectedIssueId}
      />
    </>
  );
};

export default InquiriesTable;
