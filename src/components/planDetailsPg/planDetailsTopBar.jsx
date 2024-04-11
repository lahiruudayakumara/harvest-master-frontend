import React from "react";
import "./planDetailsTopBar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

const PlanDetailsTopBar = () => {
  return (
    <div className="plan-details-top-bar-parent">
      <div className="plan-details-top-bar">
        <div
          classname="hamburgur-menu"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "left",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            style={{
              marginLeft: "10px",
            }}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <div className="plan-details-top-bar-title">
          <p>Pre-Harvest Management</p>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsTopBar;
