import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import FormHeader from "./FormHeader";
import FormControls from "./controls/FormControls";
import { fieldObservations } from "./service/Data";

const initialValues = {
  fieldObservationId: 0,
  observationType: "",
  observationDate: dayjs().format("YYYY-MM-DD"),
  affectedArea: 0.0,
  fieldVisitDate: dayjs().format("YYYY-MM-DD"),
  fieldVisitTime: dayjs().format("HH:mm"),
  visited: false,
  requestStatus: "",
};

const FieldVisitRequestFarmerSideForm = () => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.25)",
          padding: "0 30px 30px 30px",
        }}
      >
        <form>
          <FormHeader
            title="New Field Visit Request"
            subTitle="With Harvest Master"
          />
          <Grid container>
            <FormControls.AutocompleteX
              name="observationType"
              type="text"
              label="Obsrvation Type"
              value={formValues.observationType}
              onChange={(event, newValue) => {
                setFormValues({ ...formValues, observationType: newValue });
              }}
              options={fieldObservations}
              getOptionLabel={(option) => option?.name || ""}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              style={{ width: "100%", marginTop: "2.5%" }}
            />
            <FormControls.InputX
              type="date"
              name="observationDate"
              label="Observation Date"
              value={formValues.observationDate}
              onChange={handleChange}
              style={{ width: "100%", marginTop: "5%" }}
            />
            <FormControls.InputX
              type="number"
              name="affectedArea"
              label="Affected Area"
              value={formValues.affectedArea}
              onChange={handleChange}
              style={{ width: "100%", marginTop: "5%" }}
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

export default FieldVisitRequestFarmerSideForm;
