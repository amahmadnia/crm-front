// src/components/EditForm.js
import React, { useState } from 'react';
import { Box, TextField, Button, Grid } from '@mui/material';
import api from '../utils/api';

const EditForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    convoyName: '',
    username: 'exampleUser',
    email: 'example@example.com',
    phoneNumber: '',
  });

  const submitForm = async () => {
    try {
      const response = await api.post('/accounts/profile/', {
        x: '3233',
        y: '3434',
      }); // Replace with your API endpoint
      // setData(response.data);
    } catch (err) {
      // setError(err);
    } finally {
      // setLoading(false);
    }
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'این فیلد اجباری است',
      }));
    } else {
      setErrors((prevErrors) => {
        const { [name]: removedError, ...restErrors } = prevErrors;
        return restErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};
    Object.keys(formData).forEach((field) => {
      if (formData[field].trim() === '') {
        formErrors[field] = 'این فیلد اجباری است';
      }
    });
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Handle form submission
      console.log(formData);
    }
  };

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="نام"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="نام خانوادگی"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="نام کاروان"
            name="convoyName"
            value={formData.convoyName}
            onChange={handleChange}
            required
            error={!!errors.convoyName}
            helperText={errors.convoyName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="نام کاربری"
            name="username"
            value={formData.username}
            InputProps={{ readOnly: true }}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="ایمیل"
            name="email"
            value={formData.email}
            InputProps={{ readOnly: true }}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="شماره تلفن"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={submitForm}
          >
            ارسال
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditForm;
