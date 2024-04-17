import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import FormHeader from "./FormHeader";
import FormControls from "./controls/FormControls";
import { fieldObservations } from "./service/Data";

const initialValues = {
  fieldObservationId: 0,
  ObservationType: "",
  ObservationDate: dayjs().format("YYYY-MM-DD"),
  AffectedArea: 0.0,
  fieldVisitDate: dayjs().format("YYYY-MM-DD"),
  fieldVisitTime: dayjs().format("HH:mm"),
  visited: false,
  requestStatus: "",
};

const FieldVisitRequestExpertSideForm = () => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div
      style={{
        width: "75%",
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
            <Grid item xs={6}>
              <FormControls.AutocompleteX
                readOnly
                name="fieldObservationId"
                type="text"
                label="Obsrvation Type"
                value={formValues.ObservationType}
                onChange={(event, newValue) => {
                  setFormValues({ ...formValues, ObservationType: newValue });
                }}
                options={fieldObservations}
                getOptionLabel={(option) => option?.name || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                style={{ width: "90%", marginTop: "2.5%" }}
              />
              <FormControls.InputX
                inputProps={{ readOnly: true }}
                type="date"
                name="ObservationDate"
                label="Observation Date"
                value={formValues.ObservationDate}
                onChange={handleChange}
                style={{ width: "90%", marginTop: "5%" }}
              />
              <FormControls.InputX
                inputProps={{ readOnly: true }}
                type="number"
                name="AffectedArea"
                label="Affected Area"
                value={formValues.AffectedArea}
                onChange={handleChange}
                style={{ width: "90%", marginTop: "5%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControls.InputX
                type="date"
                name="fieldVisitDate"
                label="Field Visit Date"
                value={formValues.fieldVisitDate}
                onChange={handleChange}
                style={{ width: "90%", marginTop: "2.5%" }}
              />
              <FormControls.InputX
                type="time"
                name="fieldVisitTime"
                label="Field Visit Time"
                value={formValues.fieldVisitTime}
                onChange={handleChange}
                style={{ width: "90%", marginTop: "5%" }}
              />
              <FormControls.CheckBoxX
                name="visited"
                label="Visited"
                value={formValues.visited}
                onChange={(e) => {
                  setFormValues({ ...formValues, visited: e.target.checked });
                }}
                style={{ width: "90%", marginTop: "20%" }}
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
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default FieldVisitRequestExpertSideForm;
