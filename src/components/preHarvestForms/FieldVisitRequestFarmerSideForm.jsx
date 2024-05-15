/* eslint-disable react/prop-types */
import { useState } from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import FormHeader from "./FormHeader";
import FormControls from "./controls/FormControls";
import { fieldObservations } from "./service/Data";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { addFieldVisitRequestApi } from "../../api/preHarvestApi";

const initialValues = {
  fieldObservationId: 0,
  observationType: "",
  observationDate: dayjs().format("YYYY-MM-DD"),
  affectedArea: "",
  fieldVisitDate: "",
  fieldVisitTime: "",
  visited: false,
  requestStatus: "",
};

const FieldVisitRequestFarmerSideForm = ({ onCancel, fieldId }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const id = fieldId.fieldId;
  console.log("id");

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
    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";
    let lock = "";

    if (name === "affectedArea") {
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
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    if (lock != "true") {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("fieldObservationId", formValues.fieldObservationId);
      formData.append("observationType", formValues.observationType);
      formData.append("observationDate", formValues.observationDate);
      formData.append("affectedArea", formValues.affectedArea);
      formData.append("fieldVisitDate", formValues.fieldVisitDate);
      formData.append("fieldVisitTime", formValues.fieldVisitTime);
      formData.append("visited", formValues.visited);

      addFieldVisitRequestApi(id, formData)
        .then((response) => {
          console.log("response", response);
          setFormValues(initialValues);
          alert("Field Visit Request Added Successfully");

          onCancel();
          window.location.reload();
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      alert("Please fill all the required fields");
    }
  };

  const handleReset = () => {
    setFormValues(initialValues);
  };

  return (
    <div
      style={{
        width: "500px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "5%",
      }}
    >
      <div
        style={{
          // boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.25)",
          padding: "0 30px 30px 30px",
        }}
      >
        <form>
          <FormHeader
            title="New Field Visit Request"
            subTitle="With Harvest Master"
            onCancel={onCancel}
          />
          <Grid container>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ marginTop: "0.75rem" }}
              >
                Observation Type
              </InputLabel>
              <Select
                type="text"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="observationType"
                label="Observation Type"
                value={formValues.observationType}
                onChange={handleChange}
                options={fieldObservations}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                }}
                style={{ width: "100%", marginTop: "2.5%" }}
                // error={errors.district}
                // helperText={errors.district}
              >
                {fieldObservations.map((dis, index) => (
                  <MenuItem key={index} value={dis}>
                    {dis}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControls.InputX
              type="date"
              name="observationDate"
              label="Observation Date"
              value={formValues.observationDate}
              onChange={handleChange}
              style={{ width: "100%", marginTop: "5%" }}
            />
            <FormControls.InputAdornmentX
              name="affectedArea"
              type="text"
              label="Affected Area"
              value={formValues.affectedArea}
              onChange={handleChange}
              style={{ width: "100%", marginTop: "5%" }}
              endAdornment="acres"
              error={errors.affectedArea}
              helperText={errors.affectedArea}
            />
            <Grid container display="flex" justifyContent="center" gap={2}>
              <Button
                variant="contained"
                size="large"
                type="submit"
                onClick={handleSubmit}
                style={{ marginTop: "6%" }}
                sx={{
                  backgroundColor: "green",
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
                onClick={handleReset}
                style={{ marginTop: "6%" }}
                sx={{
                  backgroundColor: "#777777",
                  alignItems: "center",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#777888",
                    color: "whitesmoke",
                  },
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default FieldVisitRequestFarmerSideForm;
