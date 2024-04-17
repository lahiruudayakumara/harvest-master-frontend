import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '@mui/material/Button';
import axios from 'axios';

const StripeCardElement = ({ handleNext }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            // setError(error.message);
        } else {
            axios.post('http://localhost:8080/api/payment/transfer', {
                token: token.id,
                amount: 100,
            })
                // .then(response => response.json())
                .then(data => {
                    console.log(data);
                    handleNext();
                    // Handle response from backend
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
            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '20px', marginBottom: '20px', backgroundColor: '#2CA019' }}
            >
                Pay
            </Button>
        </form>
    );
};

export default StripeCardElement;
