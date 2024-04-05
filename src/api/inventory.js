// Initial path: /api/inventory.js
import axios from "axios";

const URL = "http://localhost:8080";

export const getInventoryApi = async () => {
  const response = await axios.get(`${URL}/inventory/getAll`);
  return response.data;
};

export const addInventoryApi = async (formData) => {
  const response = await axios.post(`${URL}/inventory/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateInventoryApi = async (formData) => {
  const response = await axios.put(
    `${URL}/inventory/update/${formData.pid}`,
    formData
  );
  return response.data;
};

export const deleteProductApi = async (id) => {
  const response = await axios.delete(`${URL}/inventory/delete/${id}`);
  return response.data;
};
