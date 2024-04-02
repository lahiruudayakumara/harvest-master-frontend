import React from "react";
import ProductTable from "../product-table";
import { Box } from "@mui/material";
import BasicDateCalendar from "../../../../components/calender/calendar";

const InventoryDashBoard = () => {
  return (
    <Box flex={1}>
      
      <ProductTable />
    </Box>
  );
};

export default InventoryDashBoard;
