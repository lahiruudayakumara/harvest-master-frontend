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