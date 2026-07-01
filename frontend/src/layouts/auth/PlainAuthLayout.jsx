import React from 'react';
import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

const PlainAuthLayout = () => {
  return (
    <div className="auth-layout" style={{ backgroundColor: '#f8fafc' }}>
      <div className="auth-layout-container" style={{ maxWidth: '500px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default PlainAuthLayout;
