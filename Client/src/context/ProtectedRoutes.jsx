// src/component/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component }) => {
  const { authToken } = useAuth(); // Get authToken from context

  return authToken ? <Component /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
