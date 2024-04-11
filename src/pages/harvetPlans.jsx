import React from "react";
import { Helmet } from "react-helmet";
import HarvestPlansComp from "../components/harvestPlans/harvestPlans";

const HarvestPlans = () => {
  return (
    <>
      <Helmet>
        <title>harvets plans</title>
      </Helmet>
      <HarvestPlansComp></HarvestPlansComp>
    </>
  );
};

export default HarvestPlans;
