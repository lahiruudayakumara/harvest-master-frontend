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
  const response = await axios.get(`${URL}/paddystock/all`, {});

  return response.data;
};
