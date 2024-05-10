import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { RHFTextField } from '../hook-form';
import StripeCardElement from '../stripe-card-element/stripe-card-element';
import { set, useForm } from 'react-hook-form';
import FormProvider from '../hook-form/form-provider';
import { LoadingButton } from '@mui/lab';
import { Alert, Checkbox, IconButton, Input } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { addOrderDelivery } from 'src/api/logisticHandlerApi';
import { sendTransactionDetails } from 'src/api/financialManagerApi';
import { validateAddress, validateDriverId, validateVehicleNumber, validationName } from 'src/utilities/inputValidations';
import { useSelector } from 'react-redux';
import { getAllCartItems, getTotalAmount } from 'src/stores/slices/cartSlice';
import packageImg  from 'src/assets/icons/package-delivery.svg';

const steps = ['Enter your Contact Details', 'Select Payment Option', 'Order Complete'];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [data, setData] = useState();
    const [selectCard, setSelectCard] = useState(true);
    const [slectSlip, setSlip] = useState(false)
    const [image, setImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState(false);
    const cartItems = useSelector(getAllCartItems)
    const totalAmount = useSelector(getTotalAmount)
    console.log(totalAmount);

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const formattedDate = new Date().toISOString().slice(0, 10);

    const defaultValues = {
        customer_name: '',
        delivery_date: formattedDate,
        delivery_address: '',
        driver_name: '',
        driver_id: '',
        vehicle_number: '',

    }

    const methods = useForm({
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        if (data.delivery_date === '' || data.delivery_address === '' || data.driver_name === '' || data.driver_id === '' || data.vehicle_number === '') {
            setErrorMsg(true);
            return;
        } else {
            setErrorMsg(false);
        }
        console.log(data);
        setData(data);
        handleNext();
        reset(defaultValues);
    });

    const handleCard = () => {
        setSelectCard(true);
        setSlip(false);
    };

    const handleSlip = () => {
        setSelectCard(false);
        setSlip(true);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
                console.log(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const currentDate = new Date();

    const handleSubmitAndNext = () => {
        const combinedData = {
            ...data, delivery_items: [
                {
                    delivery_id: 1,
                    p_id: 2,
                }
            ]
        };
        addOrderDelivery(combinedData).then((info) => {
            console.log(info.data.deliveryId)
            sendTransactionDetails(
                {
                    "paymentMethod": "SLIP",
                    "bank_slip_image": image,
                    "deliveryId": info.data.deliveryId,
                    "pricePerUnit": 15.99,
                    "quantity": 10,
                    "totalPrice": totalAmount,
                    "transactionDate": currentDate,
                    "buyerId": 1,
                    "inventoryId": 1,
                }
            );
            handleNext();
        });
    }

    return (
      <Box sx={{ width: "100%" }}>
        {activeStep === steps.length && (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button variant="outlined">Complete Order</Button>
          </Fragment>
        )}
        {activeStep === 0 && (
          <FormProvider methods={methods} onSubmit={onSubmit}>
            {errorMsg && (
              <Alert
                severity="error"
                sx={{
                  marginBottom: 2,
                }}
              >
                Please fill all the fields
              </Alert>
            )}
            {activeStep === 0 && (
              <Fragment>
                <Box
                  rowGap={3}
                  marginBottom={3}
                  display="grid"
                  gridTemplateColumns={{
                    xs: "repeat(1, 1fr)",
                  }}
                >
                  <RHFTextField
                    name="delivery_address"
                    label="Delivery Address"
                    onChange={validateAddress}
                  />
                </Box>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  }}
                >
                  <RHFTextField
                    name="driver_name"
                    label="Driver Name"
                    onChange={validationName}
                    validation={{ pattern: /^[A-Za-z\s]+$/i }}
                  />
                  <RHFTextField name="driver_id" label="Driver Id" />
                  <RHFTextField name="vehicle_number" label="Vehicle Number" />
                  <RHFTextField
                    name="delivery_date"
                    label="Delivery Date"
                    defaultValue={formattedDate}
                    disabled
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <LoadingButton
                    style={{ color: "#2CA019" }}
                    type="submit"
                    loading={isSubmitting}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </LoadingButton>
                </Box>
              </Fragment>
            )}
          </FormProvider>
        )}
        {activeStep === 1 && (
          <Fragment>
            <Alert
              variant="outlined"
              severity="info"
              sx={{
                mb: 3,
                borderColor: "#2CA019",
                color: "#2CA019",
                "& .MuiAlert-icon": {
                  color: "#2CA019",
                },
              }}
            >
              Select Payment Method (Card or Bank Slip)
            </Alert>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Box margin={2} sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={selectCard}
                  onChange={handleCard}
                  defaultChecked
                  style={{ color: "#2CA019" }}
                />
                <Typography>Pay with Cash</Typography>
              </Box>
              <Box margin={2} sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={slectSlip}
                  style={{ color: "#2CA019" }}
                  onChange={handleSlip}
                />
                <Typography>Bank Slip Upload</Typography>
              </Box>
            </Box>
            {selectCard ? (
              <Box margin={2}>
                <StripeCardElement
                  amount={totalAmount}
                  handleBack={handleBack}
                  handleNext={handleNext}
                  deliveryInfo={data}
                />
                <Button
                  style={{ color: "#2CA019" }}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>
              </Box>
            ) : (
              <Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography>Total Amount : Rs.{totalAmount}</Typography>
                  <Input
                    type="file"
                    onChange={handleImageChange}
                    inputProps={{ accept: "image/*" }}
                    style={{ display: "none" }}
                    id="image-upload-input"
                  />
                  <label htmlFor="image-upload-input">
                    <Button
                      type="button"
                      component="span"
                      variant="outlined"
                      sx={{
                        borderColor: "#2CA019",
                        color: "#2CA019",
                        "& .MuiAlert-icon": {
                          color: "#2CA019",
                        },
                        "&:hover": {
                          borderColor: "rgba(44, 160, 25, 0.75)", // 75% opacity of the color on hover
                        },
                      }}
                      startIcon={<CloudUploadOutlinedIcon />}
                      width="100%"
                    >
                      Upload Bank Slip
                    </Button>
                  </label>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  {image && (
                    <div>
                      <img
                        src={image}
                        alt="Uploaded"
                        style={{ maxWidth: "100%", maxHeight: "200px" }}
                      />
                    </div>
                  )}
                </Box>
                <Box
                  paddingY={3}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    style={{ color: "#2CA019" }}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>

                  <Button
                    style={{ color: "#2CA019" }}
                    onClick={handleSubmitAndNext}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            )}
          </Fragment>
        )}
        {activeStep === 2 && (
          <>
            <Box
              margin={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={packageImg}
                alt="package"
                style={{ width: "100%", height: "120px" }}
              />
              <Typography margin={2}>
                All steps completed - you're finished
              </Typography>
            </Box>
          </>
        )}
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel
                  {...labelProps}
                  StepIconProps={{
                    style: {
                      color: index <= activeStep ? "#2CA019" : "#CCCCCC", // Color previous steps up to active step with active color
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    );
}
