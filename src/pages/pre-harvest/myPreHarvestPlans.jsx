import React from "react";
import { Helmet } from "react-helmet";
import MyPlansUpperPart from "../../components/myPlansPg/myPlansUpperPart";
import MyPlansMiddlePart from "../../components/myPlansPg/myPlansMiddlePart";
// import MyPlansLowerPart from "../../components/myPlansPg/myPlansLowerPart";

const MyPreHarvestPlans = () => {
  return (
    <>
      <Helmet>
        <title>my plans</title>
      </Helmet>
      <MyPlansUpperPart />
      <MyPlansMiddlePart />
      {/* <MyPlansLowerPart /> */}
    </>
  );
};

export default MyPreHarvestPlans;
