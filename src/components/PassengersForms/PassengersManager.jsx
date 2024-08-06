// src/components/PassengerManager.js
import React, { useState } from 'react';
import useStore from '../../store';
import PassengerForm from './PassengersForm';
import { Button, Box, Typography, Stack } from '@mui/material';

const PassengerManager = ({ hasSubmitted }) => {
  const {
    passengersAdultCount,
    passengersBabyCount,
    passengers,
    addAdult,
    removeAdult,
    addBaby,
    removeBaby,
  } = useStore();

  return (
    <>
      <p>{String(hasSubmitted)}</p>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          مسافران بالغ
        </Typography>
        {passengers.adults.map((passenger) => (
          <PassengerForm
            hasSubmitted={hasSubmitted}
            key={passenger.id}
            type="adults"
            passenger={passenger}
          />
        ))}
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <Button variant="contained" color="primary" onClick={addAdult}>
            افزودن بزرگسال
          </Button>
          <Button variant="outlined" color="secondary" onClick={removeAdult}>
            حذف بزرگسال
          </Button>
        </Stack>

        <Typography variant="h4" gutterBottom>
          مسافران کودک
        </Typography>
        {passengers.babies.map((passenger) => (
          <PassengerForm
            hasSubmitted={hasSubmitted}
            key={passenger.id}
            type="babies"
            passenger={passenger}
          />
        ))}
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary" onClick={addBaby}>
            افزودن کودک
          </Button>
          <Button variant="outlined" color="secondary" onClick={removeBaby}>
            حذف کودک
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default PassengerManager;
