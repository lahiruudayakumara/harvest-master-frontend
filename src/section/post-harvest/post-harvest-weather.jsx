import { Grid, Typography,Button,Box, Skeleton } from "@mui/material";
import React from "react";
import { WeatherList } from "../../components/postHarvest/post-harvest-weather-list";

import { Link } from "react-router-dom";

export const PostHarvestWeather = ({ location }) => {
  
  

  return (
    <>
      {!location || !location.name ? (
        <Grid item xs={12} ml={3}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignContent={"center"}
           gap={2}
          >
            <Skeleton width={"50%"} height={50} />

            <Skeleton variant="rounded" width={"95%"} height={128} />
          </Box>
          <Link to={"/weather"}>
            {" "}
            <Button sx={{ fontSize: 16, width: "auto", marginTop: 2 }}>
              Go To Weather
            </Button>
          </Link>
        </Grid>
      ) : (
        <Grid item xs={12} ml={3}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={3}
            height={"100%"}
          >
            <Typography variant="h6">{location.name} </Typography>
            <Box height={80} pr={3}>
              <Typography variant="overline" mb={5}>
                A severe thunderstorm warning has been issued for our area.
                Thunderstorms are expected to develop rapidly, bringing with
                them the potential for damaging winds, hail, intense rainfall,
                and lightning strikes.
              </Typography>
            </Box>
          </Box>
          <Link to={"/weather"}>
            {" "}
            <Button sx={{ fontSize: 16, width: "auto", marginTop: 2 }}>
              Go To Weather
            </Button>
          </Link>
        </Grid>
      )}
    </>
  );
};
