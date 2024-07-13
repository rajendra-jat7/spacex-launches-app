import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const authState = useSelector((state) => state.auth);

  return authState.user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
