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
        },

        updateQuantity: (state, action) => {
            const index = state.cartItems.findIndex(
              (cartItem) => cartItem.cartItemId === action.payload.cartItemId
            );

            if (index !== -1) {
              state.cartItems[index] = action.payload;
            }
        },

        updateTotalAmount: (state, action) => {
            state.totalAmount += action.payload; 
        },
    }
})

export const { addCartItem, addTotalAmount, updateQuantity, updateTotalAmount } = cartSlice.actions;
export const getAllCartItems = (state) => state.cart.cartItems;
export const getTotalAmount = (state) => state.cart.totalAmount;
export default cartSlice.reducer;
