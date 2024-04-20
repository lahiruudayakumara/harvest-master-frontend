import React, { useEffect, useState } from "react";
import { PlanView } from "../../components/postHarvest/plan-view";
import { ThemeProvider, Typography, createTheme } from "@mui/material";
import { OverallStatus } from "./overral-status-bar";
import { NavBar } from "../../components/nav-bar";
import { TopImage } from "../../components/top-section-image";
import { getAllPostHarvestPlans } from "../../api/postHarvestApi";
import { useDispatch } from "react-redux";
import { setPostPlans } from "src/stores/slices/postPlanListSlice";

export const PostPlanView = () => {

  const dispatch = useDispatch();
  const [allPlans, setAllPlans] = useState([""]);

  //loading all the plans from the db to the client side
  useEffect(() => {
    getAllPostHarvestPlans().then((allPostPlans) => {

      dispatch(setPostPlans(allPostPlans));
      setAllPlans(allPostPlans);
      console.log(allPostPlans);
    });
  }, [""]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2CA019",
      },
    },
  });

  return (
    <>
         
          
      
      <ThemeProvider theme={theme} >
        
              <PlanView ></PlanView>
      </ThemeProvider>
    </>
  );
};
