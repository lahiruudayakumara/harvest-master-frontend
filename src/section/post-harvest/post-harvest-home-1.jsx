import react from "react";
import "../../components/harvestPlanLandingPage/harvestPlanUpperPart.css";
import Button from "@mui/material/Button";
import postHarvestLandingTopImage from "../../assets/backgrounds/postHarvestLandingTop.jpg";
import { Link } from "react-router-dom";
import PostAddDialog from "./post-harvest-add-dialog";

const PostHarvestPlansUpperPart = () => {
  return (
    <div className="harvestPlanLandingParent">
      <div className="landingPgUpperParent">
        {/*  */}
        <div className="landingPgUppeteAbsolute">
          <div className="landingPgUpper">
            <div className="landingPgUpperImage">
              <img
                src={postHarvestLandingTopImage}
                alt="preHarvestLandingTopImage"
                height={"300px"}
              />
            </div>
            <div className="landingPgUppercontent">
              <div className="landingPgUpperText">
                <h2 className="invertedText">
                  SOW.{<span>GROW.</span>}THRIVE.
                </h2>
                <h2 className="invertedText">Providing New Opportunities</h2>
              </div>
              <div className="landingPgUpperButton">
                <div
                  className="harvestPlanButton"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {/* <Button
                    component={Link}
                    to="/postharvest"
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
                    Plan Harvest
                  </Button> */}
                  <PostAddDialog/>
                </div>
                <div
                  className="harvestPlanButton"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    component={Link}
                    to="/postharvestplans"
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

export default PostHarvestPlansUpperPart;
