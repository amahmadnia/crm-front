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
} from '@mui/material';

const PassengerTable = () => {
  const { passengers } = useStore();

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        اطلاعات مسافران
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>نوع</TableCell>
            <TableCell>نام لاتین</TableCell>
            <TableCell>نام خانوادکی لاتین</TableCell>
            <TableCell>تاریخ تولد</TableCell>
            <TableCell>جنسیت</TableCell>
            <TableCell>شماره گذرنامه</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passengers.adults.map((adult) => (
            <TableRow key={`adult-${adult.id}`}>
              <TableCell>بزرگسال</TableCell>
              <TableCell>{adult.firstName}</TableCell>
              <TableCell>{adult.lastName}</TableCell>
              <TableCell>{adult.birthDate}</TableCell>
              <TableCell>{adult.gender === 'male' ? 'مرد' : 'زن'}</TableCell>
              <TableCell>{adult.passportNumber}</TableCell>
            </TableRow>
          ))}
          {passengers.babies.map((baby) => (
            <TableRow key={`baby-${baby.id}`}>
              <TableCell>کودک</TableCell>
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
  );
};

export default PassengerTable;
