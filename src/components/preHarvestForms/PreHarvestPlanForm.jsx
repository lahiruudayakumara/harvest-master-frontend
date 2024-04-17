import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import FormHeader from "./FormHeader";
import FormControls from "./controls/FormControls";
import {
  districts,
  cropSeasons,
  plantingMethods,
  riceVarieties,
} from "./service/Data";

const initialValues = {
  fieldId: 0,
  farmerId: 0,
  regNumber: "",
  district: "",
  city: "",
  cropSeason: "",
  fieldArea: 0.0,
  plantingMethod: "",
  riceVariety: "",
  plantingDate: dayjs().format("YYYY-MM-DD"),
  isAgree: false,
};

const PreHarvestPlanForm = () => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div style={{ margin: "5%" }}>
      <div
        style={{
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.25)",
          padding: "0 30px 30px 30px",
        }}
      >
        <form>
          <FormHeader
            title="New Pre-Harvest Plan"
            subTitle="With Harvest Master"
          />
          <Grid container>
            <Grid item xs={6}>
              <FormControls.InputX
                required
                type="text"
                name="regNumber"
                label="Registration Number"
                value={formValues.regNumber}
                onChange={handleChange}
                style={{ width: "80%", marginTop: "2.5%" }}
              />
              <FormControls.AutocompleteX
                required
                name="district"
                type="text"
                label="District"
                value={formValues.district}
                onChange={(event, newValue) => {
                  setFormValues({ ...formValues, district: newValue });
                }}
                options={districts}
                getOptionLabel={(option) => option?.name || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                style={{ width: "80%", marginTop: "2.5%" }}
              />
              <FormControls.InputX
                required
                type="text"
                name="city"
                label="City"
                value={formValues.city}
                onChange={handleChange}
                style={{ width: "80%", marginTop: "2.5%" }}
              />
              <FormControls.InputAdornmentX
                required
                name="fieldArea"
                type="number"
                label="Field Area"
                value={formValues.fieldArea}
                onChange={handleChange}
                style={{ width: "80%", marginTop: "2.5%" }}
                endAdornment="acres"
              />
              <FormControls.InputX
                type="date"
                name="plantingDate"
                label="Planting Date"
                value={formValues.plantingDate}
                onChange={handleChange}
                style={{ width: "80%", marginTop: "2.5%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControls.AutocompleteX
                required
                name="riceVariety"
                type="text"
                label="Rice Variety"
                value={formValues.riceVariety}
                onChange={(event, newValue) => {
                  setFormValues({ ...formValues, riceVariety: newValue });
                }}
                options={riceVarieties}
                getOptionLabel={(option) => option?.name || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                style={{ width: "80%", marginTop: "2.5%" }}
              />
              <FormControls.RadioGroupX
                label="Crop Season"
                type="radio"
                name="cropSeason"
                value={formValues.cropSeason}
                onChange={handleChange}
                items={cropSeasons}
                style={{ marginTop: "2.5%" }}
              />
              <FormControls.RadioGroupX
                required
                label="Planting Method"
                type="radio"
                name="plantingMethod"
                value={formValues.plantingMethod}
                onChange={handleChange}
                items={plantingMethods}
                style={{ marginTop: "2.5%" }}
              />
              <FormControls.CheckBoxX
                required
                name="isAgree"
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
                value={formValues.isAgree}
                onChange={(e) => {
                  setFormValues({ ...formValues, isAgree: e.target.checked });
                }}
                style={{ marginTop: "4%" }}
              />
              <Grid
                container
                display="flex"
                justifyContent="flex-start"
                gap={2}
              >
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  style={{ marginTop: "6%" }}
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
                  variant="contained"
                  size="large"
                  type="submit"
                  style={{ marginTop: "6%" }}
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

export default PreHarvestPlanForm;
