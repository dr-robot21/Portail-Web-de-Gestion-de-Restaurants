import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchNotifications = createAsyncThunk('notifications/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/notifications');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch notifications');
  }
});

export const markNotificationRead = createAsyncThunk('notifications/markRead', async (id, { rejectWithValue }) => {
  try {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update notification');
  }
});

export const markAllNotificationsRead = createAsyncThunk('notifications/markAllRead', async (_, { rejectWithValue }) => {
  try {
    const response = await api.put('/notifications/mark-all-read');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update notifications');
  }
});

export const deleteNotification = createAsyncThunk('notifications/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/notifications/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete notification');
  }
});

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    list: [],
    pagination: {},
    unreadCount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.notifications || action.payload;
        state.list = data.data || data;
        state.pagination = {
          current_page: data.current_page,
          last_page: data.last_page,
          total: data.total,
        };
        state.unreadCount = action.payload.unread_count ?? state.list.filter(n => !n.is_read).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const index = state.list.findIndex(n => n.id === action.payload.id);
        if (index !== -1 && !state.list[index].is_read) {
          state.list[index].is_read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })

      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.list = state.list.map(n => ({ ...n, is_read: true }));
        state.unreadCount = 0;
      })

      .addCase(deleteNotification.fulfilled, (state, action) => {
        const removed = state.list.find(n => n.id === action.payload);
        state.list = state.list.filter(n => n.id !== action.payload);
        if (removed && !removed.is_read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      });
  }
});

export default notificationsSlice.reducer;
