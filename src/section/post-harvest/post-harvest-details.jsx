import { Menu, Settings } from "@mui/icons-material";
import {
  Grid,
  ThemeProvider,
  createTheme,
  Box,
  Typography,
  Button,
  TextField,
  Icon,
  ListItem,
  ListItemText,
  List,
  IconButton,
  Paper,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import BidItem from "../../components/postHarvest/post-harvest-bid";
import { PostHarvestTypo } from "../../components/postHarvest/post-harvest-typo";
import {
  getAvailableBid,
  getPaddyStock,
  getPostHarvestPlan,
  getWeatherDetails,
} from "../../api/postHarvestApi";
import { Details1 } from "./post-harvest-details-1";
import { PostHarvestWeather } from "./post-harvest-weather";

export const PostHarvestDetailsView = () => {
  const [planData, setPlanData] = useState([""]);

  const [paddyStock, setPaddyStock] = useState({
    postharvest_id: null,
    ps_id: " ",
    price: "",
    amount: "",
    status: "",
  });

  const [availableBids, setAvailableBids] = useState([""]);
  const [weatherAll,setWeather] = useState([""])
  useEffect(() => {
    getPostHarvestPlan()
      .then((plan_data) => {
        setPlanData(plan_data);

        return getPaddyStock(plan_data.fieldId);
      })
      .then((paddystock) => {
        setPaddyStock(paddystock);
        console.log(paddystock);
        return getAvailableBid(paddystock.ps_id);
      })

      .then((bids) => {
        setAvailableBids(bids);
        console.log(bids);
        console.log(planData.zip);
        return getWeatherDetails("10524")
      })
      .then((weather) => {
        setWeather(weather);
        console.log(weather.city.name);
      }
      
    
    )

    // if (paddyStock.harvestId == null) {
    //   setPaddyStock((initial) => ({
    //     ...initial,
    //     harvestId: planData.fieldId,
    //     ps_id: null,
    //     start_value: "",
    //     status: "",
    //   }));
    // }
  }, []);

  console.log(weatherAll);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: "white", // Set the text color for buttons
            backgroundColor: "#2CA019", // Set the background color for buttons
            "&:hover": {
              backgroundColor: "#0F601F", // Change background color on hover
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#2CA019", // Set the color for icons
            "&:hover": {
              color: "#0F601F", // Change color on hover
            },
          },
        },
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2} p={5}>
          <Grid item xs={12} mb={2}>
            <Paper elevation={3}>
            <Box
              sx={{
                height: 70,
                borderRadius: 4,
                bgcolor: "primary.main",
              }}
            >
              <Box
                display="flex"
                justifyContent="normal"
                alignItems={"center"}
                p={1}
              >
                {" "}
                <Box flex="0" ml={"10px"}>
                  <IconButton>
                    <Menu sx={{ fontSize: 32 }} />
                  </IconButton>
                </Box>
                <Typography
                  variant="h5"
                  justifyContent={"center"}
                  textAlign={"center"}
                  ml={10}
                >
                  PaddyField Details
                </Typography>
                <Typography
                  variant="h5"
                  justifyContent={"center"}
                  textAlign={"center"}
                  ml={10}
                  color={"darkgreen"}
                  fontWeight={"600"}
                >
                  {planData.status}
                </Typography>
              </Box>
            </Box></Paper>
          </Grid>
          {/* First Row */}
          <Grid item xs={4}>
            <Paper elevation={3}>
              <Details1 planData={planData}> stockData = {paddyStock}</Details1>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper elevation={3}>
              <Box
                sx={{
                  height: 600,
                  borderRadius: 4,
                  bgcolor: "primary.main",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      style={{
                        padding: "20px",
                        marginBottom: "10px",
                      }}
                    >
                      Harvesting Process
                    </Typography>
                  </Grid>
                  {/* Text Areas */}
                  <Grid item xs={12} height={"400px"}>
                    {/* available tasks  */}
                    <Typography
                      variant="body1"
                      component="div"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                        margin: "20px",
                      }}
                    >
                      Text Area
                    </Typography>
                  </Grid>
                  <Grid item xs={12} justifyContent={"right"}>
                    <Button
                      variant="contained"
                      style={{ margin: "25px", textAlign: "center" }}
                    >
                      +Add
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3}>
              <Box
                sx={{
                  height: 600,
                  borderRadius: 4,
                  bgcolor: "primary.main",
                }}
              >
                {/* Weather status */}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      style={{
                        padding: "20px",
                        marginBottom: "10px",
                      }}
                    >
                      Weather Status
                    </Typography>
                  </Grid>
                  {/* Text Areas */}
                  <PostHarvestWeather location={weatherAll.city} weatherdata={weatherAll.list}></PostHarvestWeather>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Second Row */}
          <Grid item xs={4} mt={2}>
            <Paper elevation={3}>
              <Box
                sx={{
                  height: 800,
                  borderRadius: 4,
                  bgcolor: "primary.main",
                }}
              >
                {/* Harvest audit */}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      style={{
                        padding: "15px",
                      }}
                    >
                      Harvesting Machinary
                    </Typography>
                  </Grid>
                  {/* Text Areas */}
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      component="div"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                        margin: "20px",
                      }}
                    >
                      Text Area
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      style={{
                        padding: "15px",
                      }}
                    >
                      Harvest Audit
                    </Typography>
                  </Grid>
                  <Grid item xs={12} justifyContent={"right"}>
                    <Typography
                      variant="body1"
                      component="div"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                        margin: "20px",
                      }}
                    >
                      Text Area
                    </Typography>

                    <Typography
                      variant="body1"
                      component="div"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                        margin: "20px",
                      }}
                    >
                      Text Area
                    </Typography>
                    <Box flex flexDirection={"row"} m={"30px"}>
                      <TextField
                        variant="outlined"
                        sx={{ height: "5px", mr: "10px" }}
                        label="Enter Harvest yield"
                      ></TextField>

                      <Button
                        variant="contained"
                        style={{ textAlign: "center", height: "auto" }}
                      >
                        Save
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3}>
              <Box
                sx={{
                  height: 800,
                  borderRadius: 4,
                  bgcolor: "primary.main",
                  p: 1.5,
                }}
              >
                {/* bidding  status */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      height: "200px",
                      borderRadius: 4,
                      bgcolor: "white",
                    }}
                  >
                    <Grid container direction="column" p={2}>
                      <Grid item>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems={"baseline"}
                          p={1}
                        >
                          <Typography variant="h5" justifyContent={"center"}>
                            Bidding process
                          </Typography>
                          <Box flex="0">
                            <IconButton>
                              <Settings sx={{ fontSize: 32 }} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item>
                        <Typography variant="body1" m={1}>
                          Status : {paddyStock.status}
                        </Typography>
                        <Typography variant="body1" m={1}>
                          Ends in :
                        </Typography>
                        <Typography variant="body1" m={1}>
                          Starting Bid : Rs. {paddyStock.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      height: "560px",
                      borderRadius: 4,
                      bgcolor: "white",
                      mt: 1.5,
                    }}
                  >
                    {/* Available bids list */}

                    <List>
                      <ListItem>
                        <ListItemText primary="Buyer" sx={{ width: "55%" }} />
                        <ListItemText primary="Bid(Rs)" sx={{ width: "23%" }} />
                        <ListItemText primary="Action" />
                      </ListItem>

                      {availableBids &&
                        availableBids.map((bid) => (
                          <BidItem
                            buyer={bid.buyer_name}
                            bid={bid.price}
                          ></BidItem>
                        ))}
                    </List>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3}>
              <Box
                sx={{
                  height: 800,
                  borderRadius: 4,
                  bgcolor: "primary.main",
                  p: 1.5,
                }}
              >
                {/* bidding  status */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      height: "200px",
                      borderRadius: 4,
                      bgcolor: "white",
                    }}
                  >
                    <Grid container direction="column" p={2}>
                      <Grid item>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems={"baseline"}
                          p={1}
                        >
                          <Typography variant="h5" justifyContent={"center"}>
                            Transport Details
                          </Typography>
                          <Box flex="0">
                            <IconButton>
                              <Settings sx={{ fontSize: 32 }} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item>
                        <PostHarvestTypo content="Vehicle Type :"></PostHarvestTypo>
                        <PostHarvestTypo content="Registration number :"></PostHarvestTypo>
                        <PostHarvestTypo content="NIC of Driver :"></PostHarvestTypo>
                        <PostHarvestTypo content="Contact Number :"></PostHarvestTypo>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      height: "560px",
                      borderRadius: 4,
                      bgcolor: "white",
                      mt: 1.5,
                      p: 1,
                    }}
                  >
                    <Grid container direction="column" p={2}>
                      <Grid item>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems={"baseline"}
                          p={1}
                        >
                          <Typography variant="h5" justifyContent={"center"}>
                            Location Details
                          </Typography>
                          <Box flex="0">
                            <IconButton>
                              <Settings sx={{ fontSize: 32 }} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item></Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
