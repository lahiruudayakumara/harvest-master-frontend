import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import FormHeader from "../../components/preHarvestForms/FormHeader";
import FormControls from "../../components/preHarvestForms/controls/FormControls";

import { Select, MenuItem } from "@mui/material";
import { InputLabel, FormControl } from "@mui/material";
import {
  provinces,
  districts,
  ownershipType,
  fertilizerType,
  riceVarieties,
} from "../../components/preHarvestForms/service/Data";
import { addPostHarvestPlan } from "src/api/postHarvestApi";
import { getAllCitiesApi, getAllDistrictsApi } from "src/api/preHarvestApi";
import { set } from "react-hook-form";

const initialValues = {
  regNumber: "",
  province: "",
  district: "",
  city: "",
  zip: "",
  ownershipType: "",
  fieldArea: "",
  fertilizerType: "",
  riceVariety: "",
  plantingDate: dayjs().format("YYYY-MM-DD"),
  agreed: false,
};

// eslint-disable-next-line react/prop-types
export const PostHarvestForm = ({ onCancel }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [postalcode, setPostalcode] = useState(" ");

  //calender restriction
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

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
      } else {
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
      if ((!/^\d+$/.test(value) && value !== "") || value < 0) {
        error = "Field area must be a positive integer";
        lock = "true";
      }

      // Handling backspace
      if (e.key === "Backspace" && value.length === 1) {
        lock = "false";
      }
    } else if (name === "zip") {
      if ((!/^\d+$/.test(value) && value !== "") || value < 0) {
        error = "Zip code must contain only numbers";
        lock = "true";
      }

      if (value.length !== 5) {
        error = "Zip code must contain exactly 5 digits";
      }
      if (value.length > 5) {
        lock = "true";
        error = "";
      }
      // if (event.key === "Backspace" && value.length === 1) {
      //   lock = "false";
      // }
    }

    let provinceId = null;
    if (name === "province") {
      switch (value) {
        case "Central Province":
          provinceId = 2;
          break;
        case "Eastern Province":
          provinceId = 6;
          break;
        case "North Central Province":
          provinceId = 8;
          break;
        case "Northern Province":
          provinceId = 9;
          break;
        case "North Western Province":
          provinceId = 4;
          break;
        case "Sabaragamuwa Province":
          provinceId = 5;
          break;
        case "Southern Province":
          provinceId = 3;
          break;
        case "Uva Province":
          provinceId = 7;
          break;
        case "Western Province":
          provinceId = 1;
          break;
        default:
          provinceId = null;
      }
    }

    console.log("provinceId", provinceId);

    if (provinceId) {
      getAllDistrictsApi(provinceId)
        .then((response) => {
          console.log("districts", response);
          setDistricts(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    let district = districts.find((district) => district.nameEn === value);
    console.log("districtId", district);
    let districtId = district ? district.id : null;

    console.log("districtId", districtId);

    if (districtId) {
      getAllCitiesApi(districtId)
        .then((response) => {
          console.log("cities", response);
          setCities(response);
          lock = "false";
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (name === "city") {
      let city = cities.find((city) => city.nameEn === value);

      let postalcode = city ? city.postcode : null;
      setPostalcode(postalcode);
      console.log("city", value);
      console.log("iddddddd", postalcode);
      // Update errors state only if there's an error for the relevant field
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

    if (name == "district") {
      console.log("district is", value);
    }

    if (lock != "true") {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
      
    }
    console.log("current", formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        console.log("postalcode", postalcode);
        addPostHarvestPlan(formValues, postalcode).then((res) => {
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
                  id="demo-simple-select-label1"
                  style={{ marginTop: "1.25rem" }}
                >
                  Province
                </InputLabel>
                <Select
                  type="text"
                  labelId="demo-simple-select-label1"
                  id="demo-simple-select1"
                  name="province"
                  label="Province"
                  value={formValues.province}
                  onChange={handleChange}
                  options={provinces}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                  style={{ width: "80%", marginTop: "5%" }}
                  error={errors.province}
                  helperText={errors.province}
                >
                  {provinces.map((prov, index) => (
                    <MenuItem key={index} value={prov}>
                      {prov}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  {districts.map((district) => (
                    <MenuItem key={district.id} value={district.nameEn}>
                      {district.nameEn}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label0"
                  style={{ marginTop: "1.25rem" }}
                >
                  City
                </InputLabel>
                <Select
                  type="text"
                  labelId="demo-simple-select-label0"
                  id="demo-simple-select"
                  name="city"
                  label="City"
                  value={formValues.city}
                  onChange={handleChange}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                  style={{ width: "80%", marginTop: "5%" }}
                  error={errors.city}
                  helperText={errors.city}
                >
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.nameEn}>
                      {city.nameEn}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControls.InputX
                type="text"
                name="zip"
                label="Zip"
                value={formValues.zip}
                style={{ width: "80%", marginTop: "5%" }}
                error={errors.zip}
                onChange={handleChange}
                readOnly
                helperText={postalcode}
              />
              <FormControls.InputAdornmentX
                required
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
                label="Planted Date"
                value={formValues.plantingDate}
                onChange={handleChange}
                style={{ width: "80%", marginTop: "5%" }}
                // Set the min attribute to allow only dates from the first day of the previous month
                InputLabelProps={{
                  shrink: true,
                }}
                // Set the max attribute to allow only dates before today
                inputProps={{
                  max: formattedToday,
                }}
                max={formattedToday}
              />
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
              {/* <FormControls.CheckBoxX
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
              /> */}
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
