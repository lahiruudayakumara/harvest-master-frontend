import axios from "axios";

const URL = "http://localhost:8080";

export const addSupportRequest = async (supportData) => {
    const response= await axios.post (`${URL}/support/add`, {
        topic : supportData.topic,
      issue: supportData.description,
        status: "Pending"
    
    })
}

export const getSupportRequests = async () => {
  const response = await axios.get(`${URL}/support/getall`);
  return response.data;
};