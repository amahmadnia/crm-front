import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import LoginPage from './pages/Login';
import SignUp from './pages/SignUp';
import HomePage from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Profile from './pages/Profile';
import Airlines from './pages/AirLines';
import AvailableFlights from './pages/AvailableFlights';
import FlightReservation from './pages/FlightReservation';

function App() {
  return (
    <Router>
      <Container>
        {/* <Header /> */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Airlines />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/airlines" element={<Airlines />} />
            <Route path="/available-flights" element={<AvailableFlights />} />
            <Route path="/flight-reservation" element={<FlightReservation />} />
          </Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
