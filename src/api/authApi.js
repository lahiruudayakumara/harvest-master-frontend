
import axios from "axios";

const URL = "http://localhost:8080";


export const loginApi = async (email, password) => {


  const response = await axios.post(`${URL}/api/user/login`, { email: email, password: password });

  return response;
}

