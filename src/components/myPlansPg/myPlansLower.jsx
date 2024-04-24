/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./myPlansLower.css";

const PreHarvestPlanList = ({ plans }) => {
  return (
    <div className="plan-list-container">
      <h1>Pre-Harvest Plans</h1>
      <div className="plan-list">
        {plans.map((plan) => (
          <div key={plan.fieldId} className="plan-item">
            <div className="plan-item-details-container">
              <div className="plan-item-cube">
                {plan.regNumber}
                <br />
                <strong>Reg-No</strong>
              </div>
              <div className="plan-item-cube">
                {plan.district}
                <br />
                <strong>District</strong>
              </div>
              <div className="plan-item-cube">
                {plan.city}
                <br />
                <strong>City</strong>
              </div>
              <div className="plan-item-cube">
                {plan.cropSeason}
                <br />
                <strong>Crop-Season</strong>
              </div>
              <div className="plan-item-cube">
                {plan.riceVariety} <br />
                <strong>Rice-Variety</strong>
              </div>
            </div>
            <div className="view-more-button">
              <Link to={`/pre-harvest-plan-details/${plan.fieldId}`}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#ffab00",
                    alignItems: "center",
                    "&:hover": {
                      backgroundColor: "#e39e00",
                      color: "white",
                    },
                  }}
                >
                  View More
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreHarvestPlanList;
