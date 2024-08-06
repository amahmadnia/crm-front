import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from './Header';
import { Box, Container } from '@mui/material';
import Footer from './Footer';

const PrivateRoute = () => {
  const token = Cookies.get('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Box sx={{ background: '#EDF6F8' }}>
      <Header />
      <Container sx={{ minHeight: '700px' }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default PrivateRoute;
