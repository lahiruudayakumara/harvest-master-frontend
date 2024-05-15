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
import { cropSeasons, plantingMethods, riceVarieties } from "./service/Data";

// eslint-disable-next-line no-unused-vars
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
    province: planDetails.province,
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

    if (name === "fieldArea") {
      if ((!/^\d+$/.test(value) && value !== "") || value < 0) {
        error = "Field area must be a positive integer";
        lock = "true";
      }
      //Handling backspace
      if (e.key === "Backspace" && value.length === 1) {
        lock = "false";
      }
      if (value <= 0) {
        error = "Field area must be greater than zero";
        lock = "false";
      }
      if (value === "") {
        error = "This field is required";
      }
    }

    if (lock != "true") {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
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
      alert("Plan updated successfully");
      window.location.reload();
    }
  };

  const handleReset1 = (e) => {
    e.preventDefault();
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
                  disabled
                  type="text"
                  name="regNumber"
                  label="Registration Number"
                  value={formValues.regNumber}
                  onChange={handleChange}
                  style={{ width: "80%", marginTop: "2.5%" }}
                />
                <FormControls.InputX
                  disabled
                  type="text"
                  name="province"
                  label="Province"
                  value={formValues.province}
                  onChange={handleChange}
                  style={{ width: "80%", marginTop: "5%" }}
                />
                <FormControls.InputX
                  disabled
                  type="text"
                  name="district"
                  label="District"
                  value={formValues.district}
                  onChange={handleChange}
                  style={{ width: "80%", marginTop: "5%" }}
                />
                <FormControls.InputX
                  disabled
                  type="text"
                  name="city"
                  label="City"
                  value={formValues.city}
                  onChange={handleChange}
                  style={{ width: "80%", marginTop: "5%" }}
                />
                <FormControls.InputAdornmentX
                  name="fieldArea"
                  type="text"
                  label="Field Area"
                  value={formValues.fieldArea}
                  onChange={handleChange}
                  style={{ width: "80%", marginTop: "5%" }}
                  endAdornment="acres"
                  error={errors.fieldArea}
                  helperText={errors.fieldArea}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControls.InputX
                  type="date"
                  name="plantingDate"
                  label="Planting Date"
                  value={formValues.plantingDate}
                  onChange={handleChange}
                  style={{ width: "80%", marginTop: "2.5%" }}
                />
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
                    update
                  </Button>
                  <Button
                    onClick={handleReset1}
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
