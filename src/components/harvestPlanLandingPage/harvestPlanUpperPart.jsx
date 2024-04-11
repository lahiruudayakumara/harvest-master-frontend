import react from "react";
import "./harvestPlanUpperPart.css";
import Button from "@mui/material/Button";
import preHarvestLandingTopImage from "../../assets/backgrounds/preHarvestLandingTop.jpg";

const HarvestPlansUpperPart = () => {
  return (
    <div className="harvestPlanLandingParent">
      <div className="landingPgUpperParent">
        {/*  */}
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
                  >
                    Start cultivation
                  </Button>
                </div>
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
                    My Plans
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default HarvestPlansUpperPart;
