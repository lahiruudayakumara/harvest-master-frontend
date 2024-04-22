import axios from "axios";

const URL = "http://localhost:8080";

export const addPreHarvestApi = async (formData) => {
  const response = await axios.post(`${URL}/preHarvestPlans/add`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getAllPreHarvestPlansApi = async () => {
  const farmer_id = 0;
  const response = await axios.get(
    `${URL}/preHarvestPlans/getAll/${farmer_id}`
  );
  return response.data;
};

export const getPreHarvestPlanByIdApi = async (fieldId) => {
  const response = await axios.get(`${URL}/preHarvestPlans/get/${fieldId}`);
  return response.data;
};

export const updatePreHarvestPlanApi = async (fieldId, updatedPlan) => {
  try {
    const response = await axios.put(
      `${URL}/preHarvestPlans/update/${fieldId}`,
      updatedPlan
    );
    return response;
  } catch (error) {
    console.error("Error updating PreHarvest:", error);
    throw error;
  }
};
