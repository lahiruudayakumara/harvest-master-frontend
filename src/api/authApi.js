
import  axios  from "axios";

const URL = "http://localhost:8080";


  export const login = async (email, password) => {
    

  const response = await axios.post(`${URL}/user/login`, { email:email, password: password }); 
    
    return response;
}

