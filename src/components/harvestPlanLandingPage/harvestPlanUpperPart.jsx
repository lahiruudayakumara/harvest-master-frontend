import React, { useState } from "react";
import "./harvestPlanUpperPart.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Dialog, DialogContent } from "@mui/material";
import preHarvestLandingTopImage from "../../assets/backgrounds/preHarvestLandingTop.jpg";
import PreHarvestPlanForm from "../preHarvestForms/PreHarvestPlanForm";

const HarvestPlansUpperPart = () => {
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
    <div className="harvestPlanLandingParent">
      <div className="landingPgUpperParent">
        <div className="landingPgUppeteAbsolute">
          <div className="landingPgUpper">
            <div className="landingPgUpperImage">
              <img
                src={preHarvestLandingTopImage}
                alt="preHarvestLandingTopImage"
              />
            </div>
            <div className="landingPgUppercontent">
              <div className="landingPgUpperText">
                <h2 className="invertedText">
                  SOW.{<span>GROW.</span>}THRIVE.
                </h2>
                <h2 className="invertedText">
                  Cultivating a Sustainable Future
                </h2>
              </div>
              <div className="landingPgUpperButton">
                <div
                  className="harvestPlanButton"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#ffab00",
                      alignItems: "center",
                      "&:hover": {
                        backgroundColor: "#e39e00",
                        color: "white",
                      },
                    }}
                    onClick={handleOpen}
                  >
                    Start cultivation
                  </Button>{" "}
                  <Dialog open={open} onClose={handleClose} maxWidth="md">
                    <DialogContent>
                      <PreHarvestPlanForm onCancel={handleCancel} />
                    </DialogContent>
                  </Dialog>
                </div>
                <div
                  className="harvestPlanButton"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    component={Link}
                    to="/my-pre-harvest-plans"
                    variant="contained"
                    sx={{
                      backgroundColor: "#2CA019",
                      alignItems: "center",
                      "&:hover": {
                        backgroundColor: "#238C00",
                        color: "white",
                      },
                    }}
                    onClick={handleOpen}
                  >
                    My Plans
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarvestPlansUpperPart;
