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
    <Stack>
      {/* <p>{String(hasSubmitted)}</p> */}
      <Box
        sx={{
          width: '100%',
          padding: '10px 20px',
          mb: 2,
          backgroundColor: '#fff',
          borderRadius: 7,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontSize: 14 }}>
          تعداد مسافرین
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: 14 }}>
            {passengers.adults.length} بزرگسال،&nbsp;{' '}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ fontSize: 14 }}>
            {passengers.babies.length} نوزاد
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          padding: 4,
          backgroundColor: '#fff',
          borderRadius: 7,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: 5,
        }}
      >
        <Typography variant="h6" gutterBottom pb={3} sx={{ fontSize: 14 }}>
          مشخصات مسافرین بزرگسال
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
      </Box>

      <Box
        sx={{
          width: '100%',
          padding: 4,
          backgroundColor: '#fff',
          borderRadius: 7,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: 10,
        }}
      >
        <Typography variant="h6" gutterBottom pb={3} sx={{ fontSize: 14 }}>
          مشخصات مسافرین نوزاد
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
    </Stack>
  );
};

export default PassengerManager;
