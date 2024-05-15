import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MenuItem, Select, TextField } from "@mui/material";
import {
  addPostHarvestAuditPlan,
  updatePostAuditPlanData,
  updatePostHarvestPlan,
} from "src/api/postHarvestApi";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostHarvest,
  updatePostHarvest,
} from "src/stores/slices/postharvestPlanSlice";
import { set } from "react-hook-form";
import {
  selectPostHarvestAudit,
  setAuditDataValues,
} from "src/stores/slices/postharvestAuditSlice";
import { selectPaddyStock } from "src/stores/slices/paddyStockSlice";
import Report from "src/components/postHarvest/post-plan-report";
import GeneratePDF from "src/components/postHarvest/post-plan-report";

const steps = [
  {
    label: "Assessment of Crop Maturity",
    description: `Assess the maturity of the paddy crop. Proper timing is crucial. `,
  },
  {
    label: "Harvesting Machinery Preparation",
    description:
      " Depending on the scale of the operation, cutting can be done manually using sickles or with mechanical harvesters. ",
  },

  {
    label: "Winnowing and Drying Process",
    description: " Drying to reduce the moisture content . ",
  },
  {
    label: "Storage and Selling of Paddy",
    description: `Paddy should be stored at dry state as much as possible in order to prevent crop damage.`,
  },
];

