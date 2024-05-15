/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import FormHeader from "./FormHeader";
import FormControls from "./controls/FormControls";
import { preHarvestCosts } from "./service/Data";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  updatePreHarvestCostByIdApi,
  getPreHarvestCostByIdApi,
} from "../../api/preHarvestApi";

const UpdatePreHarvestCostForm = ({ onCancel, fieldId, costId }) => {
  const id = fieldId.fieldId;
  const [formValues, setFormValues] = useState({
    type: "",
    date: "",
    description: "",
    amount: 0,
  });
  const [errors, setErrors] = useState("");

  useEffect(() => {
    const fetchCostDetails = async () => {
      try {
        const costs = await getPreHarvestCostByIdApi(costId);
        setFormValues(costs);
      } catch (error) {
        console.error("Error fetching cost details", error);
      }
    };
    fetchCostDetails();
  }, [costId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";
    let lock = "";

    if (name === "amount") {
      if ((!/^\d+$/.test(value) && value !== "") || value < 0) {
        error = "cost amount must be a positive integer";
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
    try {
      updatePreHarvestCostByIdApi(id, costId, formValues)
        .then((response) => {
          console.log(response);
          alert("Pre-Harvest Cost updated successfully!");
          onCancel();
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating Pre-Harvest Cost:", error);
          alert("Error updating Pre-Harvest Cost!");
        });
    } catch (error) {
      console.error("Error updating Pre-Harvest Cost:", error);
      alert("Error updating Pre-Harvest Cost!");
    }
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
          padding: "0 30px 30px 30px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <FormHeader
            title="Update Pre-Harvest Cost"
            subTitle="With Harvest Master"
            onCancel={onCancel}
          />
          <Grid container>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ marginTop: "1.25rem" }}
              >
                Cost Type
              </InputLabel>
              <Select
                type="text"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="type"
                label="Cost Type"
                value={formValues.type}
                onChange={handleChange}
                options={preHarvestCosts}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                }}
                style={{ width: "100%", marginTop: "5%" }}
              >
                {preHarvestCosts.map((dis, index) => (
                  <MenuItem key={index} value={dis}>
                    {dis}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControls.InputX
              required
              type="date"
              name="date"
              label="Cost Date"
              value={formValues.date}
              onChange={handleChange}
              style={{ width: "100%", marginTop: "5%" }}
            />
            <FormControls.InputX
              type="text"
              multiline
              name="description"
              label="Description"
              value={formValues.description}
              onChange={handleChange}
              style={{ width: "100%", marginTop: "5%" }}
            />
            <FormControls.InputAdornmentX
              required
              endAdornment="Rs."
              type="text"
              name="amount"
              label="Amount"
              value={formValues.amount}
              onChange={handleChange}
              style={{ width: "100%", marginTop: "5%" }}
              error={errors.amount}
              helperText={errors.amount}
            />
            <Grid container display="flex" justifyContent="center" gap={2}>
              <Button
                variant="contained"
                size="large"
                type="submit"
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
                onClick={onCancel}
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
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default UpdatePreHarvestCostForm;
