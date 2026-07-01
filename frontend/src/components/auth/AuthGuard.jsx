import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * A basic auth guard to protect routes based on roles.
 * You should integrate this with your actual authentication context/state.
 */
const AuthGuard = ({ allowedRoles = [] }) => {
  const location = useLocation();
  
  // TODO: Replace with actual auth context check
  // For now, simulate an authenticated user with a specific role
  const isAuthenticated = true; 
  const userRole = 'Super Admin'; // could be 'Restaurant Admin'

  if (!isAuthenticated) {
    // Redirect to login page and preserve the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Role not authorized, redirect to an unauthorized or home page
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and authorized, render child routes
  return <Outlet />;
};

export default AuthGuard;
