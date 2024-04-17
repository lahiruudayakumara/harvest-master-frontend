import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paddyStock: [],
};

export const paddyStockSlice = createSlice({
  name: "paddyStock",
  initialState,
  reducers: {
    setPaddyStocks: (state, action) => {
      state.paddyStock = action.payload;
    },
    addPaddyStock: (state, action) => {
      state.paddyStock.push(action.payload);
    },
    updatePaddyStock: (state, action) => {
      const index = state.paddyStock.findIndex(
        (stock) => stock.id === action.payload.id
      );
      if (index !== -1) {
        state.paddyStock[index] = action.payload;
      }
    },
    removePaddyStock: (state, action) => {
      state.paddyStock = state.paddyStock.filter(
        (stock) => stock.id !== action.payload
      );
    },
  },
});


export const { setPaddyStocks, addPaddyStock, updatePaddyStock, removePaddyStock } = paddyStockSlice.actions;
export default paddyStockSlice.reducer;
export const selectPaddyStock = (state) => state.paddyStock;