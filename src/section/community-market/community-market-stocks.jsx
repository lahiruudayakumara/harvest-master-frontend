import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { selectCommunityMarket, setStocks } from "../../stores/slices/communityMarketSlice";
import { Grid, Paper, Typography, Box, TextField } from "@mui/material";
import PaddyStock from "../../components/communityMarket/paddy-stock-box";
import { getAllPaddyStocks } from "../../api/communitymarket";

export const CommunityMarketStocks = () => {
 
  const dispatch = useDispatch();


  useEffect(() => {
    try {
      getAllPaddyStocks().then((paddystocks) => {
       
       //set the stocks in the redux store
        dispatch(setStocks(paddystocks));
    
      });
    } catch (error) {
      console.log(error);
    }
  }, []);


  //accessing the stocks from the redux store
const { stocks } = useSelector(selectCommunityMarket);
  console.log(stocks);

 

  return (
    <>
      <Grid item xs={9} >
        <Paper
          style={{
            height: "100vh",
            overflowY: "scroll",
            overflowX: "hidden",
            backgroundColor: "#ffffff",
          }}
          elevation={3}
        >
       
          <Grid container >
            
            {
              
            //map redux store stocks and render the PaddyStock component  
              stocks &&
              stocks.map((stock) => (
                <Grid
                  item
                  key={stock.ps_id}
                  xs={12}
                  sm={6}
                  md={4}
                  bgcolor={"#ffffff"}
                >
                  {/* Render each PaddyStock component with the data */}
                  <PaddyStock key={stock.ps_id} data={stock}></PaddyStock>
                </Grid>
              ))}
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};
