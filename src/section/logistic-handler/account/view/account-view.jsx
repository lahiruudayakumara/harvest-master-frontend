import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, TableCell, TableRow, Typography } from "@mui/material";
import DeliveryScheduleTable from "../delivery-schedule-table";
import BasicDateCalendar from "../../../../components/calender/calendar";
import AccountViewBox from "../account-view-box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#B9DBB4",
  color: theme.palette.text.secondary,
  fontWeight: "bold",
  width: '90%',
  height: '75%',
  padding: '5%',
  display: 'flex',
  flexDirection: 'column'
}));

const AccountView = () => {
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
                3790
              </Typography>
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


        <AccountViewBox />



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
