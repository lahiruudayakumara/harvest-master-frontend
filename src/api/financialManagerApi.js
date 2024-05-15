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

export const approvedPayment = async (id, status) => {
    const response = await axios.put(`${URL}/api/delivery/approved-payment`, {delivery_id: id, payment_status: status });
    return response;
}

export const transfer = async (token, amount) => {
    const response = await axios.post(`${URL}/api/payment/transfer`, {
        token: token,
        amount: amount,
    })
    return response
}

export const addRefund = async (data) => {
    const response = await axios.post(`${URL}/api/refunds/create`, data);
    return response;
}

export const pendingRefund = async (data) => {
    const response = await axios.post(`${URL}/api/refunds/status`, data);
    return response;
}

export const paymentTotal = async () => {
    const response = await axios.get(`${URL}/api/payment-info/total`);
    return response;
}