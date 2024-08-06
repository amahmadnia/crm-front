import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import useStore from '../store';

const Counter = ({ label, min, max, category }) => {
  const [count, setCount] = useState(min);
  const store = useStore();

  const handleIncrement = (category) => {
    if (count < max) {
      setCount(count + 1);
    }

    const newCount = count + 1;

    category === 'adult'
      ? store.setPassengerAdultCount(newCount)
      : store.setPassengerBabyCount(newCount);
  };

  const handleDecrement = () => {
    if (count > min) {
      setCount(count - 1);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={2}
    >
      {/* <button
        onClick={() => {
          console.log('asuly' + store.passengersAdultCount);
          console.log('baby' + store.passengersBabyCount);
        }}
      >
        Sick
      </button> */}
      <Typography variant="body1" sx={{ marginLeft: 2 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handleDecrement} disabled={count === min}>
          <RemoveCircleOutlineIcon />
        </IconButton>
        <Typography variant="body1" width={30} sx={{ textAlign: 'center' }}>
          {count}
          {/* {category === 'adult' ? store. } */}
        </Typography>
        <IconButton onClick={handleIncrement} disabled={count === max}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Counter;
