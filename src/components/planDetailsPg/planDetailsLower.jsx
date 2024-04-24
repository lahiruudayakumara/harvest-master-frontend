import { useState, useEffect } from "react";
import "./planDetailsLower.css";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import FieldVisitRequestFarmerSideForm from "../preHarvestForms/FieldVisitRequestFarmerSideForm";
import UpdateFieldVisitRequestFarmerSideForm from "../preHarvestForms/UpdatePreHarvestFarmerSideForm";
import PreHarvestCostForm from "../../components/preHarvestForms/preHarvestCostForm";
import {
  getAllFieldVisitRequestsApi,
  deleteFieldVisitRequestByIdApi,
  getAllPreHarvestCostsApi,
  deletePreHarvestCostByIdApi,
} from "../../api/preHarvestApi";
import UpdatePreHarvestCostForm from "../preHarvestForms/UpdatePreHarvestCostForm";

const PlanDetailsLower = (fieldId) => {
  const id = fieldId.fieldId;
  const [requestDetails, setRequestDetails] = useState([]);
  const [costDetails, setCostDetails] = useState([]);
  const [totalDamagedArea, setTotalDamagedArea] = useState(0);
  const [expectedYield, setExpectedYield] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalNumberOfCosts, setTotalNumberOfCosts] = useState(0);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleOpen3 = () => {
    setOpen3(true);
  };
  const handleOpen4 = () => {
    setOpen4(true);
  };
  const handleOpen5 = () => {
    setOpen5(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClose4 = () => {
    setOpen4(false);
  };
  const handleClose5 = () => {
    setOpen5(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleCancel1 = () => {
    setOpen1(false);
  };
  const handleCancel2 = () => {
    setOpen2(false);
  };
  const handleCancel3 = () => {
    setOpen3(false);
  };
  const handleCancel4 = () => {
    setOpen4(false);
  };
  const handleCancel5 = () => {
    setOpen5(false);
  };

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const requests = await getAllFieldVisitRequestsApi(id);
        setRequestDetails(requests);

        // Calculate total damaged area
        const totalArea = requests.reduce(
          (acc, curr) => acc + curr.affectedArea,
          0
        );
        setTotalDamagedArea(totalArea);

        // Calculate expected yield (assuming 17 is a constant multiplier)
        const Exyield = totalArea * 3500;
        setExpectedYield(Exyield);
      } catch (error) {
        console.error("Error fetching request details", error);
      }
    };
    fetchRequestDetails();
  }, [id]);

  const handleReqestDelete = async (reqId) => {
    try {
      await deleteFieldVisitRequestByIdApi(reqId);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting plan", error);
    }
  };

  useEffect(() => {
    const fetchCostDetails = async () => {
      try {
        const costs = await getAllPreHarvestCostsApi(id);
        setCostDetails(costs);

        // Calculate total cost
        const totalCost = costs.reduce((acc, curr) => acc + curr.amount, 0);
        setTotalCost(totalCost);

        // Calculate total number of costs
        const totalCosts = costs.length;
        setTotalNumberOfCosts(totalCosts);
      } catch (error) {
        console.error("Error fetching cost details", error);
      }
    };
    fetchCostDetails();
  }, [id]);

  const handleCostDelete = async (costId) => {
    try {
      await deletePreHarvestCostByIdApi(costId);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting cost", error);
    }
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
                onClick={handleOpen}
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
              <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogContent>
                  <FieldVisitRequestFarmerSideForm
                    onCancel={handleCancel}
                    fieldId={fieldId}
                  />
                </DialogContent>
              </Dialog>

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
                {requestDetails.map((row, index) => (
                  <TableRow
                    key={index}
                    // style={{ backgroundColor: getRowColor() }}
                  >
                    <TableCell>{row.observationType}</TableCell>
                    <TableCell>{row.observationDate}</TableCell>
                    <TableCell>{row.affectedArea + " Acres"}</TableCell>
                    <TableCell>
                      {row.fieldVisitDate === "" || row.fieldVisitDate === null
                        ? "Not Set"
                        : row.fieldVisitDate}
                    </TableCell>
                    <TableCell>
                      {row.fieldVisitTime === "" || row.fieldVisitTime === null
                        ? "Not Set"
                        : row.fieldVisitTime}
                    </TableCell>
                    <TableCell>
                      {row.fieldVisitDate === "" || row.fieldVisitDate === null
                        ? "Pending"
                        : "Accepted"}
                    </TableCell>
                    <TableCell>
                      <IconButton aria-label="edit" onClick={handleOpen1}>
                        <EditIcon sx={{ color: "green" }} />
                      </IconButton>
                      <Dialog open={open1} onClose={handleClose1} maxWidth="md">
                        <DialogContent>
                          <UpdateFieldVisitRequestFarmerSideForm
                            onCancel={handleCancel1}
                            fieldId={fieldId}
                            requestId={row.fieldObservationId}
                          />
                        </DialogContent>
                      </Dialog>
                      <IconButton aria-label="delete" onClick={handleOpen2}>
                        <DeleteIcon sx={{ color: "red" }} />
                      </IconButton>
                      <Dialog open={open2} onClose={handleClose2} maxWidth="md">
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogContent>
                          Are you sure you want to Cancel this Request?
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCancel2}>Cancel</Button>
                          <Button
                            onClick={() =>
                              handleReqestDelete(row.fieldObservationId)
                            }
                            reqId={row.fieldObservationId}
                            color="error"
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="box-container">
            <div className="box">
              <strong>{totalDamagedArea + " "}Acres</strong>
              <h4>Total Damaged Area</h4>
            </div>
            <div className="box">
              <strong>{expectedYield} kg</strong>
              <h4>Crop Damage</h4>
            </div>
          </div>
        </div>
        <div className="plan-details-lower-right-section">
          {" "}
          <div className="plan-details-lower-left-section-top">
            <h3 style={{ margin: "3.66%" }}>Pre-Harvest Expenditure</h3>
            <div className="button-container">
              <Button
                onClick={handleOpen3}
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
                Add
              </Button>
              <Dialog open={open3} onClose={handleClose3} maxWidth="md">
                <DialogContent>
                  <PreHarvestCostForm
                    onCancel={handleCancel3}
                    fieldId={fieldId}
                  />
                </DialogContent>
              </Dialog>

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
                {costDetails.map((row, index) => (
                  <TableRow
                    key={index}
                    // style={{ backgroundColor: getRowColor() }}
                  >
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>
                      <IconButton aria-label="edit" onClick={handleOpen4}>
                        <EditIcon sx={{ color: "green" }} />
                      </IconButton>
                      <Dialog open={open4} onClose={handleClose4} maxWidth="md">
                        <DialogContent>
                          <UpdatePreHarvestCostForm
                            onCancel={handleCancel4}
                            fieldId={fieldId}
                            costId={row.costId}
                          />
                        </DialogContent>
                      </Dialog>

                      <IconButton aria-label="delete" onClick={handleOpen5}>
                        <DeleteIcon sx={{ color: "red" }} />
                      </IconButton>
                      <Dialog open={open5} onClose={handleClose5} maxWidth="md">
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogContent>
                          Are you sure you want to Delete this Request?
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCancel5}>Cancel</Button>
                          <Button
                            onClick={() => handleCostDelete(row.costId)}
                            reqId={row.costId}
                            color="error"
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="box-container" style={{ marginTop: "3%" }}>
            <div className="box">
              <strong>{totalNumberOfCosts}</strong>
              <h4>Number of Costs</h4>
            </div>
            <div className="box">
              <strong>{totalCost} Rs</strong>
              <h4>Total Cost</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsLower;
