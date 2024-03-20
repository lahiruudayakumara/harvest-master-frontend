import axios from "axios";

const URL = "http://localhost:8080";

export const addSupportRequest = async (supportData) => {
    const response= await axios.post (`${URL}/support/add`, {
        status : supportData.topic,
        issue : supportData.description
    
    })
}