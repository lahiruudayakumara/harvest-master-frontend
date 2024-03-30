import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import BasicDateCalendar from "../../../../components/calender/calendar";
import AdminAcountViewBox from "../acount-view-box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#B9DBB4",
  color: theme.palette.text.secondary,
  fontWeight: "bold",
  width: '100%',
  height: '100%',
  padding: '5%',
  display: 'flex',
  flexDirection: 'column'
}));

const AdminAccountView = () => {
  return (
    <>
    <AdminAcountViewBox />
    </>
  );
};

export default AdminAccountView;
