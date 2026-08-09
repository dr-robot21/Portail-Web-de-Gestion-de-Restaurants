import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthGuard = ({ allowedRoles = [] }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Redirect to login page and preserve the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Assuming user role is structured like user.role
  const userRole = user?.role === 'super_admin' ? 'Super Admin' : (user?.role === 'restaurant_admin' ? 'Restaurant Admin' : null);

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Role not authorized, redirect to an unauthorized or home page
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and authorized, render child routes
  return <Outlet />;
};

export default AuthGuard;
