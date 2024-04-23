import axios from 'axios';

const URL = 'http://localhost:8080';

export const loadCartItemsApi = async () => {
    const cus_id = 1;
    const response = await axios.get(`${URL}/api/harvestMaster/cart/${cus_id}`)
    return response.data;
}

export const  addToCartApi = async (requestData) => {
    const response = await axios.post(`${URL}/api/harvestMaster/cart`, requestData)
    return response.data
}

export const deleteCartItemApi = async (cart_item_id) => {
    const responce = await axios.delete(`${URL}/api/harvestMaster/cart/${cart_item_id}`)
    return responce
}

export const addDiscountApi = async (discountDetails) => {
    const responce = await axios.post(`${URL}/api/harvestMaster/discount`, discountDetails)
    return responce
}