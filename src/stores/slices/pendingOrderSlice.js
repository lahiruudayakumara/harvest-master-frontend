import { createSlice } from "@reduxjs/toolkit";

export const pendingOrderSlice = createSlice({
    name: "pendingOrder",
    initialState: {
        orders: [],
    },
    reducers: {
        setPendingOrders: (state, action) => {
            state.orders = action.payload;
        },
    },
});

export const { setPendingOrders } = pendingOrderSlice.actions;

export const selectPendingOrders = (state) => state.pendingOrder;

export default pendingOrderSlice.reducer;