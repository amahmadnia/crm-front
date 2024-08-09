import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from './Header';
import { Box, Container } from '@mui/material';
import Footer from './Footer';
import useProfileStore from '../store/profileStore';
import api from '../utils/api';

const PrivateRoute = () => {
  const token = Cookies.get('token');
  const location = useLocation();
  const setProfile = useProfileStore((state) => state.setProfile);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/accounts/profile'); // Replace with your API endpoint
        setProfile(response.data);
      } catch (err) {}
    };

    fetchData();
  }, [setProfile]);

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
