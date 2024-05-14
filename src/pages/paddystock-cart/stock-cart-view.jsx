import React, { useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { getAllBidsPerBuyer, getAllSoldStocksPerBuyer } from "src/api/communitymarket";

const StockCartView = () => {


    useEffect(() => { 


        getAllBidsPerBuyer("test")
        getAllSoldStocksPerBuyer("test")



    }, []);



  return (
    <Grid
      container
      spacing={10}
      mt={10}
      pl={4}
      pr={4}
      sx={{ backgroundColor: "green" }}
    >
      <Grid item xs={6}>
        <Typography variant="h4" mb={5} fontWeight={600}>
          Current Bids
        </Typography>
        <Grid container spacing={4}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} key={item} display={"flex"} gap={2}>
              <Grid item xs={10} key={item}>
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
              <Grid item xs={2} key={item}>
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
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h4" mb={5} fontWeight={600}>
          Purchase PaddyStock
        </Typography>
        <Grid container spacing={4}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} key={item} display={"flex"} gap={2}>
              <Grid item xs={10} key={item}>
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
              <Grid item xs={2} key={item}>
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
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StockCartView;
