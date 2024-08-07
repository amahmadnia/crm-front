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
import ReservedFlights from './pages/ReservedFlights';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
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
            <Route path="/reserved-flights" element={<ReservedFlights />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
