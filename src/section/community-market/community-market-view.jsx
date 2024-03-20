import { Grid, Paper, Typography, Box, TextField, createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { CommunityMarketStocks } from "./community-market-stocks";
import { CommunityMarketSearch } from "./community-market-search";
import { TopImage } from "../../components/top-section-image";

export const CommunityMarketView = () => {

    const theme = createTheme({
      palette: {
        primary: {
          main: "#0F601F",
        },
      },
      typography: {
        // Set all text color to black
        body1: {
          color: "black",
          fontWeight: "550", // Make text bold
        },
        // You can define other variants here as needed
      },
    });
  return (
    <>
      <ThemeProvider theme={theme}>
        <TopImage
          classname="community_stock"
          title1=" PLAN AHEAD YOUR"
          title2=" HARVESTING.
 Find Your Plans Here."
        ></TopImage>
        <div style={{ height: "100vh" }}>
          <Grid container spacing={2} style={{ height: "100%" }}>
            {/* First Column */}
            <CommunityMarketSearch></CommunityMarketSearch>

            {/* Second Column */}
            <CommunityMarketStocks></CommunityMarketStocks>
          </Grid>
        </div>
      </ThemeProvider>
    </>
  );
};
