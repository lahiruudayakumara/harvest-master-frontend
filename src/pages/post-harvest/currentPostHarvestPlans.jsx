import React from 'react'
import { Helmet } from 'react-helmet'
import { PostPlanView } from '../../section/post-harvest/post-harvest-plans-view';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../../components/myPlansPg/myPlansLower.css";


export const CurrentPostHarvestPlans = ({plans}) => {
  return (
    <>
      <div className="plan-list-container">
        <h1>Available Post Harvest Plan</h1>
        <div className="plan-list">
          {plans.map((plan) => (
            <div key={plan.fieldId} className="plan-item">
              <div className="plan-item-details-container">
                <div className="plan-item-cube">
                  {plan.fieldName}
                  <br />
                  <strong>Field Name</strong>
                </div>
                <div className="plan-item-cube">
                  {plan.district}
                  <br />
                  <strong>District</strong>
                </div>
                <div className="plan-item-cube">
                  {plan.location}
                  <br />
                  <strong>City</strong>
                </div>
                <div className="plan-item-cube">
                  {plan.area}
                  <br />
                  <strong>Acres</strong>
                </div>
                <div className="plan-item-cube">
                  {plan.paddyVareity} <br />
                  <strong>Rice-Variety</strong>
                </div>
              </div>
              <div className="view-more-button">
                <Link to={`/postharvestdetail/${plan.fieldId}`}>
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
    </>
  );
}
