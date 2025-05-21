// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    role: 'guest', // 'admin', 'commander', 'logistics'
    currentBase: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.currentBase = action.payload.baseId;
        },
        logout: (state) => {
            state.user = null;
            state.role = 'guest';
            state.currentBase = null;
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
