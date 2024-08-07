// src/components/PassengerForm.js
import React, { useEffect, useState } from 'react';
import useStore from '../../store';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  FormHelperText,
  Grid,
} from '@mui/material';

const PassengerForm = ({ type, passenger, hasSubmitted }) => {
  const { updatePassengerDetails } = useStore();

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    birthDate: false,
    gender: false,
    passportNumber: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePassengerDetails(type, passenger.id, { [name]: value });
  };

  const checkError = (value) => value === '';

  useEffect(() => {
    if (hasSubmitted) {
      setErrors({
        firstName: checkError(passenger.firstName),
        lastName: checkError(passenger.lastName),
        birthDate: checkError(passenger.birthDate),
        gender: checkError(passenger.gender),
        passportNumber: checkError(passenger.passportNumber),
      });
    }
  }, [hasSubmitted, passenger]);

  return (
    <Box
      sx={{
        mb: 3,
        p: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: 3,
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="نام لاتین"
            name="firstName"
            value={passenger.firstName}
            onChange={handleChange}
            fullWidth
            required
            error={errors.firstName}
            helperText={errors.firstName ? 'این فیلد اجباری است' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="نام خانوادگی لاتین"
            name="lastName"
            value={passenger.lastName}
            onChange={handleChange}
            fullWidth
            required
            error={errors.lastName}
            helperText={errors.lastName ? 'این فیلد اجباری است' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="تاریخ تولد"
            name="birthDate"
            value={passenger.birthDate}
            onChange={handleChange}
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            error={errors.birthDate}
            helperText={errors.birthDate ? 'این فیلد اجباری است' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={errors.gender}>
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
            {errors.gender && (
              <FormHelperText>این فیلد اجباری است</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="شماره گذرنامه"
            name="passportNumber"
            value={passenger.passportNumber}
            onChange={handleChange}
            fullWidth
            required
            error={errors.passportNumber}
            helperText={errors.passportNumber ? 'این فیلد اجباری است' : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="افزودن توضیحات"
            name="description"
            value={passenger.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={1}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PassengerForm;
