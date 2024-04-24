/* eslint-disable react/prop-types */
import { useState } from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import FormHeader from "./FormHeader";
import FormControls from "./controls/FormControls";
import { preHarvestCosts } from "./service/Data";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { addPreHarvestCostApi } from "../../api/preHarvestApi";

const initialValues = {
  costId: 0,
  type: "",
  date: dayjs().format("YYYY-MM-DD"),
  description: "",
  amount: 0.0,
};

const PreHarvestCostForm = ({ onCancel, fieldId }) => {
  const [formValues, setFormValues] = useState(initialValues);

  const id = fieldId.fieldId;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      formData.append("type", formValues.type);
      formData.append("date", formValues.date);
      formData.append("description", formValues.description);
      formData.append("amount", formValues.amount);

      addPreHarvestCostApi(id, formData).then((response) => {
        console.log(response);
        setFormValues(initialValues);
        alert("Pre-Harvest Cost added successfully!");
        window.location.reload();
      });
    } catch (error) {
      console.error("Error adding Pre-Harvest Cost:", error);
      throw error;
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
        <form>
          <FormHeader
            title="New Pre-Harvest Cost"
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
              type="number"
              name="amount"
              label="Amount"
              value={formValues.amount}
              onChange={handleChange}
              style={{ width: "100%", marginTop: "5%" }}
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

export default PreHarvestCostForm;
