import React, { useEffect, useState } from "react";

import {
  Box,
  ButtonBase,
  CircularProgress,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { Air, ArrowBackIosNewRounded, ArrowBackRounded, WaterDrop, WbTwilight } from "@mui/icons-material";
import { getWeatherDetails } from "src/api/postHarvestApi";
import { getCurrentWeatherDetails } from "src/api/weatherApi";
import Compass from "src/components/weather/compass";
import WeatherTable from "src/components/postHarvest/weather-table";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { selectPostHarvest } from "src/stores/slices/postharvestPlanSlice";


export const WeatherView = () => {

  const { plandata } = useSelector(selectPostHarvest);
  
  console.log(plandata);

  const handleBack = () => {
    window.history.back();
  };
  const [weatherdata, setWeatherdata] = useState([""]);
  const [forecast, setForecast] = useState([""]);

  useEffect(() => {
    const currentdata = async (zip) => {
      const response = await getCurrentWeatherDetails(zip);
      setWeatherdata(response);
      console.log(response);
    };
    const forecastData = async (zip) => {
      const response = await getWeatherDetails(zip);
      setForecast(response);
      console.log(response);
    };
    currentdata(plandata.zip);
    forecastData(plandata.zip);
  }, []);

  function getCurrentDateTime() {
    // Get the current date and time
    const currentDate = new Date();

    // Create a dayjs object from the current date and time
    const dayjsDateTime = dayjs(currentDate);

    // Get the name of the day
    const dayName = dayjsDateTime.format("dddd");

    // Get the formatted date string (e.g., "Thursday 04/2024")
    const formattedDate = `${dayName} `;

    // Get the formatted time with AM/PM (e.g., "12:00 PM")
    const formattedTime = dayjsDateTime.format("h:mm A");

    // Combine the formatted date and time string
    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    console.log(formattedDateTime);
    return formattedDateTime;
  }
  //date extraction
  function getCurrentDate() {
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const currentDay = String(currentDate.getDate()).padStart(2, "0");


    var day = dayjs(`${currentYear}-${currentMonth}-${currentDay}`);

    // Get the name of the day
    console.log(day.format("dddd"));
  return day.format("dddd");
   
  }


  //time extraction from unix timestamp

  function getConvertedTime(timestamp) {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  }


  //weather video background selction function
  function WeatherBackground(weatherType) {
    let videoSrc;

    // Determine the video source based on the weatherType
    switch (weatherType) {
      // Clouds
      case "clear sky":
        videoSrc = clearSkyVideo;
        break;
      case "few clouds":
      case "scattered clouds":
        // Use the same video for few clouds and scattered clouds
        videoSrc = brokenCloudsVideo;
        break;
      case "broken clouds":
        videoSrc = brokenCloudsVideo;
        break;
      case "overcast clouds":
        videoSrc = brokenCloudsVideo;
        break;
      case "sky obscured by fog/mist":
        videoSrc = mistVideo;
        break;

      // Rain
      case "light rain":
        videoSrc = lightRainVideo;
        break;
      case "moderate rain":
        videoSrc = moderateRainVideo;
        break;
      case "heavy rain":
        videoSrc = heavyRainVideo;
        break;
      case "freezing rain":
        videoSrc = freezingRainVideo;
        break;
      case "drizzle":
        videoSrc = drizzleVideo;
        break;
      case "showers":
        videoSrc = showersVideo;
        break;
      case "torrential rain":
        videoSrc = torrentialRainVideo;
        break;
      case "thunderstorm with rain":
        videoSrc = thunderstormVideo;
        break;

      default:
        // unknown weather types
        videoSrc = "";
    }


    videoSrc = "../../assets/videos/weather/moderate-rain.mp4"

    console.log(videoSrc);
    return videoSrc;
  }


  const theme = createTheme({
    palette: {
      primary: {
        main: "#2ca019", // Green color for buttons
      },
    },
    typography: {
      fontFamily: "Quicksand, sans-serif", // Set the default font
      fontWeightRegular: 500, // Set the font weight for regular text
      fontSize: 15, // Set the font size
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box backgroundColor={"#f5f5f5"}>
        <Box height={100} backgroundColor={"#ffffff"} marginBottom={3}>
          <Grid container spacing={3} height={"100%"}>
            <Grid item xs={1}>
              <ButtonBase
                onClick={handleBack}
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
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding={2}
        >
          <Grid container spacing={2} height={"100%"}>
            {/* Current weather */}
            <Grid item xs={8} height={"100%"}>
              <Grid container spacing={2} height={"100%"}>
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
                    <Grid item xs={12} height={335} marginBottom={5}>
                      <Paper
                        elevation={3}
                        sx={{
                          position: "relative",
                          overflow: "hidden",
                          padding: 1,
                        }}
                        className="weather"
                      >
                        <video
                          autoPlay
                          loop
                          muted
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            top: 0,
                            left: 0,
                          }}
                        >
                          <source
                            src={WeatherBackground("test")}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                        <div
                          style={{
                            zIndex: 1,
                            position: "relative",
                            padding: "16px",
                          }}
                        >
                          <Grid container spacing={3}>
                            <Grid item xs={6}>
                              <Box
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"center"}
                              >
                                <Box
                                  display={"flex"}
                                  justifyContent={"space-between"}
                                  width={"90%"}
                                  mb={4}
                                >
                                  <Typography
                                    variant="h5"
                                    sx={{ color: "white" }}
                                  >
                                    {weatherdata.name}
                                  </Typography>
                                  <Typography
                                    variant="h6"
                                    sx={{ color: "white" }}
                                  >
                                    {!weatherdata.sys
                                      ? null
                                      : getCurrentDateTime()}
                                  </Typography>
                                </Box>
                                <Typography fontSize={100} color={"white"}>
                                  {!weatherdata.main
                                    ? null
                                    : Math.ceil(weatherdata.main.temp * 10) /
                                      10}
                                  °C
                                </Typography>
                                <Typography
                                  variant="h7"
                                  sx={{ color: "white" }}
                                >
                                  {!weatherdata.weather
                                    ? null
                                    : weatherdata.weather[0].description}
                                </Typography>
                                <Box
                                  display={"flex"}
                                  justifyContent={"space-between"}
                                  width={"90%"}
                                  mt={6}
                                >
                                  {!weatherdata.main ? null : (
                                    <>
                                      <Box
                                        display={"flex"}
                                        flexDirection={"row"}
                                        gap={1}
                                        alignItems={"center"}
                                      >
                                        <Air sx={{ color: "white" }} />
                                        <Typography
                                          variant="h6"
                                          color={"white"}
                                        >
                                          {weatherdata.main.pressure}Pa
                                        </Typography>
                                      </Box>
                                      <Box
                                        display={"flex"}
                                        flexDirection={"row"}
                                        gap={1}
                                        alignItems={"center"}
                                      >
                                        <WaterDrop sx={{ color: "white" }} />
                                        <Typography
                                          variant="h6"
                                          color={"white"}
                                        >
                                          {weatherdata.main.humidity}%
                                        </Typography>
                                      </Box>
                                      <Box
                                        display={"flex"}
                                        flexDirection={"row"}
                                        gap={1}
                                        alignItems={"center"}
                                      >
                                        <WbTwilight sx={{ color: "white" }} />
                                        <Typography
                                          variant="h6"
                                          color={"white"}
                                        >
                                          {getConvertedTime(
                                            weatherdata.sys.sunset
                                          )}
                                        </Typography>
                                      </Box>
                                    </>
                                  )}
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={6} bgcolor={"transparent"}>
                              <Box height={"310px"}>
                                <Paper
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "#ffffff40",
                                  }}
                                  elevation={5}
                                ></Paper>
                              </Box>
                            </Grid>
                          </Grid>
                        </div>
                      </Paper>
                    </Grid>
                  </>
                )}

                <Grid item xs={6} height={250}>
                  <Paper style={{ height: "100%" }} elevation={3}>
                    <Box p={4}>
                      <Typography variant="h5" marginBottom={3}>
                        Wind
                      </Typography>
                      <Typography variant="subtitle1" marginBottom={3}>
                        Current Wind Speed
                      </Typography>

                      {!weatherdata.wind ? (
                        <Box sx={{ display: "flex" }}>
                          <CircularProgress />
                        </Box>
                      ) : (
                        <Typography>{weatherdata.wind.speed} Km/h</Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={6} height={250}>
                  <Paper style={{ height: "100%" }} elevation={3}>
                    <Box p={4}>
                      <Typography variant="h5" marginBottom={3}>
                        Rain
                      </Typography>
                      <Typography variant="subtitle1" marginBottom={3}>
                        Rain Probability
                      </Typography>

                      {!weatherdata.wind ? (
                        <Box sx={{ display: "flex" }}>
                          <CircularProgress />
                        </Box>
                      ) : (
                        <Typography>
                          {" "}
                          {weatherdata.main.humidity}% 
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            {/* Second container with 30% width containing a list */}
            <Grid item xs={4}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                gap={4}
              >
                <Box flex={2}>
                  {!forecast.list ? (
                    <CircularProgress />
                  ) : (
                    <>
                      <Paper elevation={5}></Paper>
                      <WeatherTable data={forecast.list}></WeatherTable>
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
