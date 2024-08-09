import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Paper,
  Alert,
} from '@mui/material';
import useStore from './../store';

const PassengerForm = () => {
  const {
    passengers,
    addAdult,
    removeAdult,
    addBaby,
    removeBaby,
    updatePassengerDetails,
  } = useStore();

  const [errors, setErrors] = useState([]);

  const handleInputChange = (type, id, field, value) => {
    updatePassengerDetails(type, id, { [field]: value });
  };

  const validateFields = () => {
    const newErrors = [];
    passengers.adults.concat(passengers.babies).forEach((passenger) => {
      if (
        !passenger.firstName ||
        !passenger.lastName ||
        !passenger.birthDate ||
        !passenger.gender ||
        !passenger.passportNumber
      ) {
        newErrors.push(
          `Please fill all fields for passenger ID ${passenger.id}`
        );
      }
    });
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateFields()) {
      alert('Form submitted successfully!');
      // Add additional submission logic here
    } else {
      alert('Errors detected. Please fill all required fields.');
    }
  };

  const PassengerSection = ({ type, passengers }) => (
    <Paper style={{ padding: 16, margin: '16px 0' }}>
      <Typography variant="h5" style={{ marginBottom: 16 }}>
        {type === 'adults' ? 'بزرگسالان' : 'نوزادان'}
      </Typography>
      {passengers.length > 0 ? (
        <Grid container spacing={2}>
          {passengers.map((passenger) => (
            <Grid item xs={12} sm={6} key={passenger.id}>
              <TextField
                required
                label="نام"
                value={passenger.firstName}
                onChange={(e) =>
                  handleInputChange(
                    type,
                    passenger.id,
                    'firstName',
                    e.target.value
                  )
                }
                fullWidth
              />
              <TextField
                required
                label="نام خانوادگی"
                value={passenger.lastName}
                onChange={(e) =>
                  handleInputChange(
                    type,
                    passenger.id,
                    'lastName',
                    e.target.value
                  )
                }
                fullWidth
              />
              <TextField
                required
                label="تاریخ تولد"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={passenger.birthDate}
                onChange={(e) =>
                  handleInputChange(
                    type,
                    passenger.id,
                    'birthDate',
                    e.target.value
                  )
                }
                fullWidth
              />
              <TextField
                required
                label="جنسیت"
                value={passenger.gender}
                onChange={(e) =>
                  handleInputChange(
                    type,
                    passenger.id,
                    'gender',
                    e.target.value
                  )
                }
                fullWidth
              />
              <TextField
                required
                label="شماره پاسپورت"
                value={passenger.passportNumber}
                onChange={(e) =>
                  handleInputChange(
                    type,
                    passenger.id,
                    'passportNumber',
                    e.target.value
                  )
                }
                fullWidth
              />
              <Button
                onClick={() =>
                  type === 'adults' ? removeAdult() : removeBaby()
                }
                color="error"
              >
                حذف
              </Button>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="subtitle1">
          {type === 'adults'
            ? 'هیچ بزرگسالی وجود ندارد'
            : 'هیچ نوزادی وجود ندارد'}
        </Typography>
      )}
    </Paper>
  );

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      {errors.length > 0 && (
        <Alert severity="error">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </Alert>
      )}
      <PassengerSection type="adults" passengers={passengers.adults} />
      <PassengerSection type="babies" passengers={passengers.babies} />
      <Button
        onClick={addAdult}
        variant="contained"
        color="primary"
        style={{ marginRight: 8 }}
      >
        افزودن بزرگسال
      </Button>
      <Button onClick={addBaby} variant="contained" color="primary">
        افزودن نوزاد
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: 16 }}
      >
        ارسال
      </Button>
    </Box>
  );
};

export default PassengerForm;
