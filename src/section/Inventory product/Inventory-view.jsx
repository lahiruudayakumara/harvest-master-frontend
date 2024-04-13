import { Grid, Paper, Typography, Box, TextField, createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { TopImage } from "../../components/top-section-image";
import { InventoryProducts } from "./Inventory-product";

export const Inventoryview = () => {

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
          title1="From Field to Table: Unveiling Our Paddy "
          title2="Inventory and Premium Products!"
        ></TopImage>
        <div>
          <Grid container spacing={2} style={{ height: "100%" }}>
            {/* First Column */}
           

            {/* Second Column */}
           <InventoryProducts></InventoryProducts>
          </Grid>
        </div>
      </ThemeProvider>
    </>
  );
};
