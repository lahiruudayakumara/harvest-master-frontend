// store.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminNavSlice';

const Reducer = combineReducers({
    auth: authReducer,
    nav: adminReducer,
});

export default Reducer;

