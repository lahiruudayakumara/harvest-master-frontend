import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import HarvestPlansTopImage from "../../assets/backgrounds/HarvestPlansTopImage.jpg";
import PreHarvestPartRight from "../../assets/harvestPlansMiddleImage/Pre-harvest.jpg";
import PostHarvestPartLeft from "../../assets/harvestPlansMiddleImage/Post-Harvest.jpg";
import "./harvestPlans.css";

const HarvestPlansComp = () => {
  return (
    <div className="harvestPlansUpperParent">
      <div className="harvestPlansUpperPart">
        <div className="harvestPlansTopImage">
          <img src={HarvestPlansTopImage} alt="Harvest Plans Top" />
        </div>
        <div className="harvetPlansTopText">
          <h1 className="invertedText">Your Harvest Management Solution</h1>
          <p className="invertedText">Efficient. Sustainable. Profitable.</p>
        </div>
      </div>
      <div className="harvestPlansLowerPart">
        <div className="Pre-Harvest-Part">
          <div className="Pre-Harvest-Part-Left">
            <h2>Pre-Harvest Plan</h2>
            <p>
              Plan for success with our pre-harvest tools. Manage planting
              schedules, resources, and tasks efficiently to optimize your
              harvest.
            </p>
            <div
              className="harvestPlanButton"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                component={Link}
                to="/pre-harvest-plans"
                variant="contained"
                sx={{
                  backgroundColor: "#ffab00",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "#e39e00",
                    color: "white",
                  },
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
          <div className="Pre-Harvest-Part-Right">
            <img src={PreHarvestPartRight} alt="Pre Harvest Part Right" />
          </div>
        </div>
        <div className="Post-Harvest-Part">
          <div className="Post-Harvest-Part-Left">
            <img src={PostHarvestPartLeft} alt="Post Harvest Part Left" />
          </div>
          <div className="Post-Harvest-Part-Right">
            <h2>Post-Harvest Plan</h2>
            <p>
              Maximize harvest yield with Harvest Master's planning methods.
              Focus on efficient planning and management for optimal results.
            </p>
            <div
              className="harvestPlanButton"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                component={Link}
                to="/post-harvest-plans"
                variant="contained"
                sx={{
                  backgroundColor: "#2CA019",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "#238C00",
                    color: "white",
                  },
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarvestPlansComp;
