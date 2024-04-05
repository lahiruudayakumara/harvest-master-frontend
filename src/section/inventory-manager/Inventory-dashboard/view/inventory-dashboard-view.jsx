import React from "react";
import ProductTable from "../product-table";
import { Box } from "@mui/material";

const InventoryDashBoard = () => {
  return (
    <Box flex={1}>
      <ProductTable />
    </Box>
  );
};

export default InventoryDashBoard;
