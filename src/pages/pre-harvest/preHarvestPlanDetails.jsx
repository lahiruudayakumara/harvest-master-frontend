import React from "react";
import { Helmet } from "react-helmet";
import PlanDetailsTopBar from "../../components/planDetailsPg/planDetailsTopBar";
import PlanDetailsMiddle from "../../components/planDetailsPg/planDetailsMiddle";
import PlanDetailsLower from "../../components/planDetailsPg/planDetailsLower";
import PlanDetailsBottom from "../../components/planDetailsPg/planDetailsBottom";

const PreHarvestPlanDetails = () => {
  return (
    <>
      <Helmet>
        <title>plan details</title>
      </Helmet>
      <PlanDetailsTopBar />
      <PlanDetailsMiddle />
      <PlanDetailsLower />
      <PlanDetailsBottom />
    </>
  );
};

export default PreHarvestPlanDetails;
