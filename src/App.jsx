// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" exact element={<HomePage />} />
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
