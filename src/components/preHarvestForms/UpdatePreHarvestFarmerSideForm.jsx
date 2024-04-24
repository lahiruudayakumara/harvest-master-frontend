/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import FormHeader from "./FormHeader";
import FormControls from "./controls/FormControls";
import { fieldObservations } from "./service/Data";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import {
  updateFieldVisitRequestByIdApi,
  getFieldVisitRequestByIdApi,
} from "../../api/preHarvestApi";

const initialValues = {
  fieldObservationId: 0,
  observationType: "",
  observationDate: dayjs().format("YYYY-MM-DD"),
  affectedArea: 0.0,
  fieldVisitDate: "",
  fieldVisitTime: "",
  visited: false,
  requestStatus: "",
};

const UpdateFieldVisitRequestFarmerSideForm = ({
  onCancel,
  fieldId,
  requestId,
}) => {
  const id = fieldId.fieldId;

  console.log(id);
  console.log(requestId);

  const [requestDetails, setRequestDetails] = useState([]);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const requests = await getFieldVisitRequestByIdApi(requestId);

        setRequestDetails(requests);
        console.log(requestDetails);
      } catch (error) {
        console.error("Error fetching request details", error);
      }
    };
    fetchRequestDetails();
  }, [requestId]);

  useEffect(() => {
    console.log(requestDetails);
  }, [requestDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestDetails({ ...requestDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPlan = {
        observationType: requestDetails.observationType,
        observationDate: requestDetails.observationDate,
        affectedArea: requestDetails.affectedArea,
      };
      await updateFieldVisitRequestByIdApi(id, requestId, updatedPlan);
      alert("Field visit request updated successfully");
      onCancel();
      window.location.reload();
    } catch (error) {
      console.error("Error updating field visit request", error);
    }
  };

  // reset button
  const [initialRequestDetails, setInitialRequestDetails] = useState(null);
  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const requests = await getFieldVisitRequestByIdApi(requestId);
        setRequestDetails(requests);
        setInitialRequestDetails(requests); // Set initial request details
      } catch (error) {
        console.error("Error fetching request details", error);
      }
    };
    fetchRequestDetails();
  }, [requestId]);
  const handleReset = (e) => {
    e.preventDefault();
    setRequestDetails(initialRequestDetails);
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
        {requestDetails.fieldObservationId != undefined ? (
          <form>
            <FormHeader
              title="Update Field Visit Request"
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
                  value={requestDetails.observationType}
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
                value={requestDetails.observationDate}
                onChange={handleChange}
                style={{ width: "100%", marginTop: "5%" }}
              />
              <FormControls.InputX
                type="number"
                name="affectedArea"
                label="Affected Area"
                value={requestDetails.affectedArea}
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
                  Update
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
        ) : null}
      </div>
    </div>
  );
};

export default UpdateFieldVisitRequestFarmerSideForm;
