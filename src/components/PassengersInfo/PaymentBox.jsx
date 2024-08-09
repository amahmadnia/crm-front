import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  TextField,
  Grid,
} from '@mui/material';
import useStore from '../../store';
import { formatNumber } from '../../utils/helper';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const PaymentComponent = () => {
  const [isChecked, setIsChecked] = useState(false);
  const store = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    const adultsCount = store.passengers.adults.length;
    const babiesCount = store.passengers.babies.length;

    const adultsPrice = adultsCount * 38000000;
    const babiesPrice = babiesCount * 19000000;

    return adultsPrice + babiesPrice;
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const submitPayment = async () => {
    setIsLoading(true);

    // console.log(store.passengers);
    let body = {
      schedule: store.currentFlightInfo.flightId,
      adults: store.passengers.adults.length,
      infants: store.passengers.babies.length,
      status: isChecked ? 'pending' : 'approved',
    };
    const setGender = (value) => {
      value === 'male' ? 'Male' : value === 'female' ? 'Female' : 'wtf';
    };

    const passengers = [];
    for (const adult of store.passengers.adults) {
      passengers.push({
        first_name: adult.firstName,
        last_name: adult.lastName,
        passport_number: adult.passportNumber,
        birth_date: adult.birthDate,
        gender: setGender(adult.gender),
        description: '',
      });
    }

    for (const baby of store.passengers.babies) {
      passengers.push({
        first_name: baby.firstName,
        last_name: baby.lastName,
        passport_number: baby.passportNumber,
        birth_date: baby.birthDate,
        gender: setGender(baby.gender),
        description: '',
      });
    }

    body = { ...body, passengers };

    console.log(body);

    try {
      await api.post('/cip/reservations/', body); // Replace with your API endpoint
      navigate('/reserved-flights');
    } catch (err) {
      console.error('Failed to submit form', err);
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        margin: '0 auto',
        width: '100%',
        mb: 2,
        px: 6,
        py: 4,
        backgroundColor: '#fff',
        borderRadius: 7,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" pb={1}>
            مبلغ قابل پرداخت
          </Typography>
          <Typography variant="h6" color="primary">
            {formatNumber(totalPrice())} تومان
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
          {isLoading ? 'در حال بارگذاری...' : ''}
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
            }
            label="هماهنگی با مدیریت"
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
          <Button variant="contained" color="primary" onClick={submitPayment}>
            {isChecked ? 'ثبت رزرو پرواز' : 'پرداخت آنلاین'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentComponent;
