import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';

const initialState = {
    draftPayments: [],
    payments: [],
    transaction: [],
    filter: {
        status: 'all',
        date: 'all',
        search: ''
    },
    loading: false,
    error: null,
};


export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        fetchPayment: (state, action) => {
            state.payments = action.payload;
        },

        fetchDraftPayment: (state, action) => {
            state.draftPayments = action.payload;
        },

        fetchTransaction: (state, action) => {
            state.transaction = action.payload.data;
        },

        addDraftPayment: (state, action) => {
            state.draftPayments.push(action.payload);
        },

        updateDraftPayment: (state, action) => {
            const index = state.payments.findIndex(payment => payment.id === action.payload.id);
            state.draftPayments[index] = action.payload;
        },

        deleteDraftPayment: (state, action) => {
            state.draftPayments = state.payments.filter(payment => payment.id !== action.payload);
        },

        filterPayment: (state, action) => {
            state.filter = action.payload;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const {
    fetchPayment,
    fetchDraftPayment,
    fetchTransaction,
    addDraftPayment,
    updateDraftPayment,
    deleteDraftPayment,
    filterPayment,
    setLoading,
    setError,
} = paymentSlice.actions;

export const selectDraftPayments = (state) => state.payments.draftPayments;
export const selectFilter = (state) => state.payments.filter;

export const selectFilteredDraftPayments = createSelector(
  [selectDraftPayments, selectFilter],
  (draftPayments, filter) => {
    return draftPayments.filter(payment => {

      if (filter.status !== 'all' && payment.status !== filter.status) {
        return false;
      }

      if (filter.date !== 'all' && payment.date !== filter.date) {
        return false;
      }

      if (filter.search && !payment.name.toLowerCase().includes(filter.search.toLowerCase())) {
        return false;
      }

      return true;
    });
  }
);
export default paymentSlice.reducer;