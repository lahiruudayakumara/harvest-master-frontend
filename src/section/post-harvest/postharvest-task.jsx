import * as React from "react";
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

export default function PostHarvestTasks() {
  const [harvestdate, setHarvestDate] = React.useState("0");
  const [harvestType, setharvestType] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [bags, setBags] = React.useState("");

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
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
                disabled={harvestdate === "0"}
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
                setharvestType(e.target.value);
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
                disabled={
                  harvestType !== "Machines" && harvestType !== "Sickels"
                }
              >
                Confirm
              </Button>
            </Box>
          </>
        );
      case 2:
        return (
          <>
            
            {/* validated weight and bags inputs */}
            <TextField
              label="Weight after drying"
              size="small"
              type="number"
              sx={{ mb: 1.5 }}
              value={weight}
              onChange={(e) => {
                /^\d*$/.test(e.target.value) || e.target.value === ""
                  ? setWeight(e.target.value)
                  : null;
              }}
            ></TextField>
            <TextField
              label="Number of bags"
              size="small"
              type="number"
              value={bags}
              onChange={(e) => {
                /^\d*$/.test(e.target.value) || e.target.value === ""
                  ? setBags(e.target.value)
                  : null;
              }}
            ></TextField>
            <Box mt={2}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
                disabled={
                  harvestType !== "Machines" && harvestType !== "Sickels"
                }
              >
                Confirm
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
      fontWeightRegular: 500,
      fontSize: 15, // Set the fontWeight for bold text
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
              All steps completed - you&apos;re finished
            </Typography>
            <Button
              onClick={handleReset}
              variant="contained"
              sx={{ mt: 5, mr: 1, color: "white" }}
            >
              Generate Report
            </Button>
          </Paper>
        )}
      </Box>
    </ThemeProvider>
  );
}
