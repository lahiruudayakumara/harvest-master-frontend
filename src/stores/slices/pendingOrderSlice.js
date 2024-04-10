import { createSlice } from "@reduxjs/toolkit";


 const initialState = {
    paymentVerify: [],                //store data related to Pending Payment Verify table
    pendingApproval: [],              //store data related to Pending Order table
    filter: {
        status: "all",
        search: "",
    },
    loading: false,
    error: null,
};

export const pendingOrderSlice = createSlice({
    name: "pendingOrder",
    initialState,
    reducers: {
        fetchPaymentVerify: (state, action) => {
            state.paymentVerify = action.payload;
            
        },

        fetchPendingApproval: (state, action) => {
            state.pendingApproval = action.payload;
            
        },
    },
});

export const { fetchPaymentVerify, fetchPendingApproval } = pendingOrderSlice.actions;

export const selectVerifyPayment = (state) => state.pendingOrder.paymentVerify;
export const selectPendingApproval = (state) => state.pendingOrder.pendingApproval;
export const selectfilter = (state) => state.pendingOrder.filter;

export default pendingOrderSlice.reducer;