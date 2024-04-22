/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./planDetailsMiddle.css";
import DateCalendarValueX from "./Calender";
import { Button, Box, DialogContent, Dialog } from "@mui/material";
import preHarvestimg from "../../assets/harvestPlansMiddleImage/Pre-harvest.jpg";
import UpdatePreHarvestPlanForm from "../preHarvestForms/UpdatePreHarvestPlanForm,";

const PlanDetailsMiddle = ({ planDetails }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
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
                onClick={handleOpen}
                sx={{
                  marginRight: 2,
                  backgroundColor: "#2CA019",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "#238C00",
                    color: "white",
                  },
                }}
              >
                Update Plan
              </Button>
              <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogContent>
                  {planDetails ? (
                    <UpdatePreHarvestPlanForm
                      data={planDetails}
                      onCancel={handleCancel}
                      fieldId={planDetails.fieldId}
                    />
                  ) : (
                    "loading"
                  )}
                </DialogContent>
              </Dialog>
              <Button variant="contained" color="error" onClick={""}>
                Remove Plan
              </Button>
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
