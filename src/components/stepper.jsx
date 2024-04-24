import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "Step 1: Ground Preparation",
    description: `Clear the field of any existing vegetation. Plow or till the soil to prepare a suitable seedbed for planting. Remove any rocks, debris, or large clods that could interfere with seedling growth.`,
  },
  {
    label: "Step 2: Seed Selection",
    description:
      "Choose high-quality seeds that are suitable for your soil and climate conditions. Select seeds that are certified and free from diseases or pests.",
  },
  {
    label: "Step 3: Seed Sowing",
    description: `Sow the seeds evenly across the prepared seedbed at the recommended depth and spacing. Ensure that the seeds are covered with a thin layer of soil.`,
  },
  {
    label: "Step 4: Irrigation",
    description: `Provide sufficient water for the seeds to germinate and establish into healthy plants. Monitor soil moisture levels and adjust irrigation practices accordingly.`,
  },
  {
    label: "Step 5: Fertilization",
    description: `Apply fertilizers to provide essential nutrients for the growth and development of the crop. Follow soil test recommendations and avoid over-fertilization.`,
  },
  {
    label: "Step 6: Weed Control",
    description: `Manage weeds to prevent competition for nutrients, water, and sunlight. Use cultural, mechanical, and chemical methods to control weeds.`,
  },
  {
    label: "Step 7: Pest and Disease Management",
    description: `Monitor the crop regularly and take appropriate measures to control pests and diseases. Use integrated pest management practices to minimize pesticide use.`,
  },
  {
    label: "Step 8: Crop Monitoring",
    description: `Regularly inspect the crop for growth progress, nutrient deficiencies, and other issues. Keep detailed records of crop development and management practices.`,
  },
];

export default function VerticalLinearStepper() {
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

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mt: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
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
        <Box sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 2 }}>
            Reset
          </Button>
        </Box>
      )}
    </Box>
  );
}
