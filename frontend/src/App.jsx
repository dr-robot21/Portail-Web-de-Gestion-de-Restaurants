import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./store/slices/authSlice";

import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import AuthLayout from "./layouts/auth/AuthLayout";
import PlainAuthLayout from "./layouts/auth/PlainAuthLayout";
import AuthGuard from "./components/auth/AuthGuard";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import ForgotPassword from "./features/auth/ForgotPassword";
import ResetPassword from "./features/auth/ResetPassword";
import ResetExpired from "./features/auth/ResetExpired";
import ResetSuccess from "./features/auth/ResetSuccess";
import Unauthorized from "./features/auth/Unauthorized";

// Lazy-loaded dashboard pages
const SuperAdminDashboard = lazy(() => import("./features/dashboard/super admin/SuperAdminDashboard"));
const RestaurantsList = lazy(() => import("./features/dashboard/restaurants/RestaurantsList"));
const RestaurantDetails = lazy(() => import("./features/dashboard/restaurants/RestaurantDetails"));
const RestaurantForm = lazy(() => import("./features/dashboard/restaurants/RestaurantForm"));
const RestaurantMenu = lazy(() => import("./features/dashboard/restaurants/RestaurantMenu"));
const UsersList = lazy(() => import("./features/dashboard/users/UsersList"));
const UserDetails = lazy(() => import("./features/dashboard/users/UserDetails"));
const UserForm = lazy(() => import("./features/dashboard/users/UserForm"));
const MenuManagement = lazy(() => import("./features/dashboard/menu/MenuManagement"));
const MenuStructure = lazy(() => import("./features/dashboard/menu/MenuStructure"));
const AddDish = lazy(() => import("./features/dashboard/menu/AddDish"));
const EditDish = lazy(() => import("./features/dashboard/menu/EditDish"));
const CategoriesManagement = lazy(() => import("./features/dashboard/menu/CategoriesManagement"));
const Notifications = lazy(() => import("./features/dashboard/Notifications"));
const Settings = lazy(() => import("./features/dashboard/Settings"));
const RestaurantAdminDashboard = lazy(() => import("./features/dashboard/restaurant admin/RestaurantAdminDashboard"));
const OrdersManagement = lazy(() => import("./features/dashboard/menu/OrdersManagement"));

function PageLoader() {
  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", fontFamily: "var(--font-family)" }}>
      Chargement...
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector(state => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token, user]);

  if (token && !user) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
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
            <Route path="/menu" element={<MenuStructure />} />
            <Route path="/menu/plats" element={<MenuManagement />} />
            <Route path="/menu/categories" element={<CategoriesManagement />} />
            <Route path="/menu/add" element={<AddDish />} />
            <Route path="/menu/edit/:id" element={<EditDish />} />
            <Route path="/orders" element={<OrdersManagement />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
