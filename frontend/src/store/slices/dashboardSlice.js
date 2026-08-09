import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchSuperAdminDashboard = createAsyncThunk('dashboard/superAdmin', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/dashboard/super');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard');
  }
});

export const fetchRestaurantAdminDashboard = createAsyncThunk('dashboard/restaurantAdmin', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/dashboard/restaurant');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard');
  }
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: null,
    recentRestaurants: [],
    recentUsers: [],
    topDishes: [],
    restaurant: null, // For restaurant admin
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Super Admin
      .addCase(fetchSuperAdminDashboard.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchSuperAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.recentRestaurants = action.payload.recent_restaurants;
        state.recentUsers = action.payload.recent_users;
      })
      .addCase(fetchSuperAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Restaurant Admin
      .addCase(fetchRestaurantAdminDashboard.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchRestaurantAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.topDishes = action.payload.top_dishes;
        state.restaurant = action.payload.restaurant;
      })
      .addCase(fetchRestaurantAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default dashboardSlice.reducer;
