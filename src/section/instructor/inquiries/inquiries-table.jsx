//view inquries in instructor's dashboard
import React, { useState, useEffect } from 'react';
import imgData from 'src/assets/images/letter-head.png'
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import InquiriesAdd from '../solutions/SolutionsAdd';

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

  const generatePDF = () => {
    console.log('Generating PDF...');
    const doc = new jsPDF();

    // Get current date and time
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const margin = 15;
    doc.addImage(imgData, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

    const tableStartY = margin + 55;

    // Set font size and add text
    doc.setFontSize(8);
    doc.text(`HARVEST MASTER Issue Report - ${currentDate} ${currentTime}`, margin, margin + 50);

    // Set table header color to light green
    doc.setFillColor(144, 238, 144); // Light green color

    doc.autoTable({
      startY: tableStartY,
      head: [
        ['Date', 'Farmer Name', 'Field Location', 'Damaged Section', 'Observed Issues']
      ],
      body: issues.map(issue => [
        issue.date,
        issue.farmerName,
        issue.fieldLocation,
        issue.damagedSection,
        issue.observedIssues
      ]),
      theme: 'grid', // Add grid lines
      headStyles: {
        fillColor: [144, 238, 144] 
      },
    });

    // Save PDF
    doc.save('issue_report.pdf');
};


  // Event handler for "Provide Solution" button click
  const handleAddSolutionClick = (issueId) => {
    setSelectedIssueId(issueId);
    setOpenInquiriesAddDialog(true);
  };

  // Event handler for closing the InquiriesAdd dialog
  const handleCloseInquiriesAddDialog = (success) => {
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

        {/* Button to generate PDF */}
        <Button 
          variant="contained" 
          onClick={generatePDF}
          style={{ marginLeft: '10px', backgroundColor: '#2CA019', color: 'white' }}
        >
          Generate PDF
        </Button>
      </Box>

      {/* Table component */}
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
                  <Button
                    variant="contained"
                    onClick={() => handleAddSolutionClick(issue.id)}
                    style={{ backgroundColor: issue.status === 'accepted' ? '#cccccc' : '#2CA019', color: 'white' }}
                    disabled={issue.status === 'accepted'}
                  >
                    Provide Solution
                  </Button>
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
