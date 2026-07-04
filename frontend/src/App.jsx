import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import SuperAdminDashboard from "./features/dashboard/super admin/SuperAdminDashboard";
import AuthLayout from "./layouts/auth/AuthLayout";
import PlainAuthLayout from "./layouts/auth/PlainAuthLayout";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import ForgotPassword from "./features/auth/ForgotPassword";
import ResetPassword from "./features/auth/ResetPassword";
import ResetExpired from "./features/auth/ResetExpired";
import ResetSuccess from "./features/auth/ResetSuccess";
import AuthGuard from "./components/auth/AuthGuard";

// Placeholder components for routing structure
const Unauthorized = () => <div>Unauthorized</div>;

import RestaurantsList from "./features/dashboard/restaurants/RestaurantsList";
import RestaurantDetails from "./features/dashboard/restaurants/RestaurantDetails";
import RestaurantForm from "./features/dashboard/restaurants/RestaurantForm";
import RestaurantMenu from "./features/dashboard/restaurants/RestaurantMenu";
import UsersList from "./features/dashboard/users/UsersList";
import UserDetails from "./features/dashboard/users/UserDetails";
import UserForm from "./features/dashboard/users/UserForm";

// Restaurant Admin Pages
import MenuManagement from "./features/dashboard/menu/MenuManagement";
import AddDish from "./features/dashboard/menu/AddDish";
import EditDish from "./features/dashboard/menu/EditDish";
import CategoriesManagement from "./features/dashboard/menu/CategoriesManagement";
import Notifications from "./features/dashboard/Notifications";
import Settings from "./features/dashboard/Settings";
import RestaurantAdminDashboard from "./features/dashboard/restaurant admin/RestaurantAdminDashboard";
const OrdersManagement = () => <div>Orders Management</div>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Plain Auth Routes (Login & Register) */}
      <Route element={<PlainAuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Standard Auth Routes (Forgot & Reset Password) */}
      <Route element={<AuthLayout />}>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-expired" element={<ResetExpired />} />
        <Route path="/reset-success" element={<ResetSuccess />} />
      </Route>
      
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes - Super Admin */}
      <Route element={<AuthGuard allowedRoles={['Super Admin']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/restaurants" element={<RestaurantsList />} />
          <Route path="/restaurants/add" element={<RestaurantForm />} />
          <Route path="/restaurants/:id" element={<RestaurantDetails />} />
          <Route path="/restaurants/:id/menu" element={<RestaurantMenu />} />
          <Route path="/restaurants/edit/:id" element={<RestaurantForm />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/add" element={<UserForm />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/users/edit/:id" element={<UserForm />} />
        </Route>
      </Route>

      {/* Protected Routes - Restaurant Admin */}
      <Route element={<AuthGuard allowedRoles={['Restaurant Admin', 'Super Admin']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/restaurant-dashboard" element={<RestaurantAdminDashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/menu" element={<MenuManagement />} />
          <Route path="/menu/categories" element={<CategoriesManagement />} />
          <Route path="/menu/add" element={<AddDish />} />
          <Route path="/menu/edit/:id" element={<EditDish />} />
          <Route path="/orders" element={<OrdersManagement />} />
        </Route>
      </Route>

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
