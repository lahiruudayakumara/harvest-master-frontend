import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, TableCell, TableRow, Typography } from "@mui/material";
import DeliveryScheduleTable from "../delivery-schedule-table";
import BasicDateCalendar from "../../../../components/calender/calendar";
import AccountViewBox from "../account-view-box";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCount, selectCount } from "src/stores/slices/pendingOrderSlice";
import { getOrderCount } from "src/api/logisticHandlerApi";
import VehicleImg from "../LogisticIcon.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#B9DBB4",
  color: theme.palette.text.secondary,
  fontWeight: "bold",
  width: '90%',
  height: '75%',
  padding: '5%',
  display: 'flex',
  flexDirection: 'column',
  position: "relative", // Add position relative for absolute positioning of the image

}));

const AccountView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getOrderCount().then((data) => {
      dispatch(fetchCount(data));
    })
  }, []);

  const countData = useSelector(selectCount);
  console.log(countData.delivered_count);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Item>
              <Typography
                variant="h6"
                style={{ color: "#2CA019", fontWeight: "bolder" }}
              >
                Total Completed Delivery Orders
              </Typography>
              <Typography
                variant="h3"
                marginY='auto'
                style={{ color: "#FFAB00", fontWeight: "bold" }}
              >
                {countData.delivered_count}
              </Typography>
              {/* Position the image */}
              <img
                src={VehicleImg}
                alt="account-view"
                style={{
                  width: "300px", // Adjust size as needed
                  height: "auto",
                  position: "absolute",
                  right: "20%", // Position in the middle horizontally
                  transform: "translateX(50%)", // Adjust to center it exactly
                  bottom: "50px", // Adjust distance from bottom
                }}
              />
              <Box>
                <Typography variant="body1" fontWeight={"bold"}>
                  Harvest Master (Pvt) Ltd.
                </Typography>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box boxShadow={1}>
              <BasicDateCalendar />
            </Box>
          </Grid>
        </Grid>


        <AccountViewBox inventory={countData.inventory_count} pending={countData.pending_count} />



        <Grid container marginTop={1} spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography
              variant="h6"
              marginBottom={1}
              style={{ color: "#07bc0c", fontWeight: "bolder" }}
            >
              Upcoming Delivery Schedule
            </Typography>
            <DeliveryScheduleTable />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AccountView;
