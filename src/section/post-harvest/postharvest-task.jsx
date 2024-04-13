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

const steps = [
  {
    label: "Assessment of Crop Maturity",
    description: `Assess the maturity of the paddy crop. Proper timing is crucial for maximizing yield and quality. `,
  },
  {
    label: "Harvesting Machinery Preparation",
    description:
      " Depending on the scale of the operation, cutting can be done manually using sickles or with mechanical harvesters. ",
  },

  {
    label: "Winnowing and Drying Process",
    description:
      "Once the grains are separated, they need to be dried to reduce the moisture content to a safe level for storage. ",
  },
  {
    label: "Storage and Selling of Paddy",
    description: `Paddy should be stored at dry state as much as possible in order to prevent crop damage.`,
  },
];

export default function PostHarvestTasks() {
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
    
    const theme = createTheme({
      palette: {
        primary: {
          main: "#2ca019", // Green color for buttons
        },
      },
      typography: {
        fontWeightRegular: 500,
        fontSize: 16, // Set the fontWeight for bold text
      },
    });


    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ maxWidth: 400 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                    <StepLabel
                        color="black"
                  optional={
                    index === 3 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? "Finish" : "Continue"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                                    sx={{ mt: 1, mr: 1,borderWidth: 2}}
                                    variant="outlined"
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography marginTop={4}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset}  variant="contained"  sx={{ mt: 5, mr: 1 ,color:"white"}} >
                Generate Report
              </Button>
            </Paper>
          )}
        </Box>
      </ThemeProvider>
    );
}
