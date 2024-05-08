import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
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

const steps = ['Enter your Contact Details', 'Select Payment Option', 'Order Complete'];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [data, setData] = useState();
    const [selectCard, setSelectCard] = useState(true);
    const [slectSlip, setSlip] = useState(false)
    const [image, setImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState(false);


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

    console.log(image);

    const handleSubmitAndNext = () => {
        addOrderDelivery(data).then((info) => {
            console.log(info.data.deliveryId)
            sendTransactionDetails(
                {
                    "paymentMethod": "SLIP",
                    "bank_slip_image": image,
                    "deliveryId": info.data.deliveryId,
                    "pricePerUnit": 15.99,
                    "quantity": 10,
                    "totalPrice": 159.90,
                    "transactionDate": "2024-04-19T10:30:00",
                    "buyerId": 1,
                    "inventoryId": 1
                }
            );
            handleNext();
        });
    }


    return (
        <Box sx={{ width: '100%' }}>
            {activeStep === steps.length && (
                <Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Button variant="outlined">
                        Complete Order
                    </Button>
                </Fragment>
            )}
            {activeStep === 0 && (
                <FormProvider methods={methods} onSubmit={onSubmit}>
                    {errorMsg && <Alert severity="error" sx={{
                        marginBottom: 2
                    }}>Please fill all the fields</Alert>}
                    {activeStep === 0 && (
                        <Fragment>
                            <Box
                                rowGap={3}
                                marginBottom={3}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: 'repeat(1, 1fr)',
                                }}
                            >
                                <RHFTextField name="delivery_address" label="Delivery Address" />
                            </Box>
                            <Box
                                rowGap={3}
                                columnGap={2}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: 'repeat(1, 1fr)',
                                    sm: 'repeat(2, 1fr)',
                                }}
                            >
                                <RHFTextField name="driver_name" label="Driver Name" validation={{ pattern: /^[A-Za-z]+$/i }} />
                                <RHFTextField name="driver_id" label="Driver Id" />
                                <RHFTextField name="vehicle_number" label="Vehicle Number" />
                                <RHFTextField name="delivery_date" label="Delivery Date" defaultValue={formattedDate} disabled />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <LoadingButton
                                    style={{ color: '#2CA019' }}
                                    type="submit"
                                    loading={isSubmitting}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </LoadingButton>
                            </Box>
                        </Fragment>
                    )}
                </FormProvider>

            )
            }
            {
                activeStep === 1 && (
                    <Fragment>
                        <Alert severity="info" sx={{ marginBottom: 2 }}>Select Payment Option</Alert>
                        <Box sx={{ display: 'flex', alignContent: 'center' }}>
                            <Box margin={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox checked={selectCard} onChange={handleCard} defaultChecked />
                                <Typography>Pay with Cash</Typography>
                            </Box>
                            <Box margin={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox checked={slectSlip} onChange={handleSlip} />
                                <Typography>Bank Slip Upload</Typography>
                            </Box>
                        </Box>
                        {selectCard ?
                            (
                                <Box margin={2}>
                                    <Typography marginBottom={3}>Enter Payment Details</Typography>
                                    <StripeCardElement amount={1000} handleBack={handleBack} handleNext={handleNext} deliveryInfo={data} />
                                    <Button
                                        style={{ color: '#2CA019' }}
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </Box>
                            ) : (
                                <Box>
                                    <Button
                                        style={{ color: '#2CA019' }}
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        style={{ color: '#2CA019' }}
                                        onClick={handleSubmitAndNext}
                                    >
                                        Submit
                                    </Button>
                                    <Input
                                        type="file"
                                        onChange={handleImageChange}
                                        inputProps={{ accept: 'image/*' }}
                                        style={{ display: 'none' }}
                                        id="image-upload-input"
                                    />
                                    <label htmlFor="image-upload-input">
                                        <Button type='button' component="span" variant="outlined" startIcon={<CloudUploadOutlinedIcon />}>
                                            Bank Slip Upload
                                        </Button>
                                    </label>
                                    <Box paddingY={3}>
                                        {image && (
                                            <div>
                                                <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                                            </div>
                                        )}
                                    </Box>
                                </Box>
                            )}

                    </Fragment>
                )
            }
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps} >
                            <StepLabel {...labelProps} >{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box >
    );
}
