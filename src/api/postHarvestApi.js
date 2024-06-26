import axios from "axios";

const URL = "http://localhost:8080";

export const addPostHarvestPlan = async (planData, postalcode) => {
  const response = await axios.post(`${URL}/postharvest/add`, {
    fieldName: planData.regNumber,
    farmer: 1,
    regNo: planData.regNumber,
    paddyVareity: planData.riceVariety,
    area: parseInt(planData.fieldArea),
    ownership: planData.ownershipType,
    district: planData.district,
    location: planData.city,
    plantedDate: planData.plantingDate,
    split: planData.ownershipType,
    fertilizerType: planData.fertilizerType,
    zip: parseInt(planData.zip),
  });
  return response;
};

export const updatePostHarvestPlan = async (planId, updatedPlan) => {
  try {
    // Make a PATCH request to the server
    const response = await axios.put(`${URL}/postharvest/update/${planId}`, {
      type: updatedPlan,
    });

    // Return the updated PostHarvest object
    return response;
  } catch (error) {
    // Handle any errors
    console.error("Error updating PostHarvest:", error);
    throw error;
  }
};

export const updatePostHarvestPlanData = async (planId, plan) => {
  try {
    // Make a PATCH request to the server
    const response = await axios.put(`${URL}/postharvest/update/${planId}`, {
      fieldName: plan.regNo,
      regNo: plan.regNo,
      paddyVareity: plan.paddyVareity,
      area: plan.area,
      ownership: plan.ownership,
      district: plan.district,
      location: plan.location,
      plantedDate: plan.plantedDate,
      split: plan.split,
      fertilizerType: plan.fertilizerType,
      zip: plan.zip,
    });

    // Return the updated PostHarvest object
    return response;
  } catch (error) {
    // Handle any errors
    console.error("Error updating PostHarvest:", error);
    throw error;
  }
};

export const getAllPostHarvestPlans = async () => {
  const farmer_id = 1;
  const response = await axios.get(`${URL}/postharvest/all/${farmer_id}`);

  return response.data;
};

export const stockPrices = async (variety, fert) => {
  const response = await axios.post(`${URL}/paddystock/filtered-stocks`, {
    variety: variety,
    fert: fert,
  });

  return response.data;
};

export const getPostHarvestPlan = async (plan_id) => {
  const response = await axios.get(`${URL}/postharvest/get/${plan_id}`);

  return response.data;
};

export const deletePostHarvestPlan = async (plan_id) => {
  const response = await axios.delete(`${URL}/postharvest/delete/${plan_id}`);
  return response;
};

export const getAvailableBid = async (paddystock_id) => {
  const response = await axios.get(`${URL}/bid/getallbids/${paddystock_id}`);

  return response.data;
};

export const getPaddyStock = async (plan_id) => {
  const response = await axios.get(`${URL}/paddystock/get/${plan_id}`);

  return response.data;
};
//Weather api intrigration
export const getWeatherDetails = async (postal_code) => {
  const response = await axios.get(
    `${URL}/postharvest/v1/weather/forecast/${postal_code}`
  );

  return response.data;
};

export const addPaddyStock = async (auditId, paddyStock) => {
  const formData = new FormData();

  formData.append("image_data", paddyStock.imagefile);

  console.log(paddyStock);
  const response = await axios.post(
    `${URL}/paddystock/add/${auditId}`,
    formData,
    {
      params: {
        price: paddyStock.price,
        amount: paddyStock.amount,
        status: "ACTIVE",
      },
    }
  );
  return response.data;
};

export const updatePaddyStock = async (ps_id, paddyStock) => {
  const formData = new FormData();

  formData.append("image_data", paddyStock.imagefile);

  console.log(paddyStock);
  const response = await axios.patch(
    `${URL}/paddystock/update/${ps_id}`,
    formData,
    {
      params: {
        price: paddyStock.price,
        amount: paddyStock.amount,
        status: "ACTIVE",
      },
    }
  );
  return response.data;
};

export const addPostHarvestAuditPlan = async (postharvest_id, harvest_date) => {
  const response = await axios.post(`${URL}/postharvest/add-audit`, {
    harvestDate: harvest_date,
    postId: postharvest_id,
  });
  return response;
};

export const getPostHarvestAuditPlan = async (plan_id) => {
  const response = await axios.get(`${URL}/postharvest/get-audit/${plan_id}`);

  return response.data;
};

export const updatePostAuditPlanData = async (auditId, updatedAudit) => {
  try {
    console.log("audit", updatedAudit);
    // Make a PATCH request to the server
    const response = await axios.put(
      `${URL}/postharvest/update-audit/${auditId}`,

      updatedAudit
    );

    // Return the updated PostHarvestAudit object
    return response;
  } catch (error) {
    // Handle any errors
    console.error("Error updating PostHarvestAudit:", error);
    throw error;
  }
};

export const rejectBid = async (bid_id) => {
  axios
    .delete(`${URL}/bid/deletebid/${bid_id}`)
    .then((response) => {
      console.log("Item deleted successfully:");
      return response;
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
    });
};

export const acceptBid = async (stock_id, bid_id) => {
  const response = await axios.post(`${URL}/bid/accept-bid`, {
    stockId: stock_id,
    bidId: bid_id,
  });
  return response;
};

export const getsoldstock = async (stock_id) => {
  const response = await axios.get(`${URL}/bid/getsoldstock/${stock_id}`);

  return response.data;
};

export const deletePaddystock = async (stock_id) => {
  const response = await axios.delete(`${URL}/paddystock/delete/${stock_id}`);
  return response;
};
