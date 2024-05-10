import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '@mui/material/Button';
import axios from 'axios';
import { addOrderDelivery } from 'src/api/logisticHandlerApi';
import { sendTransactionDetails, transfer } from 'src/api/financialManagerApi';
import { Box, Typography } from '@mui/material';

const StripeCardElement = ({ amount, handleNext, deliveryInfo }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { token, error } = await stripe.createToken(cardElement);

        const combinedData = {
            ...deliveryInfo, delivery_items: [
                {
                    delivery_id: 1,
                    p_id: 2,
                }
            ]
        };
    
        const currentDate = new Date();

        if (error) {
            // setError(error.message);
        } else {
            transfer(token.id, amount)
               // .then(response => response.json())
                .then(data => {
                    const combinedData = {
                        ...deliveryInfo, delivery_items: [
                            {
                                delivery_id: 1,
                                p_id: 2,
                            }
                        ]
                    };
                    console.log(combinedData);
                    addOrderDelivery(combinedData).then((info) => {
                        console.log(data.data);
                        console.log(info.data.deliveryId)
                        sendTransactionDetails(
                            {
                                "paymentMethod": "CARD",
                                "paymentSuccessCode": data.data,
                                "pricePerUnit": 15.99,
                                "quantity": 10,
                                "totalPrice": amount,
                                "transactionDate": currentDate,
                                "buyerId": 1,
                                "deliveryId": info.data.deliveryId,
                                "inventoryId": 1
                            }
                        )

                    });
                    handleNext();
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle error
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Total Amount : Rs.{amount}</Typography>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '20px', marginBottom: '20px', backgroundColor: '#2CA019' }}
                >
                    Pay
                </Button>
            </Box>
        </form>
    );
};

export default StripeCardElement;
