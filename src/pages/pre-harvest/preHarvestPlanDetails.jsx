import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import PlanDetailsTopBar from "../../components/planDetailsPg/planDetailsTopBar";
import PlanDetailsMiddle from "../../components/planDetailsPg/planDetailsMiddle";
import PlanDetailsLower from "../../components/planDetailsPg/planDetailsLower";
import PlanDetailsBottom from "../../components/planDetailsPg/planDetailsBottom";
import ScrollToTop from "src/components/postHarvest/scroll-top";
import { getPreHarvestPlanByIdApi } from "../../api/preHarvestApi";

const PreHarvestPlanDetails = () => {
  const { fieldId } = useParams();
  console.log(fieldId);

  const [planDetails, setPlanDetails] = useState({});

  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (!fieldId) return;

      try {
        const plan = await getPreHarvestPlanByIdApi(fieldId);
        setPlanDetails(plan);
        console.log(plan);
      } catch (error) {
        console.error("Error fetching plan details", error);
      }
    };
    fetchPlanDetails();
  }, [fieldId]);

  return (
    <>
      <Helmet>
        <title>plan details</title>
      </Helmet>
      <ScrollToTop />
      <PlanDetailsTopBar />
      <PlanDetailsMiddle planDetails={planDetails} />
      <PlanDetailsLower fieldId={fieldId} />
      <PlanDetailsBottom />
    </>
  );
};

export default PreHarvestPlanDetails;
