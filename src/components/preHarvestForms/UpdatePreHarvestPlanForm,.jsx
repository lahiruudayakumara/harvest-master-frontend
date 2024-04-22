/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { Select, MenuItem } from "@mui/material";
import { InputLabel, FormControl } from "@mui/material";
import FormHeader from "./FormHeader";
import FormControls from "./controls/FormControls";
import {
  getPreHarvestPlanByIdApi,
  updatePreHarvestPlanApi,
} from "../../api/preHarvestApi";
import {
  districts,
  cropSeasons,
  plantingMethods,
  riceVarieties,
} from "./service/Data";

const UpdatePreHarvestPlanForm = ({ data, onCancel, fieldId, onUpdate }) => {
  const [planDetails, setPlanDetails] = useState(data);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (!fieldId) return;

      try {
        const plan = await getPreHarvestPlanByIdApi(fieldId);
        setPlanDetails(plan);
        console.log(plan);
      } catch (error) {
        console.error("Error fetching plan details", error);
      }
    };
    fetchPlanDetails();
  }, []);

  const [formValues, setFormValues] = useState({
    regNumber: planDetails.regNumber,
    district: planDetails.district,
    city: planDetails.city,
    cropSeason: planDetails.cropSeason,
    fieldArea: planDetails.fieldArea,
    plantingMethod: planDetails.plantingMethod,
    riceVariety: planDetails.riceVariety,
    plantingDate: planDetails.plantingDate,
    agreed: planDetails.agreed,
  });
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

    if (name === "regNumber") {
      if (value === "") {
        error = "This field is required";
      } else if (!/^[A-Za-z]{6}\d{6}$/.test(value)) {
        error =
          "Registration number must start with six letters followed by six numbers";
      }
    } else if (name === "city") {
      if (value === "") {
        error = "This field is required";
      } else if (!/^[a-zA-Z\s]*$/.test(value)) {
        error = "City name must contain only alphabets";
      }
    } else if (name === "fieldArea") {
      if (value === "") {
        error = "This field is required";
      } else if (value <= 0) {
        error = "Field area must be greater than zero";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(formValues);
      const updatePlan = async () => {
        try {
          const updatedPlan = await updatePreHarvestPlanApi(
            fieldId,
            formValues
          );
          console.log(updatedPlan);
        } catch (error) {
          console.error("Error updating plan", error);
        }
      };
      updatePlan();
      onUpdate();
      alert("Plan updated successfully");
    }
  };

  const handleReset = () => {
    setFormValues(planDetails);
  };

  return (
    <div>
      <div
        style={{
          padding: "0 30px 30px 30px",
        }}
      >
        {formValues ? (
          <form onSubmit={handleSubmit}>
            <FormHeader
              onCancel={onCancel}
              title="Update Pre-Harvest Plan"
              subTitle="With Harvest Master"
            />
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
                  label="Planting Date"
                  value={formValues.plantingDate}
                  onChange={handleChange}
                  style={{ width: "80%", marginTop: "5%" }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{ marginTop: "1.25rem" }}
                  >
                    Rice Variety
                  </InputLabel>
                  <Select
                    type="text"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="riceVariety"
                    label="Rice Variety"
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
                    style={{ width: "80%", marginTop: "5%" }}
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
                  label="Crop Season"
                  type="radio"
                  name="cropSeason"
                  value={formValues.cropSeason}
                  onChange={handleChange}
                  items={cropSeasons}
                  style={{ marginTop: "5%" }}
                />
                <FormControls.RadioGroupX
                  required
                  label="Planting Method"
                  type="radio"
                  name="plantingMethod"
                  value={formValues.plantingMethod}
                  onChange={handleChange}
                  items={plantingMethods}
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
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
};

export default UpdatePreHarvestPlanForm;
