import axios from "axios";

const URL = "http://localhost:8080";



export const getCurrentWeatherDetails = async (postal_code) => {
  const response = await axios.get(
    `${URL}/postharvest/v1/weather/current/${postal_code}`
  );

  return response.data;
}