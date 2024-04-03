// authSlice.js
import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('userDetails')),
    token: localStorage.getItem('token'),
    userRole: localStorage.getItem('userRole'),                             
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userDetails', action.payload.user);
      localStorage.setItem('userRole', action.payload.userRole);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userDetails');
      localStorage.removeItem('userRole');
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
