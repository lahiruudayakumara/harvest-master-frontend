import axios from 'axios';

const URL = 'http://localhost:8080';

export const loadCartItemsApi = async () => {
    const cus_id = 1;
    const response = await axios.get(`${URL}/api/harvestMaster/cart/${cus_id}`)
    return response.data;
}

export const deleteCartItem = async (cart_item_id) => {
    const responce = await axios.delete(`${URL}/api/harvestMaster/cart/${cart_item_id}`)
    return responce
}