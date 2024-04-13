import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalAmount: 0,
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            state.cartItems = action.payload;
        },

        addTotalAmount: (state, action) => {
            state.totalAmount = action.payload;
        }
    }
})

export const { addCartItem, addTotalAmount } = cartSlice.actions;
export const getAllCartItems = (state) => state.cart.cartItems;
export const getTotalAmount = (state) => state.cart.totalAmount;
export default cartSlice.reducer;
