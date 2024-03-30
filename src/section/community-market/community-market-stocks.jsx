import React, { useEffect, useState } from 'react'
import { Grid, Paper, Typography, Box, TextField } from "@mui/material";
import PaddyStock from '../../components/communityMarket/paddy-stock-box';
import { getAllPaddyStocks } from '../../api/communitymarket';

export const CommunityMarketStocks = () => {

  const [paddyStocks, setPaddyStocks] = useState([])
  

  useEffect(() => { 

        try {
          
          getAllPaddyStocks().then((paddystocks) => { 
            setPaddyStocks(paddystocks);
            console.log(paddyStocks);
            

          }
          
          )


        } catch (error) {
          console.log(error)
        }



  },[])


  return (
    <>
      <Grid item xs={9} spacing={2} bgcolor={"lightgreen"}>
        <Paper
          style={{
            height: "100vh",
            overflowY: "scroll",
            overflowX: "hidden",
            backgroundColor: "#f2f2f2",
          }}
        >
          <Grid container spacing={1.5}>
            {paddyStocks &&
              paddyStocks.map((stock) => (
                <Grid
                  item
                  key={stock.ps_id}
                  xs={12}
                  sm={6}
                  md={4}
                  bgcolor={"#f2f2f2"}
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
}
