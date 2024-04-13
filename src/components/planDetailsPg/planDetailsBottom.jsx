import React from "react";
import "./planDetailsBottom.css";
import Button from "@mui/material/Button";

const PlanDetailsBottom = () => {
  return (
    <div className="plan-details-bottom-parent">
      <div className="plan-details-bottom-container">
        <div className="plan-details-bottom-title">
          <h2>INQUIRY SECTION</h2>
        </div>
        <div className="plan-details-bottom-buttons">
          <div
            className="inquryButton"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                margin: "0 15px",
                backgroundColor: "#ffab00",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#e39e00",
                  color: "white",
                },
              }}
            >
              ADD INQUIRY
            </Button>
          </div>

          <div
            className="inquryButton"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#ffab00",
                margin: "0 15px",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#e39e00",
                  color: "white",
                },
              }}
            >
              MY INQUIRIES
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsBottom;
