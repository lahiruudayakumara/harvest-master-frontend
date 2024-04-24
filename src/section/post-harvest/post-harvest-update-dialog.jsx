import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { PostHarvestForm } from "./post-harvest-form";
import { Box, IconButton } from "@mui/material";
import { CloseRounded, Edit } from "@mui/icons-material";
import { useState } from "react";
import { Grid } from "@mui/material";

import dayjs from "dayjs";
import FormHeader from "../../components/preHarvestForms/FormHeader";
import FormControls from "../../components/preHarvestForms/controls/FormControls";

import { Select, MenuItem } from "@mui/material";
import { InputLabel, FormControl } from "@mui/material";
import {
  districts,
 
  fertilizerType,
  riceVarieties,
  ownershipType,
} from "../../components/preHarvestForms/service/Data";
import { addPostHarvestPlan, updatePostHarvestPlan, updatePostHarvestPlanData } from "src/api/postHarvestApi";
import { useSelector } from "react-redux";
import { selectPostHarvest } from "src/stores/slices/postharvestPlanSlice";


export default function PostUpdateDialog(props) {
      
   
    
    console.log("lol",props.updatedata);

// eslint-disable-next-line react/prop-types

  const [formValues, setFormValues] = useState('');
  const [errors, setErrors] = useState({});
 React.useEffect(() => { 


setFormValues(props.updatedata);


        
    }, [props.updatedata]);
  const validate = (fieldValues = formValues) => {
    let temp = {};

    if ("regNo" in fieldValues) {
      if (!fieldValues.regNo) {
        temp.regNo = "This field is required";
      } else if (!/^[A-Za-z]{6}\d{6}$/.test(fieldValues.regNo)) {
        temp.regNo =
          "Registration number must start with six letters followed by six numbers";
      } else {
        temp.regNo = "";
      }
    }

    if ("district" in fieldValues) {
      if (!fieldValues.district) {
        temp.district = "This field is required";
      } else {
        temp.district = "";
      }
    }

    if ("location" in fieldValues) {
      if (!fieldValues.location) {
        temp.location = "This field is required";
      } else if (!/^[a-zA-Z\s]*$/.test(fieldValues.location)) {
        temp.location = "location name must contain only alphabets";
      } else {
        temp.location = "";
      }
    }
    if ("area" in fieldValues) {
      if (!fieldValues.area) {
        temp.area = "This field is required";
      } else if (fieldValues.area <= 0) {
        temp.area = "Field area must be greater than zero";
      } else {
        temp.area = "";
      }
    }
    if ("paddyVareity" in fieldValues) {
      if (!fieldValues.paddyVareity) {
        temp.paddyVareity = "This field is required";
      }
    }

    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "regNo") {
      if (value === "") {
        error = "This field is required";
      } else if (!/^[A-Za-z]{6}\d{6}$/.test(value)) {
        error =
          "Registration number must start with six letters followed by six numbers";
      }
    } else if (name === "location") {
      if (value === "") {
        error = "This field is required";
      } else if (!/^[a-zA-Z\s]*$/.test(value)) {
        error = "location name must contain only alphabets";
      }
    } else if (name === "area") {
      if (value === "") {
        error = "This field is required";
      } else if (value <= 0) {
        error = "Field area must be greater than zero";
      }
    } else if (name === "zip") {
      // Validation logic for zip field
      // Allowing exactly 6 digits and prohibiting 'e' and '+'
      if (value === "") {
        error = "This field is required";
      } else if (!/^\d{5}$/.test(value) || /[e+]/.test(value)) {
        error = "Zip code must contain exactly 5 digits ";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setFormValues({ ...formValues, [name]: value });

    console.log("current", formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        updatePostHarvestPlanData(formValues.fieldId, formValues).then((res) => {
          if (res.status === 200) {
            alert("Pre-Harvest Plan Updated Successfully!");
           
          }
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Error adding Pre-Harvest Plan!");
      }
    }
  };

  const handleReset = () => {
    setFormValues(initialValues);
  };
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <Edit sx={{ fontSize: 32 }} />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="md"
      >
        <DialogTitle>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <IconButton>
              <CloseRounded onClick={handleClose} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
              <div>
      <div
        style={{
          padding: "0 30px 30px 30px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={6}>
              <FormControls.InputX
                type="text"
                name="regNo"
                label="Registration Number"
                value={formValues.regNo}
                onChange={handleChange}
                style={{ width: "80%", marginTop: "2.5%" }}
                error={errors.regNo}
                helperText={errors.regNo}
              />
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ marginTop: "1.25rem" }}
                >
                  District
                </InputLabel>
                <Select
                  type="text"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="district"
                  label="District"
                  value={formValues.district}
                  onChange={handleChange}
                  options={districts}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                  style={{ width: "80%", marginTop: "5%" }}
                  error={errors.district}
                  helperText={errors.district}
                >
                  {districts.map((dis, index) => (
                    <MenuItem key={index} value={dis}>
                      {dis}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControls.InputX
                type="text"
                name="location"
                label="location"
                value={formValues.location}
                onChange={handleChange}
                style={{ width: "80%", marginTop: "5%" }}
                error={errors.location}
                helperText={errors.location}
              />
              <FormControls.InputX
                type="number"
                name="zip"
                label="Zip"
                value={formValues.zip}
                onChange={handleChange}
                style={{ width: "80%", marginTop: "5%" }}
                error={errors.zip}
                helperText={errors.zip}
              />
              <FormControls.InputAdornmentX
                required
                name="area"
                type="number"
                label="Field Area"
                value={formValues.area}
                onChange={handleChange}
                style={{ width: "80%", marginTop: "5%" }}
                endAdornment="acres"
                error={errors.area}
                helperText={errors.area}
              />
              <FormControls.InputX
                type="date"
                name="plantedDate"
                label="Planted Date"
                value={formValues.plantedDate}
                onChange={handleChange}
                style={{ width: "80%", marginTop: "5%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ marginTop: "0.8rem" }}
                >
                  Rice Variety
                </InputLabel>
                <Select
                  type="text"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="paddyVareity"
                  label="Paddy Variety"
                  value={formValues.paddyVareity}
                  onChange={handleChange}
                  options={riceVarieties}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                  style={{ width: "80%", marginTop: "2.5%" }}
                  error={errors.paddyVareity}
                  helperText={errors.paddyVareity}
                >
                  {riceVarieties.map((riceVar, index) => (
                    <MenuItem key={index} value={riceVar}>
                      {riceVar}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControls.RadioGroupX
                label="Ownership Type"
                type="radio"
                name="ownership"
                value={formValues.ownership}
                onChange={handleChange}
                items={ownershipType}
                style={{ marginTop: "5%" }}
              />
              <FormControls.RadioGroupX
                required
                label="Fertilizer Type"
                type="radio"
                name="fertilizerType"
                value={formValues.fertilizerType}
                onChange={handleChange}
                items={fertilizerType}
                style={{ marginTop: "4%" }}
              />
              <FormControls.CheckBoxX
                required
                name="agreed"
                label={
                  <span>
                    I agree to the{" "}
                    <a
                      href="/terms&conditions"
                      style={{ textDecoration: "none" }}
                    >
                      Terms and Conditions
                    </a>
                  </span>
                }
                value={formValues.agreed}
                onChange={(e) => {
                  setFormValues({ ...formValues, agreed: e.target.checked });
                }}
                style={{ marginTop: "7%" }}
              />
              <Grid
                container
                display="flex"
                justifyContent="flex-start"
                gap={2}
              >
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  size="large"
                  type="submit"
                  style={{ marginTop: "9%" }}
                  sx={{
                    backgroundColor: "#2CA019",
                    alignItems: "center",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#238C00",
                      color: "whitesmoke",
                    },
                  }}
                >
                  Submit
                </Button>
                <Button
                  onClick={handleReset}
                  variant="contained"
                  size="large"
                  type="submit"
                  style={{ marginTop: "9%" }}
                  sx={{
                    backgroundColor: "#666666",
                    alignItems: "center",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#999999",
                      color: "whitesmoke",
                    },
                  }}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}






