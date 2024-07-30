// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import Airlines from './pages/AirLines';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Container
        sx={{ paddingTop: '1rem', background: 'lightyellow', width: '100%' }}
      >
        {/* <Header /> */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" exact element={<HomePage />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/airlines" exact element={<Airlines />} />
          {/* <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
