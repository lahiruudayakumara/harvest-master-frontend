import React, { Children, useState } from "react";
import "../../components/myPlansPg/myPlansMiddlePart.css";
import PlanSearchForm from "../../section/post-harvest/post-harvest-search";

const PostPlansListLower = () => {
  const [farmerInfo, setFarmerInfo] = useState({
    activeFields: "04",
    districts: "03",
    area: "10",
    varieties: "02",
  });

  return (
    <div className="myPlansMiddlePartParent">
      <div className="myPlansMiddlePartParentBox">
        {/*  */}
        <div className="myPlansMiddlePartParentBoxup">
          {/*  */}
          <div className="myPlansMiddlePartChildBox">
            <h1>{farmerInfo.activeFields}</h1>
            <h2>FIELDS</h2>
          </div>
          <div className="myPlansMiddlePartChildBox">
            <h1>{farmerInfo.districts}</h1>
            <h2>DISTRICTS</h2>
          </div>
          {/*  */}
        </div>
        <div className="myPlansMiddlePartParentBoxup">
          {/*  */}
          <div className="myPlansMiddlePartChildBox">
            <h1>{farmerInfo.area}</h1>
            <h2>ACRES</h2>
          </div>
          <div className="myPlansMiddlePartChildBox">
            <h1>{farmerInfo.varieties}</h1>
            <h2>VARIETIES</h2>
          </div>
          {/*  */}
        </div>
      </div>
      {/*  */}
      <div className="myPlansMiddlePartParentBoxtest"></div>

  

    </div>
  );
};

export default PostPlansListLower;
