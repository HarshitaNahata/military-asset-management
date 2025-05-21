// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null, // { name, email, role, baseId, ... }
    currentBase: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user; // user object includes role, etc.
            state.currentBase = action.payload.user?.baseId || null;
        },
        logout: (state) => {
            state.user = null;
            state.currentBase = null;
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
