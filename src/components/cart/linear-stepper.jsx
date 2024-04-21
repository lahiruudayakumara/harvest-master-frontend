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
import { useForm } from 'react-hook-form';
import FormProvider from '../hook-form/form-provider';
import { LoadingButton } from '@mui/lab';

const steps = ['Enter your Contact Details', 'Select Payment Option', 'Order Complete'];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [data, setData] = useState();

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     if (!stripe || !elements) return;

    //     const cardElement = elements.getElement(CardElement);
    //     const { token, error } = await stripe.createToken(cardElement);

    //     if (error) {
    //         setError(error.message);
    //     } else {
    //         fetch('/api/payment', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ token: token.id }),
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log(data);
    //                 // Handle response from backend
    //             })
    //             .catch(error => {
    //                 console.error('Error:', error);
    //                 // Handle error
    //             });
    //     }
    // };


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
        pickup_address: '',
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
        console.log(data);
        setData(data);
        handleNext();
        reset(defaultValues);
    });

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
                            <RHFTextField name="pickup_address" label="Pickup Address" hide style={{ display: 'none' }} />
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
                            <RHFTextField name="driver_name" label="Driver Name" />
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
                    </Fragment>
                )
            }
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    // if (isStepOptional(index)) {
                    //     labelProps.optional = (
                    //         <Typography variant="caption">Optional</Typography>
                    //     );
                    // }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps} >
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box >
    );
}
