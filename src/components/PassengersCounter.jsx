import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Counter = ({ label, min, max }) => {
  const [count, setCount] = useState(min);

  const handleIncrement = () => {
    if (count < max) {
      setCount(count + 1);
    }
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
      <Typography variant="body1" sx={{ marginLeft: 2 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handleDecrement} disabled={count === min}>
          <RemoveCircleOutlineIcon />
        </IconButton>
        <Typography variant="body1" width={30} sx={{ textAlign: 'center' }}>
          {count}
        </Typography>
        <IconButton onClick={handleIncrement} disabled={count === max}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Counter;
