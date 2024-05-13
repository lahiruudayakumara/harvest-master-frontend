import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, TablePagination, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getSupportRequests } from '../../api/supportApi';
import PopupDialogSupport from './soluution-popup';
import SupportPdf from './support-report';
import convertToStandardDate from 'src/utilities/dateConversions';
import SupportForm from './support-desk-form';

const SupportTableView = () => {
  const [request, setRequest] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchstatus,setSearchStatus] = useState('Pending');  
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getSupportRequests().then((request) => {
      setRequest(request);
      setFilteredRequests(request);
    });
  }, []);

  useEffect(() => {
    const filtered = request.filter((req) => 
      req.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRequests(filtered);
  }, [searchTerm, request]);

  useEffect(() => {
      if(searchstatus === 'All'){
        setFilteredRequests(request);
        return;
      }
      const filteredstatus = request.filter((req) =>
        req.status.toLowerCase().includes(searchstatus.toLowerCase())
      );
      setFilteredRequests(filteredstatus);
    }, [searchstatus, request]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
      <Box mb={2}>
        <TextField
          label="Search by Topic"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select sx={{marginLeft: "10px",width:150,color:"primary"}}
        
          value={searchstatus}
          onChange={(e) => setSearchStatus(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Answered">Answered</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          
        </Select>
      </Box>

      <TableContainer
        component={Paper}
        style={{ width: "100%", marginBottom: "10px", overflowX: "auto" }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center", width: "15%" }}>
                Date
              </TableCell>
              <TableCell style={{ textAlign: "center", width: "15%" }}>
                Name
              </TableCell>
              <TableCell style={{ textAlign: "left", width: "50%" }}>
                Topic
              </TableCell>
              <TableCell style={{ textAlign: "center", width: "10%" }}>
                Status
              </TableCell>
              <TableCell style={{ textAlign: "center", width: "10%" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((req, index) => (
                <TableRow key={index}>
                  <TableCell style={{ textAlign: "center", width: "15%" }}>
                    {convertToStandardDate(req.localDate)}
                  </TableCell>
                  <TableCell style={{ textAlign: "center", width: "15%" }}>
                    {req.user_name}
                  </TableCell>
                  <TableCell style={{ textAlign: "left", width: "50%" }}>
                    {req.topic}
                  </TableCell>
                  <TableCell style={{ textAlign: "center", width: "8%" }}>
                    {req.status}
                  </TableCell>
                  <TableCell style={{ textAlign: "center", width: "12%" }}>
                    <Box display="flex" justifyContent="center" width={"30px"}>
                      <PopupDialogSupport data={req} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRequests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Box m={3}>
        <SupportPdf data={filteredRequests} />
      </Box>
    </Box>
  );
};

export default SupportTableView;
