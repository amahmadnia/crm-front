// src/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useStore from './store';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
