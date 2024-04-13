import React from "react";
import "./harvestPlanLowerPart.css";
import Button from "@mui/material/Button";
import agriTechPhoto from "../../assets/harvestPlanLandigPgBoxImages/AgriTech.jpg";

const HarvestPlanLowerPart = () => {
  return (
    <div className="lowerPartParent">
      <div className="lowerPartImage">
        <img src={agriTechPhoto} alt="agriTechPhoto" />
      </div>
      <div className="lowerPartContentParent">
        <div className="lowerPartContent">
          <h2>Modern Agricultural Tech</h2>
          <h3>Sustainable Farming Solutions</h3>
          <hr />
          <p>
            Step into the future of farming where cutting-edge technology drives
            efficiency and sustainability. Explore how AI, robotics, and data
            analytics are revolutionizing agriculture, making operations
            smarter, more sustainable, and vastly more productive. Discover the
            myriad ways in which these innovations are reshaping the
            agricultural landscape, from precision farming to automated
            harvesting. Click 'Learn More' to delve into the exciting and
            rapidly evolving world of modern agricultural technology.
          </p>
          <div
            className="harvestPlanButton"
            style={{ display: "flex", justifyContent: "left" }}
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
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarvestPlanLowerPart;
