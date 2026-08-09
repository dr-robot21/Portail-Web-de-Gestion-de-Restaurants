import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchDishes = createAsyncThunk('dishes/fetchDishes', async (params, { rejectWithValue }) => {
  try {
    const response = await api.get('/dishes', { params });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch dishes');
  }
});

export const addDish = createAsyncThunk('dishes/addDish', async (dishData, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    Object.keys(dishData).forEach(key => {
      if (dishData[key] !== null && dishData[key] !== undefined) {
        if (key === 'allergens') {
          const allergens = Array.isArray(dishData[key]) ? dishData[key] : [];
          allergens.forEach((allergen, index) => {
            formData.append(`allergens[${index}]`, allergen);
          });
        } else if (typeof dishData[key] === 'boolean') {
          formData.append(key, dishData[key] ? '1' : '0');
        } else {
          formData.append(key, dishData[key]);
        }
      }
    });

    const response = await api.post('/dishes', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.errors || error.response?.data?.message || 'Failed to add dish');
  }
});

export const updateDish = createAsyncThunk('dishes/updateDish', async ({ id, dishData }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    Object.keys(dishData).forEach(key => {
      if (dishData[key] !== null && dishData[key] !== undefined) {
        if (key === 'allergens') {
          const allergens = Array.isArray(dishData[key]) ? dishData[key] : [];
          allergens.forEach((allergen, index) => {
            formData.append(`allergens[${index}]`, allergen);
          });
        } else if (typeof dishData[key] === 'boolean') {
          formData.append(key, dishData[key] ? '1' : '0');
        } else {
          formData.append(key, dishData[key]);
        }
      }
    });
    
    // Laravel requires _method=PUT for multipart/form-data updates
    formData.append('_method', 'PUT');

    const response = await api.post(`/dishes/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.errors || error.response?.data?.message || 'Failed to update dish');
  }
});

export const deleteDish = createAsyncThunk('dishes/deleteDish', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/dishes/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete dish');
  }
});

const dishesSlice = createSlice({
  name: 'dishes',
  initialState: {
    list: [],
    pagination: {},
    loading: false,
    error: null,
    actionSuccess: false,
  },
  reducers: {
    clearDishState: (state) => {
      state.error = null;
      state.actionSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data || action.payload; // Support pagination format
        state.pagination = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total,
        };
      })
      .addCase(fetchDishes.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      .addCase(addDish.pending, (state) => { state.loading = true; state.error = null; state.actionSuccess = false; })
      .addCase(addDish.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
        state.actionSuccess = true;
      })
      .addCase(addDish.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      .addCase(updateDish.pending, (state) => { state.loading = true; state.error = null; state.actionSuccess = false; })
      .addCase(updateDish.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(d => d.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.actionSuccess = true;
      })
      .addCase(updateDish.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      .addCase(deleteDish.pending, (state) => { state.loading = true; state.error = null; state.actionSuccess = false; })
      .addCase(deleteDish.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(d => d.id !== action.payload);
        state.actionSuccess = true;
      })
      .addCase(deleteDish.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export const { clearDishState } = dishesSlice.actions;
export default dishesSlice.reducer;
