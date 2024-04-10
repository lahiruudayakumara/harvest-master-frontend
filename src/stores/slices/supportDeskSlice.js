import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    requests: [],
    loading: false,
    error: null,
    };


export const supportDeskSlice = createSlice({
  name: "support",
 initialState,
  reducers: {
    setRequests: (state, action) => {
      state.requests = action.payload;
    },

    addRequest: (state, action) => {
      state.requests.push(action.payload);
    },
    updateRequest: (state, action) => {
      const index = state.requests.findIndex(
        (request) => request.id === action.payload.id
      );
      if (index !== -1) {
        state.requests[index] = action.payload;
      }
    },
    removeRequest: (state, action) => {
      state.requests = state.requests.filter(
        (request) => request.id !== action.payload
      );
    },
  },
});

export const { setRequests, setLoading, setError, addRequest, updateRequest, removeRequest } = supportDeskSlice.actions;
export const selectsupport = (state) => state.support;
export default supportDeskSlice.reducer;