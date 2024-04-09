import axios from 'axios';

const URL = 'http://localhost:8091';

const loadCartItem = async () => {
    const res = await axios.get(`${URL}/api/harvestMaster/cart/${cus_id}`)
    console.log(res.data)
    setCartItem(res.data)
}