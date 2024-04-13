import React from "react";
import { Helmet } from "react-helmet";
import HarvestPlansUpperPart from "../../components/harvestPlanLandingPage/harvestPlanUpperPart";
import HarvestPlansMiddlePart from "../../components/harvestPlanLandingPage/harvestPlanMiddlePart";
import HarvestPlansLowerPart from "../../components/harvestPlanLandingPage/harvestPlanLowerPart";

const PreHarvestPlans = () => {
  return (
    <>
      <Helmet>
        <title>pre-harvets plans</title>
      </Helmet>
      <HarvestPlansUpperPart />
      <HarvestPlansMiddlePart />
      <HarvestPlansLowerPart />
    </>
  );
};

export default PreHarvestPlans;
