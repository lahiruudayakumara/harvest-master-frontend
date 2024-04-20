import React from "react";
import { Helmet } from "react-helmet";

import HarvestPlansMiddlePart from "../../components/harvestPlanLandingPage/harvestPlanMiddlePart";
import HarvestPlansLowerPart from "../../components/harvestPlanLandingPage/harvestPlanLowerPart";
import PostHarvestPlansUpperPart from "src/section/post-harvest/post-harvest-home-1";
import PostHarvestPlanMiddlePart from "src/section/post-harvest/post-harvest-home-2";
import PostHarvestPlanLowerPart from "src/section/post-harvest/post-harvest-home-3";

const PostHarvestHome = () => {
  return (
    <>
      <Helmet>
        <title>post-harvest-plans</title>
      </Helmet>
      <PostHarvestPlansUpperPart />
      <PostHarvestPlanMiddlePart/>
      <PostHarvestPlanLowerPart/>
    </>
  );
};

export default PostHarvestHome;
