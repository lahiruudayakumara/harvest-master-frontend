import React from "react";
import { Helmet } from "react-helmet";

import PostPlansListUpperPart from "src/components/postHarvest/post-harvest-plans-list-upper";
import PostPlansListLower from "src/components/postHarvest/post-harvest-list-lower";
import { CurrentPostHarvestPlans } from "./currentPostHarvestPlans";
// import MyPlansLowerPart from "../../components/myPlansPg/myPlansLowerPart";

const MyPostHarvestPlans = () => {
  return (
    <>
      <Helmet>
        <title>my post harvest plans</title>
      </Helmet>
      <PostPlansListUpperPart />
      <PostPlansListLower ></PostPlansListLower>
      <CurrentPostHarvestPlans/>
       
      {/* <MyPlansLowerPart /> */}
    </>
  );
};

export default MyPostHarvestPlans;
