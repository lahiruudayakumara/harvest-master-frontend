import { Helmet } from "react-helmet";
import HarvestPlansUpperPart from "../../components/harvestPlanLandingPage/harvestPlanUpperPart";
import HarvestPlansMiddlePart from "../../components/harvestPlanLandingPage/harvestPlanMiddlePart";
import HarvestPlansLowerPart from "../../components/harvestPlanLandingPage/harvestPlanLowerPart";
import ScrollToTop from "src/components/postHarvest/scroll-top";

const PreHarvestPlans = () => {
  return (
    <>
      <Helmet>
        <title>pre-harvets plans</title>
      </Helmet>
      <ScrollToTop />
      <HarvestPlansUpperPart />
      <HarvestPlansMiddlePart />
      <HarvestPlansLowerPart />
    </>
  );
};

export default PreHarvestPlans;
