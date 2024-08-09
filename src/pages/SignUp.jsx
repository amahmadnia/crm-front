import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    convoyName: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (
      !formData.username ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.convoyName ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('لطفا تمامی فیلدها را پر کنید');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('رمزهای عبور مطابقت ندارند');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/accounts/register/',
        {
          ...formData,
          password2: formData.confirmPassword,
          profilePicture: null,
        }
      );

      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (err) {
      setError('ثبت نام ناموفق بود');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            mt: 2,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // padding: 3,
          }}
        >
          <img
            src="main-logo.png"
            alt="logo"
            style={{ marginBottom: '20px', height: '100px' }}
          />
          <Typography component="h1" variant="h5" mb={0}>
            ثبت نام
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: '100%' }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="نام کاربری"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              InputProps={{
                style: {
                  borderRadius: '48px',
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="ایمیل"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                style: {
                  borderRadius: '48px',
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="شماره تلفن"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              InputProps={{
                style: {
                  borderRadius: '48px',
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="convoyName"
              label="نام کاروان"
              name="convoyName"
              value={formData.convoyName}
              onChange={handleChange}
              InputProps={{
                style: {
                  borderRadius: '48px',
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="رمزعبور"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                style: {
                  borderRadius: '48px',
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="تایید رمزعبور"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                style: {
                  borderRadius: '48px',
                },
              }}
            />
            {error && (
              <Alert severity="error" sx={{ borderRadius: '48px', mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                padding: 2,
                fontSize: 18,
                borderRadius: '48px',
                backgroundColor: '#6200ea',
                '&:hover': {
                  backgroundColor: '#3700b3',
                },
              }}
              disabled={isLoading}
            >
              {isLoading ? 'در حال بارگذاری...' : 'ثبت نام'}
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(/login-bg-2.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  );
};

export default SignUpPage;
