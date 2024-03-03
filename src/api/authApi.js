const { Password } = require("@mui/icons-material");
const { default: axios } = require("axios");

const URL = "http://localhost:8080";


  export const login = async (userName, Password) => {
    

  const response = await axios.post(`${URL}/user/login`, { userName: userName, password: Password }); 
    
    return response.data;
}

