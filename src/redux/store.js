// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        // Add other reducers here as your app grows
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
