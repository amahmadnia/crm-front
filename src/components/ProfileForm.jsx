import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid } from '@mui/material';
import useProfileStore from '../store/profileStore';
import api from '../utils/api';
import { toast } from 'react-toastify';

const EditForm = () => {
  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Sync local formData with the store profile data
    setFormData(profile);
  }, [profile]);

  const [formData, setFormData] = useState(profile);

  const submitForm = async () => {
    try {
      const response = await api.post('/accounts/profile/', formData); // Replace with your API endpoint
      setProfile(response.data);
    } catch (err) {
      console.error('Failed to submit form', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (typeof value === 'string' && value.trim() === '') {
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

  const handleSubmit = () => {
    let formErrors = {};

    const { id, profilePicture, ...rest } = formData;

    const newFormData = rest;
    Object.keys(newFormData).forEach((field) => {
      if (
        typeof newFormData[field] !== 'string' ||
        newFormData[field].trim() === ''
      ) {
        formErrors[field] = 'این فیلد اجباری است';
      }
    });
    setErrors(formErrors);
    console.log('hello');
    console.log(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Handle form submission
      console.log('sdkhsgdk');

      submitForm();
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '100%' },
        p: '40px 60px 40px 30px',
        borderRadius: 7,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="نام"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            error={!!errors.first_name}
            helperText={errors.first_name}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="نام خانوادگی"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            error={!!errors.last_name}
            helperText={errors.last_name}
            variant="outlined"
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
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="نام کاربری"
            name="username"
            value={formData.username}
            InputProps={{ readOnly: true }}
            required
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="ایمیل"
            name="email"
            value={formData.email}
            InputProps={{ readOnly: true }}
            required
            variant="outlined"
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
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            // type="submit"
            sx={{
              padding: '10px 20px',
              backgroundColor: '#4758B8',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
              borderRadius: '8px',
              marginLeft: '20px !important',
            }}
          >
            ارسال
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditForm;
