import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchRestaurants = createAsyncThunk('restaurants/fetchRestaurants', async (params, { rejectWithValue }) => {
  try {
    const response = await api.get('/restaurants', { params });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch restaurants');
  }
});

export const fetchRestaurant = createAsyncThunk('restaurants/fetchRestaurant', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch restaurant details');
  }
});

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState: {
    list: [],
    pagination: {},
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentRestaurant: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch List
      .addCase(fetchRestaurants.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data || action.payload;
        if (action.payload.current_page) {
          state.pagination = {
            current_page: action.payload.current_page,
            last_page: action.payload.last_page,
            total: action.payload.total,
          };
        }
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single
      .addCase(fetchRestaurant.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentRestaurant } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
