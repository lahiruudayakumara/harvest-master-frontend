import axios from 'axios';

const URL = 'http://localhost:8091';

export const loadCartItem = async () => {
    const response = await axios.get(`${URL}/api/harvestMaster/cart/${cus_id}`)
    console.log(response.data)
    setCartItem(response.data)
}

export const deleteCartItem = async (cart_item_id) => {
    const responce = await axios.delete(`${URL}/api/harvestMaster/cart/${cart_item_id}`)
    return responce
}