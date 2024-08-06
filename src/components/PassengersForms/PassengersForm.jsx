// src/components/PassengerForm.js
import React from 'react';
import useStore from '../../store';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';

const PassengerForm = ({ type, passenger }) => {
  const { updatePassengerDetails } = useStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePassengerDetails(type, passenger.id, { [name]: value });
  };

  return (
    <Box sx={{ mb: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <TextField
        label="نام لاتین"
        name="firstName"
        value={passenger.firstName}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="نام خانوادکی لاتین"
        name="lastName"
        value={passenger.lastName}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="تاریخ تولد"
        name="birthDate"
        value={passenger.birthDate}
        onChange={handleChange}
        type="date"
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth required sx={{ mb: 2 }}>
        <InputLabel>جنسیت</InputLabel>
        <Select
          label="جنسیت"
          name="gender"
          value={passenger.gender}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>انتخاب کنید</em>
          </MenuItem>
          <MenuItem value="male">مرد</MenuItem>
          <MenuItem value="female">زن</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="شماره گذرنامه"
        name="passportNumber"
        value={passenger.passportNumber}
        onChange={handleChange}
        fullWidth
        required
      />
    </Box>
  );
};

export default PassengerForm;
