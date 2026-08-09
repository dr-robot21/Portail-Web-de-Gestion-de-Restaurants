import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dishesReducer from './slices/dishesSlice';
import categoriesReducer from './slices/categoriesSlice';
import dashboardReducer from './slices/dashboardSlice';
import restaurantsReducer from './slices/restaurantsSlice';
import usersReducer from './slices/usersSlice';
import notificationsReducer from './slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dishes: dishesReducer,
    categories: categoriesReducer,
    dashboard: dashboardReducer,
    restaurants: restaurantsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
