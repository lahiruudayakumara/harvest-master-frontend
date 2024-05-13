import React, { useEffect } from 'react'
import SupportTableView from './support-table'
import { Box, Grid, Paper, Typography } from '@mui/material'
import { getSupportRequests } from 'src/api/supportApi'
import ArcDesign from './supportgauge'

const SupportDeskDashboard = () => {

  const [inq, setInq] = React.useState([])
  
    useEffect(() => {
      getSupportRequests().then((request) => {
        setInq(request);
   
      });
    }, []);



  return (
    <>
      <Grid container style={{ height: "87vh" }}>
        <Grid item xs={12} style={{ height: "25%", width: "100%" }}>
          <Grid container style={{ height: "100%", width: "100%" }}>
            <Grid item xs={4} style={{ height: "100%", width: "100%" }}>
              <Paper elevation={3} sx={{ width: "95%", height: "90%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: 2,
                  }}
                >
                  <Typography variant="h6">Total Requests</Typography>
                  <Typography variant="h4" textAlign={"center"}>
                    {inq.length}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={4} style={{ height: "100%", width: "100%" }}>
              <Paper elevation={3} sx={{ width: "95%", height: "90%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: 2,
                  }}
                >
                  <Typography variant="h6">Pending Requests</Typography>
                  <Typography variant="h4" textAlign={"center"}>
                    {inq.filter((item) => item.status === "Pending").length}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={4} style={{ height: "100%", width: "100%" }}>
              <Paper elevation={3} sx={{ width: "95%", height: "90%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: 2,
                  }}
                >
                  <Typography variant="h6">Answered Requests</Typography>
                  <Typography variant="h4" textAlign={"center"}>
                    {inq.filter((item) => item.status === "Answered").length}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ height: "74%", width: "100%", marginTop: 1 }}
        >
          <Grid container style={{ height: "100%", width: "100%" }}>
            <Grid item xs={12} sx={{ paddingRight: 2.5 }}>
              <SupportTableView></SupportTableView>
            </Grid>
           
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default SupportDeskDashboard
