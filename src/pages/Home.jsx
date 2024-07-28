// src/HomePage.jsx
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import useStore from './../store';

const HomePage = () => {
  const { logout } = useStore();

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Home Page
      </Typography>
      <Button variant="contained" color="primary" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
};

export default HomePage;
