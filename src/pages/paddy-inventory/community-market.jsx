import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { CommunityMarketView } from '../../section/community-market/community-market-view'
import { NavBar } from '../../components/nav-bar'
import { motion, useAnimation } from "framer-motion";

export const CommunityMarket = () => {
 const controls = useAnimation();

  useEffect(() => {
   controls.start({
     opacity: 1,
     transition: { duration: 0.5, ease: "easeInOut" }, // Adjust duration and easing
   });
  }, []); 




  return (
    <motion.div
      initial={{ opacity: 0 }} // Initial opacity before animation
      animate={controls} // Controls the animation
    >
      <Helmet>
        <title>communitymarket</title>
      </Helmet>

      <CommunityMarketView></CommunityMarketView>
    </motion.div>
  );
}
