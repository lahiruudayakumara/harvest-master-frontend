// Initial path: /api/inventory.js
import axios from 'axios';


const URL = 'http://localhost:8080';


export const getInventory = async () => {
  const response = await axios.get(`${URL}/inventory/getAll`);
  return response.data;
} 

export const addInventory = async (formData) => {
  const response = await axios.post(`${URL}/inventory/add`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${URL}/inventory/delete/${id}`);
  return response.data;
};