const PostHarvestTasks = () => {
  const dispatch = useDispatch();
  const { plandata } = useSelector(selectPostHarvest);
  const { auditData } = useSelector(selectPostHarvestAudit);
  const { paddyStock } = useSelector(selectPaddyStock);


  const date = plandata.harvestDate;
  const [harvestdate, setHarvestDate] = useState("");

  const [harvestType, setHarvestType] = useState("");
  const [showPDF, setShowPDF] = useState(false);

  const handleGeneratePDF = () => {
    setShowPDF(true);
  };

  const [auditdata, setAuditData] = useState({
    weight: 0,
    no_bags: 0,
  });

  useEffect(() => {
    if (plandata) {
      if (auditData.auditId != null) {
        setHarvestDate(plandata.harvestDate);
        setHarvestType(plandata.type);
        setAuditData({
          weight: auditData.weight,
          no_bags: auditData.no_bags,
        });

        if (plandata.harvestDate == "" || plandata.harvestDate == null) {
          return setActiveStep(0);
        }

        if (plandata.type == "" || plandata.type == null) {
          return setActiveStep(1);
        }
        if (auditData.weight == "" && auditData.no_bags == "") {
          return setActiveStep(2);
        }
        setActiveStep(3);
      }
    }
  }, [plandata,auditData]);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === 0) {
      addPostHarvestAudit(plandata.fieldId, harvestdate);
    }
    if (activeStep === 1) {
      console.log(harvestType);
      updatePostharvestType(plandata.fieldId, harvestType);
    }
    if (activeStep === 2) {
      updatePostAuditData(auditData.auditId, auditdata);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const addPostHarvestAudit = async (planId, harvestdate) => {
    const response = await addPostHarvestAuditPlan(planId, harvestdate);

    if (response.status === 200) {
      dispatch(updatePostHarvest(response.data.relatedpostHarvest));

      const newData = { ...response.data };
      delete newData.relatedpostHarvest;
      console.log(newData);
      dispatch(setAuditDataValues(newData));
      return console.log("Post Harvest Audit added successfully");
    } else {
      return console.log("Error adding Post Harvest Audit");
    }
  };

  const updatePostharvestType = async (planId, harvestType) => {
    const response = await updatePostHarvestPlan(planId, harvestType);

    if (response.status === 200) {
      dispatch(updatePostHarvest(response.data));
      return console.log("Post Harvest Type updated successfully");
    } else {
      return console.log("Error updating Post Harvest Type");
    }
  };

  const updatePostAuditData = async (auditId, updatedAudit) => {
    const response = await updatePostAuditPlanData(auditId, updatedAudit);

    if (response.status === 200) {
      dispatch(setAuditDataValues(response.data));
      return console.log("Post Harvest Audit updated successfully");
    } else {
      return console.log("Error updating Post Harvest Audit");
    }
  };

  const updateAuditData = (key, value) => {
    setAuditData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const maxValue = plandata.area * 2600;
  
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getOptionLabel = (index) => {
    switch (index) {
      case 3:
        return <Typography variant="caption">Last step</Typography>;
      default:
        return null;
    }
  };

  const getOptionContent = (index) => {
    switch (index) {
      case 0:
        return (
          <>
            <TextField
              variant="outlined"
              required
              size="small"
              type="date"
              label="Enter harvesting date"
              value={harvestdate}
              onChange={(e) => {
                setHarvestDate(e.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: getCurrentDate(), // Set minimum date to today
              }}
            ></TextField>

            <Box mt={2}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
                disabled={harvestdate === "" || harvestdate == null}
              >
                Confirm
              </Button>
            </Box>
          </>
        );
      case 1:
        return (
          <>
            <Select
              variant="outlined"
              size="small"
              sx={{ minWidth: 150 }}
              value={harvestType}
              onChange={(e) => {
                setHarvestType(e.target.value);
              }}
            >
              <MenuItem value="Machines">Machines</MenuItem>
              <MenuItem value="Sickels">Sickels</MenuItem>
            </Select>

            <Box mt={2}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
                disabled={harvestType != "Machines" && harvestType != "Sickels"}
              >
                Confirm
              </Button>
              <Button
                disabled={index === 0}
                onClick={handleBack}
                sx={{ mt: 1, mr: 1, borderWidth: 2 }}
                variant="outlined"
              >
                Back
              </Button>
            </Box>
          </>
        );
      case 2:
        return (
          <>
            {/* validated weight and no_bags inputs */}

            <TextField
              label="Weight after drying"
              size="small"
              type="text"
              sx={{ mb: 1.5 }}
              value={auditdata.weight}
              onChange={(e) => {
                const inputValue = e.target.value;

                if (
                  /^\d*$/.test(inputValue) &&
                  (inputValue === "" || parseInt(inputValue) <= maxValue)
                ) {
                  updateAuditData("weight", inputValue);
                  updateAuditData("no_bags", Math.ceil(inputValue / 50));
                }
              }}
            />
            <TextField
              label="Number of bags"
              size="small"
              type="number"
              value={auditdata.no_bags}
              disabled
              onChange={(e) => {
                const inputValue = e.target.value;
                // Check if the input value contains only numbers and does not exceed the maximum value
                if (
                  /^\d*$/.test(inputValue) &&
                  (inputValue === "" ||
                    parseInt(inputValue) <= Math.ceil(auditData.weight / 50))
                ) {
                  // Update the state only if the input is valid
                  updateAuditData("no_bags", inputValue);
                }
              }}
              inputProps={{
                max: maxValue, // Set your maximum value here
              }}
            />
            <Box mt={2}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
                disabled={auditdata.no_bags == 0 || auditdata.weight == 0}
              >
                Confirm
              </Button>
              <Button
                disabled={index === 0}
                onClick={handleBack}
                sx={{ mt: 1, mr: 1, borderWidth: 2 }}
                variant="outlined"
              >
                Back
              </Button>
            </Box>
          </>
        );
      case 3:
        return (
          <div>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 1, mr: 1 }}
            >
              {index === steps.length - 1 ? "Finish" : "Confirm"}
            </Button>
            <Button
              disabled={index === 0}
              onClick={handleBack}
              sx={{ mt: 1, mr: 1, borderWidth: 2 }}
              variant="outlined"
            >
              Back
            </Button>
          </div>
        );
      default:
        return null;
    }
  };
const theme = createTheme({
  palette: {
    primary: {
      main: "#2ca019", // Green color for buttons
    },
  },
  typography: {
    fontFamily: "Quicksand, sans-serif", // Set the default font
    fontWeightRegular: 500, // Set the font weight for regular text
    fontSize: 15, // Set the font size
  },
});

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel color="black" optional={getOptionLabel(index)}>
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography mb={2}>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>{getOptionContent(index)}</Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography marginTop={4}>
              All steps completed successfully
            </Typography>
            <Box display={"flex"} mt={5}>
              <Button
                onClick={handleBack}
                sx={{ mt: 1, mr: 1, borderWidth: 2 }}
                variant="outlined"
              >
                Go Back
              </Button>
              <React.Fragment>
                <Button
                  sx={{ mt: 1, mr: 1, borderWidth: 2 }}
                  variant="contained"
                  onClick={handleGeneratePDF}
                >
                  Generate Report
                </Button>
                {showPDF && (
                  <GeneratePDF
                    plandata={plandata}
                    imageData={paddyStock.image}
                    auditData={auditdata}
                    paddyStock={paddyStock}
                  />
                )}
              </React.Fragment>
            </Box>
          </Paper>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default PostHarvestTasks;
