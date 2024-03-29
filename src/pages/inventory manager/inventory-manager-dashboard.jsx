import React from "react";
import { Helmet } from "react-helmet";
import { InventoryDashBoard } from "../../section/inventory-manager/Inventory-dashboard/view";

const InventoryManagerDashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard : Inventory Manager</title>
      </Helmet>
      <InventoryDashBoard />
    </>
  );
};

export default InventoryManagerDashboardPage;
