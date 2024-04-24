import React, { useState } from 'react'
import { Grid, Paper, Typography, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Map } from '../../pages/paddy-inventory/Map';
import { useDispatch, useSelector } from 'react-redux';
import { selectMap, setDistrict } from 'src/stores/slices/mapSlice';

export const CommunityMarketSearch = () => {
  const { district } = useSelector(selectMap);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setDistrict(event.target.value));
  };

  const districts = [
    "Any",
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
  ];

  return (
    <>
      <Grid item xs={3}>
        <Paper elevation={3} style={{ height: "100%" }}>
          <Box p={2}>
            <Typography
              variant="h5"
              fontWeight={"600"}
              sx={{ marginBottom: "15px", marginTop: "10px" }}
            >
              Search
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: 3 }}>
              <InputLabel id="demo-simple-select-label">
                Enter District
              </InputLabel>
              <Select
                labelId="district_label"
                id="district"
                value={district === null ? null : district}
                label="Enter District"
                onChange={handleChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200, // Set the maximum height of the dropdown menu
                    },
                  },
                }}
              >
                {districts.map((dis, index) => (
                  <MenuItem key={index} value={dis}>
                    {dis}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Map setDistrict={setDistrict} selectedSection={district}></Map>
            
            <Button variant="contained" style={{ marginTop: "120px" }}>
              Search
            </Button>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}
