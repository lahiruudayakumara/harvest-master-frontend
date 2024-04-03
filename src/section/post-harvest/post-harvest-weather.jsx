import { Grid, Typography } from "@mui/material";
import React from "react";
import { WeatherList } from "../../components/postHarvest/post-harvest-weather-list";
import WeatherTable from "../../components/postHarvest/weather-table";

export const PostHarvestWeather = ({ location, weatherdata }) => {
  if (!location || !location.name || !weatherdata) {
    return <div>Loading...</div>; // Return a loading indicator or placeholder
  }
  const name = location.name;

  return (
    <Grid item xs={12}>
      <Typography variant="h6" m={2}>{name} </Typography>
    <WeatherTable data={weatherdata} />
    </Grid>
  );
};
