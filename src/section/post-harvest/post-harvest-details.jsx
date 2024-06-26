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
  deletePaddystock,
  getAvailableBid,
  getPaddyStock,
  getPostHarvestAuditPlan,
  getPostHarvestPlan,
  getWeatherDetails,
  getsoldstock,
} from "../../api/postHarvestApi";
import { Details1 } from "./post-harvest-details-1";
import { PostHarvestWeather } from "./post-harvest-weather";
import PostHarvestTasks from "./postharvest-task";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostHarvest,
  updatePostHarvest,
} from "src/stores/slices/postharvestPlanSlice";
import { selectPostPlans } from "src/stores/slices/postPlanListSlice";
import { useParams } from "react-router-dom";
import {
  selectPaddyStock,
  setPaddyStocks,
} from "src/stores/slices/paddyStockSlice";
import { selectBid, setBidsList } from "src/stores/slices/bidSlice";
import {
  selectPostHarvestAudit,
  setAuditDataValues,
} from "src/stores/slices/postharvestAuditSlice";
import calculateTimeRemaining from "src/utilities/timeRemaining";
import MapComponent from "./map-component";
import DeletePop from "src/components/util/delete-popup";

export const PostHarvestDetailsView = () => {
  const { id } = useParams();
  console.log(id);

  const { selectedFieldid } = useSelector(selectPostPlans);

  const { plandata } = useSelector(selectPostHarvest);
  const { paddyStock } = useSelector(selectPaddyStock);
  const { auditData } = useSelector(selectPostHarvestAudit);
  const { bids } = useSelector(selectBid);

  const [planData, setPlanData] = useState([""]);
  const [soldStock, setSoldStock] = useState([""]);

  const homeClick = () => {
    window.location.href = "/postharvestplans";
  };

  //for update
  const [paddyStocks, setPaddyStock] = useState({
    postharvest_id: null,
    ps_id: " ",
    price: "",
    amount: "",
    status: "",
  });

  const [weatherAll, setWeather] = useState([""]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id != null) {
      fetchPostHarvestPlan(id).then(fetchWeatherDetails);

      fetchPostharvestAudit(id).then(fetchPaddyStock).then(fetchAvailableBid);

      fetchPostharvestAudit(id).then(fetchSoldStock);
    }
  }, [selectedFieldid]);

  const fetchPostHarvestPlan = async (id) => {
    try {
      const planData = await getPostHarvestPlan(id);
      dispatch(updatePostHarvest(planData));
      setPlanData(planData);
      return planData.zip;
    } catch (error) {
      console.error("Error fetching post-harvest plan:", error);
      throw error;
    }
  };

  const fetchPostharvestAudit = async (fieldId) => {
    try {
      const postharvestAudit = await getPostHarvestAuditPlan(fieldId);
      dispatch(setAuditDataValues(postharvestAudit));

      return postharvestAudit.auditId;
    } catch (error) {
      console.error("Error fetching paddy stock:", error);
      throw error;
    }
  };

  const fetchPaddyStock = async (fieldId) => {
    try {
      const paddyStock = await getPaddyStock(fieldId);
      dispatch(setPaddyStocks(paddyStock));

      return paddyStock.ps_id;
    } catch (error) {
      console.error("Error fetching paddy stock:", error);
      throw error;
    }
  };

  const fetchAvailableBid = async (psId) => {
    try {
      const bids = await getAvailableBid(psId);
      dispatch(setBidsList(bids));
      setAvailableBids(bids);
      return bids[0].stockid;
    } catch (error) {
      console.error("Error fetching available bids:", error);
      throw error;
    }
  };

  const fetchWeatherDetails = async (cityId) => {
    try {
      const weather = await getWeatherDetails(cityId);
      setWeather(weather);
      console.log(weather.city.name);
    } catch (error) {
      console.error("Error fetching weather details:", error);
      throw error;
    }
  };
  const fetchSoldStock = async (stockid) => {
    try {
      const paddyStock = await getsoldstock(stockid);

      setSoldStock(paddyStock);
      return paddyStock.ps_id;
    } catch (error) {
      console.error("Error fetching paddy stock:", error);
      throw error;
    }
  };

  const deleteStock = async (id) => {
    response = await deletePaddystock(id);
    if (response.status === 200) {
      alert("Stock deleted successfully");
      window.location.reload();
    }
  };

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
        <Grid container spacing={2} p={2.5}>
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
                    <IconButton onClick={homeClick}>
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
              </Box>
            </Paper>
          </Grid>
          {/* First Row */}
          <Grid item xs={4}>
            <Paper elevation={3}>
              <Details1
                planData={planData}
                auditId={auditData.auditId}
                stock={paddyStock}
              ></Details1>
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
                        paddingTop: "5px",
                        paddingLeft: "20px",
                        marginBottom: "10px",
                      }}
                    >
                      Harvesting Process
                    </Typography>
                  </Grid>
                  {/* Text Areas */}
                  <Grid item xs={12} height={"400px"}>
                    {/* available tasks  */}
                    <Box p={3}>
                      <PostHarvestTasks></PostHarvestTasks>
                    </Box>
                  </Grid>
                  <Grid item xs={12} justifyContent={"right"}></Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* 
        weather details */}
          <Grid
            item
            xs={4}
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            justifyContent={"flex-start"}
            marginTop={-2}
          >
            <Paper elevation={3} sx={{ flex: 2 }}>
              <Box>
                {/* Weather status */}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      style={{
                        padding: "20px",
                      }}
                    >
                      Weather Status
                    </Typography>
                  </Grid>

                  <PostHarvestWeather
                    location={weatherAll.city}
                    zip={ planData.zip}
                    
                  ></PostHarvestWeather>
                </Grid>
              </Box>
            </Paper>
            <Paper elevation={3} sx={{ flex: 1.2 }}>
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
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Typography variant="h5">Bidding Process</Typography>
                        <Box
                          bgcolor="#2CA019"
                          borderRadius={2}
                          p={1}
                          height={20}
                          ml={2} // Add margin for spacing between the two Typography components
                        >
                          <Typography
                            variant="body1"
                            component="span"
                            color={"#ffffff"}
                            sx={{ fontSize: 15 }}
                          >
                            {paddyStock.status}
                          </Typography>
                        </Box>
                      </Box>
                      <Box flex="0">
                        <DeletePop
                          id={paddyStock.ps_id}
                          delete={deleteStock}
                          title={"Remove Stock"}
                          text={
                            "Are you sure you want to delete this paddy stock? This action would remove the paddystock if available and also any bids related to that."
                          }
                        ></DeletePop>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item>
                    {paddyStock.status != "CLOSED" ? (
                      <Typography variant="body1" m={1}>
                        Ends in :{" "}
                        {paddyStock.stockCreationDate != null
                          ? calculateTimeRemaining(paddyStock.stockCreationDate)
                          : "Loading..."}
                      </Typography>
                    ) : null}

                    <Typography variant="body1" m={1}>
                      Starting Bid : Rs. {paddyStock.price}
                    </Typography>
                    <Typography variant="body1" m={1}>
                      Stock Amount :{paddyStock.amount}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Second Row */}
          <Grid item xs={4}>
            <Paper elevation={3}>
              <Box
                sx={{
                  height: 450,
                  borderRadius: 4,
                  bgcolor: "primary.main",
                  p: 1.5,
                }}
              >
                {/* Harvest audit */}
                <Box m={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h5">Harvesting Summary</Typography>
                    </Grid>
                    {/* Text Areas */}
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        component="div"
                        style={{
                          borderRadius: "5px",
                          padding: "10px",
                        }}
                      >
                        Method Of Harvesting :{" "}
                        {plandata?.type ? plandata.type : "Loading..."}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h5" style={{}}>
                        Harvest Audit
                      </Typography>
                    </Grid>
                    <Grid item xs={12} justifyContent={"right"}>
                      <Typography
                        variant="body1"
                        component="div"
                        style={{
                          padding: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        Dry Weight :{" "}
                        {auditData?.weight
                          ? auditData.weight + " Kg"
                          : " Unavailable"}
                      </Typography>

                      <Typography
                        variant="body1"
                        component="div"
                        style={{
                          padding: "10px",
                        }}
                      >
                        Quality Value :
                        {auditData?.quality_value
                          ? auditData.quality_value + " %"
                          : " Unavailable"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3}>
              <Box
                sx={{
                  height: 450,
                  borderRadius: 4,
                  bgcolor: "primary.main",
                  p: 1.5,
                }}
              >
                {/* bidding   */}
                <Grid item xs={12}>
                  {paddyStock.status != "CLOSED" ? (
                    <Typography variant="h5">Available Bids</Typography>
                  ) : (
                    <Typography variant="h5">Location Details</Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      borderRadius: 4,
                      bgcolor: "white",
                      mt: 1.5,
                    }}
                  >
                    {/* Available bids list */}

                    <div style={{ overflowY: "auto", maxHeight: "370px" }}>
                      <div className="general-info">
                        <table>
                          <tbody>
                            <tr style={{ marginBottom: "30px" }}>
                              <th style={{ textAlign: "center" }}>
                                <strong>Buyer</strong>
                              </th>
                              <th style={{ textAlign: "center" }}>
                                <strong>Bid(Rs)</strong>
                              </th>
                              <th style={{ textAlign: "center" }}>
                                <strong>Action</strong>
                              </th>
                            </tr>
                            {bids.map((bid) => (
                              <BidItem key={bid.id} bidData={bid}></BidItem>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={3}>
              <Box
                sx={{
                  height: 450,
                  borderRadius: 4,
                  bgcolor: "primary.main",
                  p: 1.5,
                }}
              >
                <MapComponent
                  id={soldStock.soldstockid}
                  location={soldStock.pickuplocation}
                ></MapComponent>{" "}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
