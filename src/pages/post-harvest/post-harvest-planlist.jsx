import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import PostPlansListUpperPart from "src/components/postHarvest/post-harvest-plans-list-upper";
import PostPlansListLower from "src/components/postHarvest/post-harvest-list-lower";
import { CurrentPostHarvestPlans } from "./currentPostHarvestPlans";
import MyPlansMiddlePart from "src/components/myPlansPg/myPlansMiddlePart";
import { useDispatch, useSelector } from "react-redux";
import { selectPostPlans, setPostPlans } from "src/stores/slices/postPlanListSlice";
import PreHarvestPlanList from "src/components/myPlansPg/myPlansLower";
import { getAllPostHarvestPlans } from "src/api/postHarvestApi";
import MyPlansUpperPart from "src/components/myPlansPg/myPlansUpperPart";


const MyPostHarvestPlans = () => {


  const [plans, setPlans] = useState([]);
  const [totalArea, setTotalArea] = useState(0);
  const [numberOfVarieties, setNumberOfVarieties] = useState(0);
  const [numberOfDistricts, setNumberOfDistricts] = useState(0);
  const [numberOfFields, setNumberOfFields] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
 const { postPlans } = useSelector(selectPostPlans)


  
  const dispatch = useDispatch();
  
  
  useEffect(() => {

    try {
  
     getAllPostHarvestPlans().then((allPostPlans) => {
       dispatch(setPostPlans(allPostPlans));
       setPlans(allPostPlans);
       console.log(allPostPlans);
     });
  // Fetch plans

} catch (error) {
  console.error("Error fetching pre-harvest plans:", error);
  setError("Failed to fetch pre-harvest plans");
}

   }, [""]);


  useEffect(() => {
    const fetchPreHarvestPlans = async () => {
      try {
       
        
         
       

        if (plans !== null && plans !== undefined && plans.length > 0) {


          console.log("plans", plans);
          // Calculate total area
          const area = plans.reduce((acc, plan) => acc + plan.area, 0);
          setTotalArea(area);

          // Calculate number of varieties
          const varieties = new Set(plans.map((plan) => plan.paddyVareity));
          setNumberOfVarieties(varieties.size);

          // Calculate number of districts
          const districts = new Set(plans.map((plan) => plan.district));
          setNumberOfDistricts(districts.size);

          // Calculate number of fields
          setNumberOfFields(plans.length);
        }
        } catch (error) {
          console.error("Error fetching pre-harvest plans:", error);
          setError("Failed to fetch pre-harvest plans");
        }
      
    };

    fetchPreHarvestPlans();
  }, [plans]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredPlans = plans.filter(
    (plan) =>
      plan.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.paddyVareity.toLowerCase().includes(searchQuery.toLowerCase()) 
      
  );

  const displayedPlans = searchQuery === "" ? plans : filteredPlans;

  return (
    <>
      <Helmet>
        <title>my post harvest plans</title>
      </Helmet>
      {/* <PostPlansListUpperPart /> */}
      <MyPlansUpperPart onSearch={handleSearch} />
      <MyPlansMiddlePart
        totalArea={totalArea}
        numberOfDistricts={numberOfDistricts}
        numberOfFields={numberOfFields}
        numberOfVarieties={numberOfVarieties}
      />

      <CurrentPostHarvestPlans plans={displayedPlans}/>


    </>
  );
};

export default MyPostHarvestPlans;