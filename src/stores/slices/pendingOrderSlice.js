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
            state.paymentVerify = action.payload.data;
            
        },

        fetchPendingApproval: (state, action) => {
            state.pendingApproval = action.payload.data;
            
        },

        addDeliveryDetails: (state, action) => {
            state.products.push(action.payload);
        },

        updateSchedule: (state, action) => {
            const index = state.delivery.findIndex(
              (delivery) => delivery.index === action.payload.index
            );
            if (index !== -1) {
              state.delivery[index] = action.payload;
            }
        },

        approvePendingOrder: (state, action) => {
            const index = state.pendingApproval.findIndex(
              (approve) => approve.delivery_id === action.payload.delivery_id
            );
            if (index !== -1) {
              state.pendingApproval[index] = action.payload;
            }
        },

        rejectDeliveryRequest: (state, action) => {
            state.delivery = state.delivery.filter(
              (delivery) => delivery.pid !== action.payload
            );
        },

    },
});

export const { fetchPaymentVerify, fetchPendingApproval, addDeliveryDetails, updateSchedule, approvePendingOrder, rejectDeliveryRequest } = pendingOrderSlice.actions;

export const selectVerifyPayment = (state) => state.pendingOrder.paymentVerify;
export const selectPendingApproval = (state) => state.pendingOrder.pendingApproval;
export const selectfilter = (state) => state.pendingOrder.filter;

export default pendingOrderSlice.reducer;