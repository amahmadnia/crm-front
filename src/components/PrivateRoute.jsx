import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from './Header';

const PrivateRoute = () => {
  const token = Cookies.get('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Header />
      <Outlet />;
    </>
  );
};

export default PrivateRoute;
