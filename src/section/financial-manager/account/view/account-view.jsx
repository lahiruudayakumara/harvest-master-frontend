import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, TableCell, TableRow, Typography } from "@mui/material";
import TranstractionTable from "../transtraction-table";
import AcountViewBox from "../acount-view-box";
import ActivityTable from "../activity-table";
import BasicDateCalendar from "../../../../components/calender/calendar";
import BankImg from "../bank.png"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#B9DBB4",
  color: theme.palette.text.secondary,
  fontWeight: "bold",
  width: '90%',
  height: '74%',
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
            <Item sx={{ position: "relative" }}>
              <Typography
                variant="h6"
                style={{ color: "#2CA019", fontWeight: "bolder" }}
              >
                Total Balance
              </Typography>
              <Typography
                variant="h3"
                marginY='auto'
                style={{ color: "#FFAB00", fontWeight: "bold", zIndex: 1 }}
              >
                Rs. 10,105,989.86
              </Typography>
              <img
                src={BankImg}
                alt="account-view"
                style={{
                  width: '45%',
                  height: 'auto',
                  position: 'absolute',
                  right: 0,
                }}
              />
              <Box marginTop='auto'>
                <Typography variant="body1" fontWeight={"bold"}>
                  1234 1254 1452 4526
                </Typography>
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

        <AcountViewBox />

        <Grid container marginTop={1} spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography
              variant="h6"
              marginBottom={1}
              style={{ color: "#07bc0c", fontWeight: "bolder" }}
            >
              Recent Transtraction
            </Typography>
            <TranstractionTable />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              marginBottom={1}
              style={{ color: "#07bc0c", fontWeight: "bolder" }}
            >
              Activity
            </Typography>
            <ActivityTable />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AccountView;
