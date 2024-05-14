import React, { useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { getAllBidsPerBuyer, getAllSoldStocksPerBuyer } from "src/api/communitymarket";

const StockCartView = () => {


    useEffect(() => { 


        getAllBidsPerBuyer("test")
        getAllSoldStocksPerBuyer("test")



    }, []);



  return (
    <Grid container spacing={4} mt={15} p={5}>
      <Grid item xs={4} sx={{backgroundColor:"green"}}>
        <Grid container spacing={4}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} key={item}>
              <Card style={{ height: 300 }} elevation={6}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Item {item} in Left Section
                  </Typography>
                  <Typography variant="body2">
                    Description of item {item}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Grid container spacing={4}>
          {[4, 5, 6].map((item) => (
            <Grid item xs={12} key={item}>
              <Card style={{ width: "100%" ,height:300}} elevation={6}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Item {item} in Right Section
                  </Typography>
                  <Typography variant="body2">
                    Description of item {item}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StockCartView;
