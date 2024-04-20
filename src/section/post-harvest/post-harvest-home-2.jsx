import React from "react";
import labTest from "../../assets/harvestPlanLandigPgBoxImages/labTest.jpg";
import expert from "../../assets/harvestPlanLandigPgBoxImages/expert.jpg";
import weather from "../../assets/harvestPlanLandigPgBoxImages/weather.jpg";
import blackBox from "../../assets/harvestPlanLandigPgBoxImages/blackBox.png";
import Button from "@mui/material/Button";
import "../../components/harvestPlanLandingPage/harvestPlanUpperPart.css";

const PostHarvestPlanMiddlePart = () => {
  return (
    <div className="landingPgUpperLowerBoxDivParent">
      <div className="landingPgUpperLowerBoxDiv">
        <div className="landingPgUpperLowerBox">
          <img className="image" src={labTest} alt="labTest" />
          <img className="blackBox" src={blackBox} alt="blackBox" />
          <div className="InnerContent">
            <h1>Request Lab Tests</h1>
            <p>
              Connect with trusted partners for agricultural tests like soil,
              water, and fertilizer analysis. Our platform simplifies the
              process by redirecting you.
            </p>
            <div
              className="harvestPlanButton"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
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
                TRY IT!
              </Button>
            </div>
          </div>
        </div>
        <div className="landingPgUpperLowerBox">
          <img className="image" src={expert} alt="expert" />
          <img className="blackBox" src={blackBox} alt="blackBox" />
          <div className="InnerContent">
            <h1>Contact With Experts</h1>
            <p>
              Need advice on pesticides or disease management? Connect with our
              agricultural experts for personalized guidance and tailored
              solutions.
            </p>
            <div
              className="harvestPlanButton"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
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
                TRY IT!
              </Button>
            </div>
          </div>
        </div>
        <div className="landingPgUpperLowerBox">
          <img className="image" src={weather} alt="weather" />
          <img className="blackBox" src={blackBox} alt="blackBox" />
          <div className="InnerContent">
            <h1>Get Rain Forecast</h1>
            <p>
              Stay ahead of the weather with our rain forecast feature. Receive
              timely updates and confidently plan your agricultural activities
              and schedules.
            </p>
            <div
              className="harvestPlanButton"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
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
                TRY IT!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostHarvestPlanMiddlePart;
