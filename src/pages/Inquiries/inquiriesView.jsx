import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import InquiriesUpdate from "./inquiriesUpdate";

const InquiriesView = ({ issue_id }) => {
  const [issues, setIssues] = useState([]); // Holds the list of issues fetched from the backend
  const [selectedIssue, setSelectedIssue] = useState(null); // Holds the selected issue for editing
  const [openEditDialog, setOpenEditDialog] = useState(false); // Controls the visibility of the edit dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Controls the visibility of the delete confirmation dialog
  const [deleteFunction, setDeleteFunction] = useState(null); // Function to execute when confirming deletion
  const [solutions, setSolutions] = useState([]); // Holds the list of solutions fetched for a particular issue

  // State variable and function for managing solution dialog visibility
  const [openSolutionsDialog, setOpenSolutionsDialog] = useState(false);

  // State variable to hold solutions data
  const [solutionsData, setSolutionsData] = useState([]);

  // Function to fetch issues from the backend
  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await axios.get("http://localhost:8080/issue/getAll");
      setIssues(response.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  const fetchSolutionsForIssue = async (issueId) => {
    try {
      const response = await axios.get(`http://localhost:8080/solution/solutions/${issueId}`);
      setSolutionsData(response.data);
      setOpenSolutionsDialog(true);
    } catch (error) {
      console.error("Error fetching solutions:", error);
    }
  };

  const handleCloseSolutionsDialog = () => {
    setOpenSolutionsDialog(false);
  };

  return (
    <>
      <Box m={10}>
        <TableContainer
          component={Paper}
          style={{ marginBottom: "10px", marginTop: "100px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Farmer Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Field Location
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Images</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Observed Issues
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Damaged Section
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issues.map((issue, index) => (
                <TableRow key={index}>
                  <TableCell>{issue.date}</TableCell>
                  <TableCell>{issue.farmerName}</TableCell>
                  <TableCell>{issue.fieldLocation}</TableCell>
                  <TableCell>
                    {issue.imageData && (
                      <img
                        src={`data:image/png;base64,${issue.imageData}`}
                        alt="Issue Image"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                        onError={(e) =>
                          console.error("Error loading image:", e)
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell>{issue.observedIssues}</TableCell>
                  <TableCell>{issue.damagedSection}</TableCell>
                  <TableCell>
                    <Box display="flex">
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#2CA019",
                          color: "white",
                          marginRight: "8px",
                          fontSize: "10px",
                        }}
                        onClick={() => handleEditClick(issue)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#FF0000",
                          color: "white",
                          fontSize: "10px",
                        }}
                        onClick={() => handleDeleteConfirmation(issue.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#0000FF",
                          color: "white",
                          marginLeft: "8px",
                          fontSize: "10px",
                        }}
                        onClick={() => fetchSolutionsForIssue(issue.id)}
                      >
                        View Solutions
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Dialog for displaying solutions */}
      <Dialog
  open={openSolutionsDialog}
  onClose={handleCloseSolutionsDialog}
  sx={{ maxWidth: '90vw', maxHeight: '80vh' }} // Adjust width, maxWidth, and maxHeight as needed
>
  <DialogTitle>Solutions for Issue</DialogTitle>
  <DialogContent sx={{width:"500px"}}>
    <Typography variant="body1">
      <div>
        <p>{solutionsData.solution}</p>
        <p>{solutionsData.date}</p>
        <p>{solutionsData.instructor}</p>
      </div>
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseSolutionsDialog} style={{ backgroundColor: "#2CA019", color: "white" }}>
      Close
    </Button>
  </DialogActions>
</Dialog>

    </>
  );
};

export default InquiriesView;
