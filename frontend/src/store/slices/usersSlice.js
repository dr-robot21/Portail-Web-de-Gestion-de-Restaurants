import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (params, { rejectWithValue }) => {
  try {
    const response = await api.get('/users', { params });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
  }
});

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
  }
});

export const createUser = createAsyncThunk('users/createUser', async (userData, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    Object.keys(userData).forEach(key => {
      if (userData[key] !== null && userData[key] !== undefined) {
        if (typeof userData[key] === 'boolean') {
          formData.append(key, userData[key] ? '1' : '0');
        } else {
          formData.append(key, userData[key]);
        }
      }
    });
    const response = await api.post('/users', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.errors || error.response?.data?.message || 'Failed to create user');
  }
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, userData }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    Object.keys(userData).forEach(key => {
      if (userData[key] !== null && userData[key] !== undefined) {
        if (typeof userData[key] === 'boolean') {
          formData.append(key, userData[key] ? '1' : '0');
        } else {
          formData.append(key, userData[key]);
        }
      }
    });
    formData.append('_method', 'PUT');
    const response = await api.post(`/users/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.errors || error.response?.data?.message || 'Failed to update user');
  }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/users/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    selectedUser: null,
    pagination: {},
    loading: false,
    error: null,
    actionSuccess: false,
  },
  reducers: {
    clearUserState: (state) => {
      state.error = null;
      state.actionSuccess = false;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
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
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserById.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createUser.pending, (state) => { state.loading = true; state.error = null; state.actionSuccess = false; })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
        state.actionSuccess = true;
      })
      .addCase(createUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(updateUser.pending, (state) => { state.loading = true; state.error = null; state.actionSuccess = false; })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.list.findIndex(u => u.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
        state.selectedUser = action.payload;
        state.actionSuccess = true;
      })
      .addCase(updateUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(deleteUser.pending, (state) => { state.loading = true; state.error = null; state.actionSuccess = false; })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(u => u.id !== action.payload);
        state.actionSuccess = true;
      })
      .addCase(deleteUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export const { clearUserState, clearSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;

