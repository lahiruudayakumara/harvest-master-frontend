import axios from "axios";

const URL = 'http://localhost:8080';

//create delivery request from buyer
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

//read the pending orders(both tables in the pending order UI)
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

//edit the delivery schedule table
export const updateDeliverySchedule = async (formData) => {
    const response = await axios.put( `${URL}/api/delivery/update/${formData.deliveryId}`, formData);
    return response.data;
  };

//approve or delete the pending order
  export const managePendingOrder = async (deliveryId) => {
    const response = await axios.put(`${URL}/api/delivery/manage`, {delivery_id:deliveryId});
    return response.data;
  };
  
export const confirmDelivery = async (formData) => {
    const response = await axios.put( `${URL}/api/delivery/confirm/${formData.deliveryId}`, formData);
    return response.data;
  };

//read the log activity table
export const getLogActivity = async (filterData) => {
    const response = await axios.get(`${URL}/api/delivery/log`, filterData);
    return response.data;        
       
}


//get total count of pending orders and deliverd orders
export const getOrderCount = async () => {
    const response = await axios.get(`${URL}/api/delivery/total`);
    return response.data;
}