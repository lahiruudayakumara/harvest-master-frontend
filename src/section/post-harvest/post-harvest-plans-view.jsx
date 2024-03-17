import React, { useEffect, useState } from "react";
import { PlanView } from "../../components/postHarvest/plan-view";
import { ThemeProvider, Typography, createTheme } from "@mui/material";
import { OverallStatus } from "./overral-status-bar";
import { NavBar } from "../../components/nav-bar";
import { TopImage } from "../../components/top-section-image";
import { getAllPostHarvestPlans } from "../../api/postHarvestApi";

export const PostPlanView = () => {
  const [allPlans, setAllPlans] = useState([]);

  //loading all the plans from the db to the client side
  useEffect(() => {
    getAllPostHarvestPlans().then((allPostPlans) => {
      setAllPlans(allPostPlans);
      console.log(allPostPlans);
    });
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2CA019",
      },
    },
  });

  return (
    <>
      <NavBar></NavBar>
      <TopImage
        title=" PLAN AHEAD YOUR HARVESTING.
 Find Your Plans Here."
      >
        <Typography>test</Typography>
      </TopImage>
      <ThemeProvider theme={theme} >
        <OverallStatus status={allPlans.length}></OverallStatus>
              <PlanView allPlans={allPlans} sx="mt:50"></PlanView>
      </ThemeProvider>
    </>
  );
};
