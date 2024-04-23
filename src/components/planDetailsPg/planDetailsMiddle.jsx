/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./planDetailsMiddle.css";
import DateCalendarValueX from "./Calender";
import {
  Button,
  Box,
  DialogContent,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import preHarvestimg from "../../assets/harvestPlansMiddleImage/Pre-harvest.jpg";
import UpdatePreHarvestPlanForm from "../preHarvestForms/UpdatePreHarvestPlanForm,";
import { deletePreHarvestPlanApi } from "../../api/preHarvestApi";
import { DeletePopUp } from "../Util/deletePopUp";

const PlanDetailsMiddle = ({ planDetails }) => {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    try {
      await deletePreHarvestPlanApi(planDetails.fieldId);
      window.location.reload(); // Refresh the page after deletion
    } catch (error) {
      console.error("Error deleting plan", error);
    }
  };

  return (
    <div className="plan-details-middle-parent">
      <div className="plan-details-middle-container">
        <div className="plan-details-middle-left-section">
          <img
            className="preHarvestDetailsDecoImg"
            src={preHarvestimg}
            alt="Pre-harvest"
          />
          <h2 style={{ margin: "4%", marginLeft: "3%" }}>
            Generel Information :
          </h2>
          <div className="general-info">
            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>Registration Number</strong>
                  </td>
                  <td>{planDetails.regNumber}</td>
                </tr>
                <tr>
                  <td>
                    <strong>District</strong>
                  </td>
                  <td>{planDetails.district}</td>
                </tr>
                <tr>
                  <td>
                    <strong>City</strong>
                  </td>
                  <td>{planDetails.city}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Field Area (Acres)</strong>
                  </td>
                  <td>{planDetails.fieldArea}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Rice Variety:</strong>
                  </td>
                  <td>{planDetails.riceVariety}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Seeds Amount (kg)</strong>
                  </td>
                  <td>{planDetails.seedsAmount}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Planting Method</strong>
                  </td>
                  <td>{planDetails.plantingMethod}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Initial Expected Yield (kg)</strong>
                  </td>
                  <td>{planDetails.initialExpectedYield}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Crop Season:</strong>
                  </td>
                  <td>
                    {planDetails.cropSeason === null
                      ? "Not Planted Yet"
                      : planDetails.cropSeason}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Planting Date:</strong>
                  </td>
                  <td>
                    {planDetails.plantingDate === null
                      ? "Not Planted Yet"
                      : planDetails.plantingDate}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Harvest Time:</strong>
                  </td>
                  <td>{planDetails.harvestTime}</td>
                </tr>
              </tbody>
            </table>
            <Box mt={2} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenUpdateDialog}
              >
                Update Plan
              </Button>
              <Dialog
                open={openUpdateDialog}
                onClose={handleCloseUpdateDialog}
                maxWidth="md"
              >
                <DialogContent>
                  {planDetails ? (
                    <UpdatePreHarvestPlanForm
                      data={planDetails}
                      onCancel={handleCloseUpdateDialog}
                      fieldId={planDetails.fieldId}
                    />
                  ) : (
                    "loading"
                  )}
                </DialogContent>
              </Dialog>
              <Button
                variant="contained"
                color="error"
                onClick={handleOpenDeleteDialog}
              >
                Remove Plan
              </Button>
              <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                maxWidth="md"
              >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                  Are you sure you want to delete this plan?
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                  <Button onClick={handleDelete} color="error">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </div>
        </div>
        <div className="plan-details-middle-mid-section"></div>
        <div className="plan-details-middle-right-section">
          <DateCalendarValueX />
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsMiddle;
