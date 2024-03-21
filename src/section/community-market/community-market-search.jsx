import React from 'react'
import { Grid, Paper, Typography, Box, TextField, Button } from "@mui/material";

export const CommunityMarketSearch = () => {
  return (
    <>
      <Grid item xs={3} bgcolor={"lightgreen"}>
        <Paper elevation={3} style={{ height: "100%" }}>
          <Box p={2}>
            <Typography variant="h5" fontWeight={"600"} sx={{marginBottom:"30px",marginTop:"30px"}}>Search</Typography>
            <TextField
              label="Enter District"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Crop season"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Vareity of rice"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button variant="contained" style={{marginTop:"40px"}}>Search</Button>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}
