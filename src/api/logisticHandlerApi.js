import axios from "axios";

const URL = 'http://localhost:8080';

export const getPendingOrders = async (filterData) => {
    try {
        const response = await axios.post(`${URL}/api/delivery/get/pending`, filterData);
        return response.data;
    } catch (error) {
        // Handle error
        console.error("Error fetching pending orders:", error);
        throw error; // Rethrow the error to be caught by the caller
    }
}


export const addOrderDelivery = async (formData) => {
    try {
        const response = await axios.post(`${URL}/api/delivery/create`, formData);
        return response.data;
    } catch (error) {
        // Handle error
        console.error("Error creating order:", error);
        throw error; // Rethrow the error to be caught by the caller
    }
}




