/* eslint-disable react/prop-types */
import { useState } from "react";
import "./myPlansUpperPart.css";
import preHarvestPlanTopImage from "../../assets/backgrounds/preHarvestTop.jpg";
import Button from "@mui/material/Button";
import FormControls from "../preHarvestForms/controls/FormControls";

const MyPlansUpperPart = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    onSearch(value);
  };

  const handleClearClick = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="myPlansUpperPartParent">
      <div className="myPlansUpperPart">
        <div className="myPlansUpperPartImage">
          <img src={preHarvestPlanTopImage} alt="preHarvestPlanTopImage" />
        </div>
        <div className="myPlansUpperPartContent">
          <div className="myPlansUpperPartText">
            <h1 className="invertedText">
              NAVIGATE YOUR <span>CULTIVATION.</span>
            </h1>
            <h2 className="invertedText"> Find Your Plans Here.</h2>
          </div>
          <div className="myPlansUpperPartSearchBar">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 0,
                justifyContent: "center",
                padding: "10px",
                zIndex: 2,
              }}
            >
              <FormControls.InputX
                placeholder="Search Pre-Harvest Plans by District, City, Rice-Variety, or Crop-Season"
                value={query}
                onChange={handleInputChange}
                style={{ width: 550, backgroundColor: "white" }}
              />
              <Button
                variant="contained"
                onClick={handleClearClick}
                sx={{
                  "& .Button": {
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  },
                  backgroundColor: "#ffab00",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "#e39e00",
                    color: "white",
                  },
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPlansUpperPart;
