import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    pedingDeliver: [],
    deliveredItem: [],
    totalAmount: 0,
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            state.cartItems = action.payload;
        },

        addPendingDeliver: (state, action) => {
            state.pedingDeliver = action.payload.data;
        },

        adddeliveredItem: (state, action) => {
            state.deliveredItem = action.payload.data;
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

        removePendingPayment : (state, action) => {
            state.pedingDeliver = state.pedingDeliver.filter(
                (pedingDeliver) => pedingDeliver.delivery_id !== action.payload
            )
        }
    }
})

export const { addCartItem, addTotalAmount, updateQuantity, updateTotalAmount, addPendingDeliver, adddeliveredItem, removePendingPayment } = cartSlice.actions;
export const getAllCartItems = (state) => state.cart.cartItems;
export const getTotalAmount = (state) => state.cart.totalAmount;
export const getPendingDeliver = (state) => state.cart.pedingDeliver;
export const getDeliveredItem = (state) => state.cart.deliveredItem;
export default cartSlice.reducer;
