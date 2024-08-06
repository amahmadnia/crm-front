import React from 'react';
import { Box, Typography } from '@mui/material';
import Counter from './PassengersCounter'; // Make sure the path is correct

const AgeSelector = () => {
  return (
    <Box
      sx={{
        width: 400,
        padding: 2,
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h6" gutterBottom mb={3}>
        لطفا تعداد مسافرین را انتخاب کنید
      </Typography>
      <Counter label="بزرگسال/خردسال (+7)" min={1} max={10} category="adult" />
      <Counter label="نوزاد (-2)" min={0} max={10} category="baby" />
    </Box>
  );
};

export default AgeSelector;
