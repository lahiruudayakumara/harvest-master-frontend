import React from "react";
import { Helmet } from "react-helmet";
import { InventoryAddproductview } from "../../section/inventory-manager/Inventory-add-product/view";

export const InventoryAddProduct = () => {
  
  return (
    <>
      <Helmet>
        <title>Dashboard : Inventory Manager</title>
      </Helmet>
      <InventoryAddproductview />
    </>
  );
};
