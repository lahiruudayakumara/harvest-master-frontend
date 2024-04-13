import { Grid, Typography,Button,Box } from "@mui/material";
import React from "react";
import { WeatherList } from "../../components/postHarvest/post-harvest-weather-list";

import { Link } from "react-router-dom";

export const PostHarvestWeather = ({ location, weatherdata }) => {
  if (!location || !location.name ) {
    return <div>Loading...</div>; // Return a loading indicator or placeholder
  }
  const name = location.name;

  return (
    <Grid item xs={12} ml={3}>
      <Box display={"flex"} flexDirection={"column"} gap={3} height={"100%"}>
      <Typography variant="h6">{name} </Typography>
      <Typography variant="overline" mb={5}>weather description and warnings </Typography></Box>
     <Link to={"/weather"}> <Button sx={{ fontSize: 16,width:"auto",marginTop:2 }}>Go To Weather</Button></Link>
    </Grid>
  );
};
