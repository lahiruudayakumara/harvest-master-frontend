import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { selectCommunityMarket, setStocks } from "../../stores/slices/communityMarketSlice";
import { Grid, Paper, Typography, Box, TextField } from "@mui/material";
import PaddyStock from "../../components/communityMarket/paddy-stock-box";
import { getAllPaddyStocks } from "../../api/communitymarket";
import { selectMap } from "src/stores/slices/mapSlice";

export const CommunityMarketStocks = () => {

  const [filteredData, setFilteredData] = useState([]);
  const [stock,setStock] = useState("")
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
  
  const { district } = useSelector(selectMap);
  console.log(stocks);



useEffect(() => {
  try {
    // Perform filtering here if needed

    if (district != "Any") {
      const filteredStocks = stocks.filter(
        (stock) => stock.district === district
      );
      setStock(filteredStocks);
    }
    else {
      setStock(stocks)
    }

    // Update the stock state with the filtered data
    
  } catch (error) {
    console.log(error);
  }
}, [stocks,district]);



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
              stock &&
              stock.map((stock) => (
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
