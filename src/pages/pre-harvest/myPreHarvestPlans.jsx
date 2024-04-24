import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import MyPlansUpperPart from "../../components/myPlansPg/myPlansUpperPart";
import MyPlansMiddlePart from "../../components/myPlansPg/myPlansMiddlePart";
import MyPlansLowerPart from "../../components/myPlansPg/myPlansLower";
import { getAllPreHarvestPlansApi } from "../../api/preHarvestApi";
import {motion, useAnimation } from "framer-motion";

const MyPreHarvestPlans = () => {



  const controls = useAnimation();

  useEffect(() => {
   controls.start({
     opacity: 1,
     transition: { duration: 0.5, ease: "easeInOut" }, // Adjust duration and easing
   });
  }, []); 




  
   
  const [plans, setPlans] = useState([]);
  const [totalArea, setTotalArea] = useState(0);
  const [numberOfVarieties, setNumberOfVarieties] = useState(0);
  const [numberOfDistricts, setNumberOfDistricts] = useState(0);
  const [numberOfFields, setNumberOfFields] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPreHarvestPlans = async () => {
      try {
        const plans = await getAllPreHarvestPlansApi();
        setPlans(plans);

        // Calculate total area
        const area = plans.reduce((acc, plan) => acc + plan.fieldArea, 0);
        setTotalArea(area);

        // Calculate number of varieties
        const varieties = new Set(plans.map((plan) => plan.riceVariety));
        setNumberOfVarieties(varieties.size);

        // Calculate number of districts
        const districts = new Set(plans.map((plan) => plan.district));
        setNumberOfDistricts(districts.size);

        // Calculate number of fields
        setNumberOfFields(plans.length);
      } catch (error) {
        console.error("Error fetching pre-harvest plans:", error);
        setError("Failed to fetch pre-harvest plans");
      }
    };

    fetchPreHarvestPlans();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredPlans = plans.filter(
    (plan) =>
      plan.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.riceVariety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.cropSeason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedPlans = searchQuery === "" ? plans : filteredPlans;

  return (
     <motion.div
      initial={{ opacity: 0 }} // Initial opacity before animation
      animate={controls} // Controls the animation
    >
      <Helmet>
        <title>My Plans</title>
      </Helmet>
      <MyPlansUpperPart onSearch={handleSearch} />
      <MyPlansMiddlePart
        totalArea={totalArea}
        numberOfDistricts={numberOfDistricts}
        numberOfFields={numberOfFields}
        numberOfVarieties={numberOfVarieties}
      />
      {displayedPlans.length === 0 && <p>No results found</p>}
      {displayedPlans.length > 0 && <MyPlansLowerPart plans={displayedPlans} />}
      {error && <p>{error}</p>}
    </motion.div>
  );
};

export default MyPreHarvestPlans;
