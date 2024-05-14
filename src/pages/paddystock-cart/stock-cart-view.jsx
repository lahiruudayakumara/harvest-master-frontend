import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import {
  getAllBidsPerBuyer,
  getAllSoldStocksPerBuyer,
} from "src/api/communitymarket";
import { get } from "react-hook-form";
import StockSell from "./stock-sell-card";
import StockSellAccepted from "./stock-sell-accepted";

const StockCartView = () => {
  const [bids, setBids] = useState([]);
  const [soldStocks, setSoldStocks] = useState([]);

  useEffect(() => {
    const name = "test";

    getAllBidsPerBuyer(name).then((data) => {
      setBids(data);
    });
    getAllSoldStocksPerBuyer(name).then((data) => {
      setSoldStocks(data);
      console.log(data);
    });
  }, []);

  return (
    <Grid container spacing={10} mt={10} pl={4} pr={4}>
      <Grid item xs={6}>
        <Typography variant="h4" mb={5} fontWeight={600}>
          Current Bids
        </Typography>
        <Grid container spacing={2} mb={5}>
          {bids.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <StockSell data={item}></StockSell>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h4" mb={5} fontWeight={600}>
          Purchase PaddyStock
        </Typography>
        <Grid container spacing={2}>
          {/* {soldStocks.map((item, index) => ( */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {soldStocks.releventpaddyStock &&
                soldStocks.releventpaddyStock.status ? (
                  <StockSellAccepted data={soldStocks} />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          {/* ))} */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StockCartView;
