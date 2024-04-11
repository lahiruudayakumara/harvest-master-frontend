import React from "react";
import "./myPlansUpperPart.css";
import preHarvestPlanTopImage from "../../assets/backgrounds/preHarvestTop.jpg";
import PlanSearchForm from "./searchFunction";

const MyPlansUpperPart = () => {
  return (
    <div className="myPlansUpperPartParent">
      <div classname="myPlansUpperPart">
        <div className="myPlansUpperPartImage">
          <img src={preHarvestPlanTopImage} alt="preHarvestPlanTopImage" />
        </div>
        {/*  */}
        <div className="myPlansUpperPartContent">
          <div className="myPlansUpperPartText">
            <h1 className="invertedText">
              NAVIGATE YOUR <span>CULTIVATION.</span>
            </h1>
            <h2 className="invertedText"> Find Your Plans Here.</h2>
          </div>
          <div className="myPlansUpperPartSearchBar">
            <PlanSearchForm />
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};
export default MyPlansUpperPart;
