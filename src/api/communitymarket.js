import axios from "axios";

const URL = "http://localhost:8080";

export const addBid = async (ps_id, bid) => {
  const response = await axios.post(`${URL}/bid/add`, {
    price: bid.price,
    stockid: bid.stockid,
    status: "PENDING",
    stockid: ps_id,
  });
  return response;
};

export const getAllPaddyStocks = async () => {
  const response = await axios.get(`${URL}/paddystock/all`);

  return response.data;
};

export const getAllBidsPerBuyer = async (buyer) => {
  if (buyer === "") {
    buyer = "testuser";
  }

  const response = await axios.get(`${URL}/bid/getAllStocksBuyer/${buyer}`);

  return response.data;
};

export const getAllSoldStocksPerBuyer = async (buyer) => {
  if (buyer === "") {
    buyer = "testuser";
  }

  const response = await axios.get(`${URL}/bid/getsoldstockbybuyer/${buyer}`);

  return response.data;
};

export const updateSoldStock = async (id, location) => {
  try {
    const response = await axios.patch(`${URL}/bid/updatesoldstock/${id}`, {
      pickuplocation: location
    });
    // Return the updated PostHarvestAudit object
    return response;
  } catch (error) {
    // Handle any errors
    console.error("Error updating PostHarvestAudit:", error);
    throw error;
  }
};
