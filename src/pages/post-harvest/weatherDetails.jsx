import React, { useEffect, useState } from "react";
import {
  Box,
  ButtonBase,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { ArrowBackIosNewRounded, ArrowBackRounded } from "@mui/icons-material";
import { getWeatherDetails } from "src/api/postHarvestApi";
import { getCurrentWeatherDetails } from "src/api/weatherApi";
import Compass from "src/components/weather/compass";

export const WeatherView = () => {
  const [weatherdata, setWeatherdata] = useState([""]);

  useEffect(() => {
    const data = async () => {
      const response = await getCurrentWeatherDetails(10120);
      setWeatherdata(response);
      console.log(weatherdata);
    };
    data();
  }, []);

  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function getCurrentDate() {
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const currentDay = String(currentDate.getDate()).padStart(2, "0");

    return `${currentYear}-${currentMonth}-${currentDay}`;
  }

  return (
    <>
      <Box>
        <Grid container spacing={3} height={"100%"}>
          <Grid item xs={1}>
            <ButtonBase
              sx={{
                background: "green",
                borderRadius: "50%",
                margin: 3,
                transition: "background 0.3s ease-in-out", //  hover-in
                "&:hover": {
                  background: "lightgreen",
                },
                "&:hover:not(:hover)": {
                  background: "green",
                  transition: "background 0.3s ease-in-out", // hover-out
                },
              }}
            >
              <ArrowBackRounded sx={{ fontSize: 45, color: "white" }} />
            </ButtonBase>
          </Grid>
          <Grid
            item
            xs={11}
            display="flex"
            alignItems="center"
            justifyContent="start"
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Weather Details
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor={"#f5f5f5"}
        padding={3}
      >
        <Grid container spacing={3} height={"100%"}>
          {/* First container with 70% width containing 4 cards */}
          <Grid item xs={8} height={"100%"}>
            <Grid container spacing={3} height={"100%"}>
              {!weatherdata ? (
                <Grid item xs={12}>
                  <Paper style={{ padding: 20, height: "90%" }} elevation={3}>
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  </Paper>
                </Grid>
              ) : (
                <>
                  <Grid item xs={12}>
                    <Paper style={{ padding: 20, height: "90%" }} elevation={3}>
                      <Typography>{weatherdata.name}</Typography>
                    </Paper>
                  </Grid>
                </>
              )}

              <Grid item xs={6}>
                <Paper style={{ padding: 20, height: "90%" }} elevation={3}>
                  <Typography>
                    {!weatherdata.wind ? (
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      weatherdata.wind.deg
                    )}
                  </Typography>

                  <Compass angle={10}></Compass>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper style={{ padding: 20, height: "90%" }} elevation={3}>
                  <Typography> </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          {/* Second container with 30% width containing a list */}
          <Grid item xs={4} height={"100%"}>
            <Paper style={{ padding: 20 }} height={"600px"} elevation={3}>
              <Typography>List</Typography>
              <ul>
                {!weatherdata ? (
                  <Typography>Loading...</Typography>
                ) : (
                  <>
                    {weatherdata.list?.map((data) =>
                      formatDate(data.dt) != getCurrentDate() ? (
                        <li>{formatDate(data.dt)}</li>
                      ) : null
                    )}
                  </>
                )}
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
