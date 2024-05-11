import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const RequestView = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch issues from backend when the component mounts
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getAll/{fieldId}');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <TableContainer component={Paper} style={{ marginBottom: '10px' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Affected Area</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Observation Date</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Observation Type</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request, index) => (
              <TableRow key={index}>
                <TableCell>{request.affected_area}</TableCell>
                <TableCell>{request.observation_date}</TableCell>
                <TableCell>{request.observation_type}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RequestView;
