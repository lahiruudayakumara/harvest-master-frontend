import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, TextField } from "@mui/material";
import PaddyStock from "../../components/communityMarket/paddy-stock-box";
import { getInventoryApi } from "src/api/inventory";
import Productbox from "src/components/Inventory/product-box";


export const InventoryProducts = () => {
  const [Inventroy, setInventroy] = useState([]);

  useEffect(() => {
    try {
     getInventoryApi().then((products) => {
        setInventroy(products);
        console.log(products);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Grid item xs={12} spacing={1} bgcolor={"lightgreen"} marginBottom={20}>
        <Paper
       
        >
          <Grid container spacing={1.5}>
            {Inventroy &&
              Inventroy.map((stock) => (
                <Grid
                  item
                  key={stock.ps_id}
                  xs={12}
                  sm={5}
                  md={3}
                  bgcolor={"#ffffff"}
                >
                  {/* Render each PaddyStock component with the data */}
                  <Productbox key={stock.ps_id} data={stock}></Productbox>
                </Grid>
              ))}
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};
