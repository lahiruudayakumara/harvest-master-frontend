import { BorderClearOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";

export const PostHarvestForm = ({formData, setformData,onSubmit}) => {
  const handleChange =  (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value)
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#0F601F",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          flexDirection={"column"}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Box
            display="flex"
            flexDirection={"row"}
            alignContent={"center"}
            m={10}
            justifyContent={"center"}
            height={"aut0"}
          >
            <Paper elevation={3} sx={{ borderRadius: "10px" }}>
              <FormControl
                style={{
                  width: 900,
                  backgroundColor: "white",
                  padding: "30px",
                }}
              >
                <Container>
                  <Grid container spacing={6}>
                    <Grid item xs={12}>
                      <Typography variant="h5" textAlign={"start"} pt={10}>
                        Paddy Harvest Details
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Paddy Field Location "
                        variant="outlined"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Postal Code "
                        variant="outlined"
                        type="number"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        label="Paddy Field Name"
                        variant="outlined"
                        name="fieldName"
                        value={formData.fieldName}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Paddy Field Registration No"
                        variant="outlined"
                        name="regNo"
                        value={formData.regNo}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="variety-drop">Paddy Variety</InputLabel>
                        <Select
                          variant="outlined"
                          name="variety"
                          labelId="variety-drop"
                          id="variety"
                          value={formData.variety}
                          onChange={handleChange}
                          label="Select Option"
                          fullWidth
                        >
                          <MenuItem value="">None</MenuItem>
                          <MenuItem value="Red Nadu">Red Nadu</MenuItem>
                          <MenuItem value="Kuruluthuda">Kuruluthuda</MenuItem>
                          <MenuItem value="Samba Kakulu">Samba Kakulu</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="method-drop">
                          Cultivation method
                        </InputLabel>
                        <Select
                          variant="outlined"
                          labelId="method-drop"
                          id="fertilizerType"
                          name="fertilizerType"
                          value={formData.fertilizerType}
                          label="Cultivation Method"
                          onChange={handleChange}
                          fullWidth
                        >
                          <MenuItem value="">None</MenuItem>
                          <MenuItem value="Organic">Organic</MenuItem>
                          <MenuItem value="Non Organic">Non Organic</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        label="Paddy  Field Area"
                        variant="outlined"
                        name="area"
                        type="number"
                        value={formData.area}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        label="Planted Date"
                        variant="outlined"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h5" textAlign={"start"} pt={10}>
                        Paddy Harvest Details
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="owner-drop">
                          Ownership Status
                        </InputLabel>
                        <Select
                          variant="outlined"
                          id="owner"
                          name="ownership"
                          labelId="owner-drop"
                          value={formData.ownership}
                          label="OwnerShip"
                          onChange={handleChange}
                          fullWidth
                        >
                          <MenuItem value="">None</MenuItem>
                          <MenuItem value="Personal">Personal</MenuItem>
                          <MenuItem value="Not owned">Not Owned</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="split-drop">Harvest Split</InputLabel>
                        <Select
                          id="split"
                          labelId="split-drop"
                          label="Harvest Split Method"
                          variant="outlined"
                          name="harvestsplit"
                          value={formData.harvestsplit}
                          onChange={handleChange}
                          fullWidth
                        >
                          <MenuItem value="">None</MenuItem>
                          <MenuItem value="0.5">Half</MenuItem>
                          <MenuItem value="0.25">One Third</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} mt={5} mb={4}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={onSubmit}
                        fullWidth
                        style={{
                          color: "black",
                          fontWeight: "550",
                          height: "50px",
                          fontSize: "21px",
                        }}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Container>
              </FormControl>
            </Paper>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};
