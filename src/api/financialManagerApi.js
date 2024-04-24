import axios from "axios";

const URL = "http://localhost:8080";

export const getAllTranstractionDetails = async () => {
    const response = await axios.get(`${URL}/api/transaction/sucess-all`);
    return response.data;
}

export const sendTransactionDetails = async (data) => {
    const response = await axios.post(`${URL}/api/transaction/process`, data);
    return response.data;
}

export const getTransactionById = async (id) => {
    const response = await axios.get(`${URL}/api/transaction/get-transaction/${id}`);
    return response.data;
}

export const getLogActivityFinance = async () => {
    const response = await axios.get(`${URL}/api/payment-log-activity`);
    return response.data;
}

const draft = {
    "paymentStatus": "PENDING"
}

export const getDraftPayments = async () => {
    const response = await axios.post(`${URL}/api/payment-info/status`, draft);
    return response.data;
}

export const getVerifyPayments = async () => {
    const response = await axios.post(`${URL}/api/payment-info/status`, { paymentStatus: 'VERIFY'});
    return response;
}


export const createPayment = async (paymentInfo, paymentStatus) => {
const response = await axios.post(`${URL}/api/payment-info`,{ paymentInfo: paymentInfo, paymentStatus: paymentStatus });
    return response;
}

export const deletePayment = async (id) => {
    const response = await axios.delete(`${URL}/api/payment-info/${id}`);
    return response;
}

export const updatePayment = async (id, data) => {
    const response = await axios.put(`${URL}/api/payment-info/${id}`, data);
    return response;
}