import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import FormHeader from "../../components/preHarvestForms/FormHeader";
import FormControls from "../../components/preHarvestForms/controls/FormControls";

import { Select, MenuItem } from "@mui/material";
import { InputLabel, FormControl } from "@mui/material";
import {
  districts,
  ownershipType,
  fertilizerType,
  riceVarieties,
} from "../../components/preHarvestForms/service/Data";
import { addPostHarvestPlan } from "src/api/postHarvestApi";

const initialValues = {
  regNumber: "",
  district: "",
  city: "",
  ownershipType: "",
  fieldArea: 0,
  fertilizerType: "",
  riceVariety: "",
  plantingDate: dayjs().format("YYYY-MM-DD"),
  agreed: false,
};

// eslint-disable-next-line react/prop-types
export const PostHarvestForm = ({ onCancel }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  
  const validate = (fieldValues = formValues) => {
    let temp = {};

    if ("regNumber" in fieldValues) {
      if (!fieldValues.regNumber) {
        temp.regNumber = "This field is required";
      } else if (!/^[A-Za-z]{6}\d{6}$/.test(fieldValues.regNumber)) {
        temp.regNumber =
          "Registration number must start with six letters followed by six numbers";
      } else {
        temp.regNumber = "";
      }
    }

    if ("district" in fieldValues) {
      if (!fieldValues.district) {
        temp.district = "This field is required";
      } else {
        temp.district = "";
      }
    }

    if ("city" in fieldValues) {
      if (!fieldValues.city) {
        temp.city = "This field is required";
      } else if (!/^[a-zA-Z\s]*$/.test(fieldValues.city)) {
        temp.city = "City name must contain only alphabets";

      } else {
        temp.city = "";
      }
    }
    if ("fieldArea" in fieldValues) {
      if (!fieldValues.fieldArea) {
        temp.fieldArea = "This field is required";
      } else if (fieldValues.fieldArea <= 0) {
        temp.fieldArea = "Field area must be greater than zero";
      } else {
        temp.fieldArea = "";
      }
    }
    if ("riceVariety" in fieldValues) {
      if (!fieldValues.riceVariety) {
        temp.riceVariety = "This field is required";
      }
    }

    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";
    let lock = "";

    if (name === "regNumber") {


       const isLettersValid = /^[a-zA-Z]{0,6}$/.test(value);
       const isNumbersValid = /^[0-9]{0,6}$/.test(value.substring(6));

       if (
         (value.length < 7 && isLettersValid) ||
         (value.length >= 7 && isNumbersValid)
       ) {
          if (value.length < 12) {
            error =
              "Registration number must start with six letters followed by six numbers";
          }
         lock = "false";
         
       }
       
       
       else {
         
         if (value.length < 12) {
           error =
           "Registration number must start with six letters followed by six numbers";
         }
         lock = "true";
          
       }

      
    } else if (name === "city") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        lock = "true";
        error = "City name must contain only alphabets";
      }
    } else if (name === "fieldArea") {
      if (value !== "" && value <= 0) {
        error = "Field area must be greater than zero";
      }
    } else if (name === "zip") {
      if (value !== "" && (!/^\d{5}$/.test(value) || /[e+]/.test(value))&& value.length < 5) {
        error = "Zip code must contain exactly 5 digits";
      }
      if (value.length > 5) {
        lock = "true";
      }
    }

    // Update errors state only if there's an error for the relevant field

     setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

    if (lock != "true") {
     
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
      error = "";
    }
    console.log("current", formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        addPostHarvestPlan(formValues).then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert("Post-Harvest Plan added successfully!");
            window.location.href = "/postharvestplans";
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

  return (
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
                name="regNumber"
                label="Registration Number"
                value={formValues.regNumber}
                onChange={handleChange}
                style={{ width: "80%", marginTop: "2.5%" }}
                error={errors.regNumber}
                helperText={errors.regNumber}
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
                name="city"
                label="City"
                value={formValues.city}
                onChange={handleChange}
                style={{ width: "80%", marginTop: "5%" }}
                error={errors.city}
                helperText={errors.city}
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
                name="fieldArea"
                type="number"
                label="Field Area"
                value={formValues.fieldArea}
                onChange={handleChange}
                style={{ width: "80%", marginTop: "5%" }}
                endAdornment="acres"
                error={errors.fieldArea}
                helperText={errors.fieldArea}
              />
              <FormControls.InputX
                type="date"
                name="plantingDate"
                label="Planted Date"
                value={formValues.plantingDate}
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
                  name="riceVariety"
                  label="Paddy Variety"
                  value={formValues.riceVariety}
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
                  error={errors.riceVariety}
                  helperText={errors.riceVariety}
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
                name="ownershipType"
                value={formValues.ownershipType}
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
  );
};
