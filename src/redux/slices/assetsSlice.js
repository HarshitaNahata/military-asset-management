import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import assetService from '../../services/assets';

// Async thunks
export const fetchAssets = createAsyncThunk(
    'assets/fetchAssets',
    async (filters, { rejectWithValue }) => {
        try {
            const response = await assetService.getAssets(filters);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch assets');
        }
    }
);

export const fetchDashboardMetrics = createAsyncThunk(
    'assets/fetchDashboardMetrics',
    async (filters, { rejectWithValue }) => {
        try {
            const response = await assetService.getDashboardMetrics(filters);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch metrics');
        }
    }
);

export const recordPurchase = createAsyncThunk(
    'assets/recordPurchase',
    async (purchaseData, { rejectWithValue }) => {
        try {
            const response = await assetService.createPurchase(purchaseData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to record purchase');
        }
    }
);

export const recordTransfer = createAsyncThunk(
    'assets/recordTransfer',
    async (transferData, { rejectWithValue }) => {
        try {
            const response = await assetService.createTransfer(transferData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to record transfer');
        }
    }
);

export const recordAssignment = createAsyncThunk(
    'assets/recordAssignment',
    async (assignmentData, { rejectWithValue }) => {
        try {
            const response = await assetService.createAssignment(assignmentData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to record assignment');
        }
    }
);

export const recordExpenditure = createAsyncThunk(
    'assets/recordExpenditure',
    async (expenditureData, { rejectWithValue }) => {
        try {
            const response = await assetService.createExpenditure(expenditureData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to record expenditure');
        }
    }
);

const initialState = {
    assets: [],
    purchases: [],
    transfers: [],
    assignments: [],
    expenditures: [],
    dashboardMetrics: {
        openingBalance: 0,
        closingBalance: 0,
        netMovement: 0,
        assigned: 0,
        expended: 0,
        movementDetails: {
            purchases: 0,
            transferIn: 0,
            transferOut: 0
        }
    },
    loading: false,
    error: null
};

const assetsSlice = createSlice({
    name: 'assets',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Assets
            .addCase(fetchAssets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAssets.fulfilled, (state, action) => {
                state.loading = false;
                state.assets = action.payload;
            })
            .addCase(fetchAssets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Dashboard Metrics
            .addCase(fetchDashboardMetrics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardMetrics.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboardMetrics = action.payload;
            })
            .addCase(fetchDashboardMetrics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Record Purchase
            .addCase(recordPurchase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(recordPurchase.fulfilled, (state, action) => {
                state.loading = false;
                state.purchases = [action.payload, ...state.purchases];
            })
            .addCase(recordPurchase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Record Transfer
            .addCase(recordTransfer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(recordTransfer.fulfilled, (state, action) => {
                state.loading = false;
                state.transfers = [action.payload, ...state.transfers];
            })
            .addCase(recordTransfer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Record Assignment
            .addCase(recordAssignment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(recordAssignment.fulfilled, (state, action) => {
                state.loading = false;
                state.assignments = [action.payload, ...state.assignments];
            })
            .addCase(recordAssignment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Record Expenditure
            .addCase(recordExpenditure.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(recordExpenditure.fulfilled, (state, action) => {
                state.loading = false;
                state.expenditures = [action.payload, ...state.expenditures];
            })
            .addCase(recordExpenditure.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError } = assetsSlice.actions;
export default assetsSlice.reducer;
