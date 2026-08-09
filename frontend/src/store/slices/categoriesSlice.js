import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (restaurantId, { rejectWithValue }) => {
  try {
    const params = restaurantId ? { restaurant_id: restaurantId } : {};
    const response = await api.get('/categories', { params });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
  }
});

export const addCategory = createAsyncThunk('categories/addCategory', async (data, { rejectWithValue }) => {
  try {
    const response = await api.post('/categories', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to add category');
  }
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update category');
  }
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/categories/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete category');
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],
    loading: false,
    error: null,
    actionSuccess: false,
  },
  reducers: {
    clearCategoryState: (state) => {
      state.error = null;
      state.actionSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCategories.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add
      .addCase(addCategory.pending, (state) => { state.loading = true; state.error = null; state.actionSuccess = false; })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.actionSuccess = true;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateCategory.pending, (state) => { state.loading = true; state.error = null; state.actionSuccess = false; })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.actionSuccess = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteCategory.pending, (state) => { state.loading = true; state.error = null; state.actionSuccess = false; })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(c => c.id !== action.payload);
        state.actionSuccess = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCategoryState } = categoriesSlice.actions;

export default categoriesSlice.reducer;
