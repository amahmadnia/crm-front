// src/components/PassengerTable.js
import React from 'react';
import useStore from '../../store';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';

const PassengerTable = () => {
  const { passengers } = useStore();

  return (
    <Box
      sx={{
        width: '100%',
        padding: '10px 20px',
        mb: 5,
        backgroundColor: '#fff',
        borderRadius: 7,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          mt: 2,
          pb: 3,
          px: 3,
          boxShadow: 'none', // Removes the box shadow
          border: 0, // Removes the border
        }}
      >
        <Typography variant="h6" component="div" sx={{ p: 0, pb: 5 }}>
          اطلاعات مسافران
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>نوع</TableCell>
              <TableCell>نام لاتین</TableCell>
              <TableCell>نام خانوادگی لاتین</TableCell>
              <TableCell>تاریخ تولد</TableCell>
              <TableCell>جنسیت</TableCell>
              <TableCell>شماره گذرنامه</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {passengers.adults.map((adult) => (
              <TableRow
                key={`adult-${adult.id}`}
                sx={{
                  '&:hover': {
                    background: 'rgba(0,0,0,0.07)',
                  },
                }}
              >
                <TableCell>بزرگسال</TableCell>
                <TableCell>{adult.firstName}</TableCell>
                <TableCell>{adult.lastName}</TableCell>
                <TableCell>{adult.birthDate}</TableCell>
                <TableCell>{adult.gender === 'male' ? 'مرد' : 'زن'}</TableCell>
                <TableCell>{adult.passportNumber}</TableCell>
              </TableRow>
            ))}
            {passengers.babies.map((baby) => (
              <TableRow
                key={`baby-${baby.id}`}
                sx={{
                  '&:hover': {
                    background: 'rgba(0,0,0,0.07)',
                  },
                }}
              >
                <TableCell>نوزاد</TableCell>
                <TableCell>{baby.firstName}</TableCell>
                <TableCell>{baby.lastName}</TableCell>
                <TableCell>{baby.birthDate}</TableCell>
                <TableCell>{baby.gender === 'male' ? 'مرد' : 'زن'}</TableCell>
                <TableCell>{baby.passportNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PassengerTable;
