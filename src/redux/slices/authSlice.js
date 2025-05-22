// redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunk for login action
export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/login', credentials);

            // Store token in local storage for persistence
            localStorage.setItem('token', response.data.token);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

const initialState = {
    user: null, // { name, email, role, baseId, ... }
    currentBase: null,
    loading: false,
    error: null
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
            // Remove token from localStorage
            localStorage.removeItem('token');

            state.user = null;
            state.currentBase = null;
        },
        setCurrentBase: (state, action) => {
            state.currentBase = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.currentBase = action.payload.user?.baseId || null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout, setCurrentBase } = authSlice.actions;
export default authSlice.reducer;