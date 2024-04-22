import React, { useState, useEffect } from "react";
import "./planDetailsLower.css";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Download } from "@mui/icons-material";
const PlanDetailsLower = (fieldId) => {
  const data = [
    {
      column1: "Snail Attack",
      column2: "2024/04/30",
      column3: "0.5 Acres",
      column4: "not set",
      column5: "not set",
      column6: "Pending",
    },

    // Add more dummy values as needed
  ];
  const getRowColor = (index) => {
    return index % 2 === 0
      ? "hsla(60, 80%, 90%, 0.3)"
      : "hsla(120, 80%, 90%, 0.3)";
  };
  return (
    <div className="plan-details-lower-parent">
      <div className="plan-details-lower-container">
        <div className="plan-details-lower-left-section">
          <div className="plan-details-lower-left-section-top">
            <h3>FIELD VISIT REQUESTS</h3>
            <div className="button-container">
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#2ca019",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  "&:hover": {
                    borderColor: "darkgreen",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    backgroundColor: "transparent",
                    color: "darkgreen",
                  },
                  "& .MuiButton-startIcon": {
                    fontSize: "1.5rem",
                    marginRight: "4px",
                  },
                  "& .MuiButton-label": {
                    fontSize: "1rem",
                  },
                  color: "#2ca019",
                }}
              >
                <AddIcon sx={{ color: "#2ca019" }} />
                Create
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: "#2ca019",
                  borderColor: "#2ca019",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  "&:hover": {
                    borderColor: "darkgreen",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    backgroundColor: "transparent",
                    color: "darkgreen",
                  },
                  "& .MuiButton-startIcon": {
                    fontSize: "1.5rem",
                    marginRight: "4px",
                    color: "#2ca019",
                  },
                  "& .MuiButton-label": {
                    fontSize: "1rem",
                    color: "#2ca019",
                  },
                }}
              >
                <Download sx={{ color: "#2ca019" }} /> DOWNLOAD
              </Button>
            </div>
          </div>
          <div
            className="table-container"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Observation</TableCell>
                  <TableCell>Observed Date</TableCell>
                  <TableCell>Affected Area</TableCell>
                  <TableCell>Visiting Date</TableCell>
                  <TableCell>Visiting Time</TableCell>
                  <TableCell>Request Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow
                    key={index}
                    // style={{ backgroundColor: getRowColor() }}
                  >
                    <TableCell>{row.column1}</TableCell>
                    <TableCell>{row.column2}</TableCell>
                    <TableCell>{row.column3}</TableCell>
                    <TableCell>{row.column4}</TableCell>
                    <TableCell>{row.column5}</TableCell>
                    <TableCell>{row.column6}</TableCell>
                    <TableCell>
                      <IconButton aria-label="edit">
                        <EditIcon sx={{ color: "green" }} />
                      </IconButton>
                      <IconButton aria-label="delete">
                        <DeleteIcon sx={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="box-container">
            <div className="box">
              <strong>5 Acres</strong>
              <h4>Total Damaged Area</h4>
            </div>
            <div className="box">
              <strong>1000 kg</strong>
              <h4>Expected Yield</h4>
            </div>
          </div>
        </div>
        <div className="plan-details-lower-right-section">
          {" "}
          <div className="plan-details-lower-left-section-top">
            <h3 style={{ margin: "3.66%" }}>Pre-Harvest Expenditure</h3>
            <div className="button-container">
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#2ca019",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  "&:hover": {
                    borderColor: "darkgreen",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    backgroundColor: "transparent",
                    color: "darkgreen",
                  },
                  "& .MuiButton-startIcon": {
                    fontSize: "1.5rem",
                    marginRight: "4px",
                  },
                  "& .MuiButton-label": {
                    fontSize: "1rem",
                  },
                  color: "#2ca019",
                }}
              >
                <AddIcon sx={{ color: "#2ca019" }} />
                Create
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: "#2ca019",
                  borderColor: "#2ca019",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  "&:hover": {
                    borderColor: "darkgreen",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    backgroundColor: "transparent",
                    color: "darkgreen",
                  },
                  "& .MuiButton-startIcon": {
                    fontSize: "1.5rem",
                    marginRight: "4px",
                    color: "#2ca019",
                  },
                  "& .MuiButton-label": {
                    fontSize: "1rem",
                    color: "#2ca019",
                  },
                }}
              >
                <Download sx={{ color: "#2ca019" }} /> DOWNLOAD
              </Button>
            </div>
          </div>
          <div
            className="table-container"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Cost</TableCell>
                  <TableCell>Amount(Rs.)</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow
                    key={index}
                    // style={{ backgroundColor: getRowColor() }}
                  >
                    <TableCell>{row.column1}</TableCell>
                    <TableCell>{row.column2}</TableCell>
                    <TableCell>{row.column3}</TableCell>
                    <TableCell>
                      <IconButton aria-label="edit">
                        <EditIcon sx={{ color: "green" }} />
                      </IconButton>
                      <IconButton aria-label="delete">
                        <DeleteIcon sx={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="box-container" style={{ marginTop: "3%" }}>
            <div className="box">
              <strong>3</strong>
              <h4>Number of Costs</h4>
            </div>
            <div className="box">
              <strong>20000.00 Rs</strong>
              <h4>Total Cost</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsLower;
