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

export const deletePreHarvestPlanApi = async (fieldId) => {
  try {
    const response = await axios.delete(
      `${URL}/preHarvestPlans/delete/${fieldId}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting PreHarvest:", error);
    throw error;
  }
};

export const addFieldVisitRequestApi = async (id, formData) => {
  const response = await axios.post(
    `${URL}/PreHarvestFieldVisits/add/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getAllFieldVisitRequestsApi = async (id) => {
  const response = await axios.get(`${URL}/PreHarvestFieldVisits/getAll/${id}`);
  return response.data;
};

export const getFieldVisitRequestByIdApi = async (id) => {
  const response = await axios.get(`${URL}/PreHarvestFieldVisits/get/${id}`);
  return response.data;
};

export const updateFieldVisitRequestByIdApi = async (
  id,
  reqId,
  updatedPlan
) => {
  try {
    const response = await axios.put(
      `${URL}/PreHarvestFieldVisits/update/${id}/${reqId}`,
      updatedPlan
    );
    return response;
  } catch (error) {
    console.error("Error updating Field Visit Request:", error);
    throw error;
  }
};

export const deleteFieldVisitRequestByIdApi = async (reqId) => {
  try {
    const response = await axios.delete(
      `${URL}/PreHarvestFieldVisits/delete/${reqId}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting Field Visit Request:", error);
    throw error;
  }
};

export const addPreHarvestCostApi = async (id, formData) => {
  const response = await axios.post(
    `${URL}/preHarvestCosts/add/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getAllPreHarvestCostsApi = async (id) => {
  const response = await axios.get(`${URL}/preHarvestCosts/getAll/${id}`);
  return response.data;
};

export const getPreHarvestCostByIdApi = async (id) => {
  const response = await axios.get(`${URL}/preHarvestCosts/get/${id}`);
  return response.data;
};

export const updatePreHarvestCostByIdApi = async (id, costId, updatedPlan) => {
  try {
    const response = await axios.put(
      `${URL}/preHarvestCosts/update/${id}/${costId}`,
      updatedPlan
    );
    return response;
  } catch (error) {
    console.error("Error updating PreHarvest Cost:", error);
    throw error;
  }
};

export const deletePreHarvestCostByIdApi = async (costId) => {
  try {
    const response = await axios.delete(
      `${URL}/preHarvestCosts/delete/${costId}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting PreHarvest Cost:", error);
    throw error;
  }
};

export const getAllDistrictsApi = async (id) => {
  const response = await axios.get(`${URL}/location/getAllDistricts/${id}`);
  return response.data;
};

export const getAllCitiesApi = async (id) => {
  const response = await axios.get(`${URL}/location/getAllCities/${id}`);
  return response.data;
};
