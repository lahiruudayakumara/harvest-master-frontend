import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getSupportRequests } from '../../api/supportApi';
import PopupDialogSupport from './soluution-popup';
import SupportPdf from './support-report';
import convertToStandardDate from 'src/utilities/dateConversions';

const SupportTableView = () => {
  const [request, setRequest] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
  const [filteredRequests, setFilteredRequests] = useState([]); // State for filtered requests

  useEffect(() => {
    getSupportRequests().then((request) => {
      setRequest(request);
      setFilteredRequests(request); // Initialize filtered data with full request data
    });
  }, []);

  useEffect(() => {
    // Filter requests based on the search term
    const filtered = request.filter((req) => 
      req.topic.toLowerCase().includes(searchTerm.toLowerCase()) // Case-insensitive search
    );
    setFilteredRequests(filtered); // Update the filtered data
  }, [searchTerm, request]); // Re-run this effect when searchTerm or request changes

  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
      <Box mb={2}>
        <TextField
          label="Search by Topic"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm when the input changes
        />
      </Box>

      <TableContainer
        component={Paper}
        style={{ width: '100%', marginBottom: '10px', overflowX: 'auto' }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: 'center', width: '20%' }}>Date</TableCell>
              <TableCell style={{ textAlign: 'center', width: '20%' }}>Name</TableCell>
              <TableCell style={{ textAlign: 'center', width: '20%' }}>Topic</TableCell>
              <TableCell style={{ textAlign: 'center', width: '20%' }}>Status</TableCell>
              <TableCell style={{ textAlign: 'center', width: '20%' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map((req, index) => (
              <TableRow key={index}>
                <TableCell style={{ textAlign: 'center', width: '20%' }}>{convertToStandardDate(req.localDate)}</TableCell>
                <TableCell style={{ textAlign: 'center', width: '20%' }}>{req.user_name}</TableCell>
                <TableCell style={{ textAlign: 'center', width: '20%' }}>{req.topic}</TableCell>
                <TableCell style={{ textAlign: 'center', width: '20%' }}>{req.status}</TableCell>
                <TableCell style={{ textAlign: 'center', width: '20%' }}>
                  <Box display="flex" justifyContent="center">
                    <PopupDialogSupport data={req} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box m={3}>
          <SupportPdf data={filteredRequests} /> {/* Pass the filtered data to SupportPdf */}
        </Box>
      </TableContainer>

 
    </Box>
  );
};

export default SupportTableView;
