import axios from "axios";

const URL = 'http://localhost:8080';

const data = [
    {
        "order_Status": "APRROVED",
        "payment_status": "APRROVED"
    }
];

export const getPendingOrders = async () => {
    try {
        const response = await axios.post(`${URL}/api/delivery/get/pending`, data);
        return response.data;
    } catch (error) {
        // Handle error
        console.error("Error fetching pending orders:", error);
        throw error; // Rethrow the error to be caught by the caller
    }
}


