
import { createSlice } from '@reduxjs/toolkit';
import { addBid } from 'src/api/communitymarket';



const initialState = {
    stocks: [],
    filters: {
        search: '',
        category: '',
        sortBy: 'price',
        sortOrder: 'asc',
    },
    loading: false,
    error: null,
};

export const communityMarketSlice = createSlice({
    name: 'communitymarket',
    initialState,
reducers: {
    setStocks: (state, action) => {
        state.stocks = action.payload;
    },
    setFilters: (state, action) => {
        state.filters = action.payload;
    },
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
    setError: (state, action) => {
        state.error = action.payload;
    },
    addStock: (state, action) => {
        state.stocks.push(action.payload);
    },
    addStockBid: (state, action) => {
        const { stockId, ...bidData } = action.payload;
        const index = state.stocks.findIndex(
          (stock) => stock.ps_id === stockId
        );
        if (index !== -1) {
            state.stocks[index].bids.push(action.payload);
        }
    },
    updateStock: (state, action) => {
        const index = state.stocks.findIndex((stock) => stock.id === action.payload.id);
        if (index !== -1) {
            state.stocks[index] = action.payload;
        }
    },
    removeStock: (state, action) => {
        state.stocks = state.stocks.filter((stock) => stock.id !== action.payload);
    },
},



});


export const { setStocks, setFilters, setLoading, setError, addStock, updateStock, removeStock,addStockBid } = communityMarketSlice.actions;

export const selectCommunityMarket = (state) => state.communitymarket;

export default communityMarketSlice.reducer;