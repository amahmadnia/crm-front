import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import useStore from '../store';

const Counter = ({ label, min, max, category }) => {
  const [count, setCount] = useState(min);
  const store = useStore();

  const adultsCount = store.passengers.adults.length;
  const babiesCount = store.passengers.babies.length;
  const newCount = category === 'adult' ? adultsCount : babiesCount;

  const handleIncrement = () => {
    // if (newCount < max) {
    //   setCount(count + 1);
    // }

    // console.log(category);
    // store.addAdult();
    category === 'adult' ? store.addAdult() : store.addBaby();
  };

  const handleDecrement = () => {
    category === 'adult' ? store.removeAdult() : store.removeBaby();
    // if (count > min) {
    //   setCount(count - 1);
    // }
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
        <IconButton onClick={handleDecrement} disabled={newCount === min}>
          <RemoveCircleOutlineIcon />
        </IconButton>
        <Typography variant="body1" width={30} sx={{ textAlign: 'center' }}>
          {category === 'adult'
            ? adultsCount
            : category === 'baby'
            ? babiesCount
            : ''}
          {/* {category === 'adult' ? store. } */}
        </Typography>
        <IconButton onClick={handleIncrement} disabled={newCount === max}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Counter;
