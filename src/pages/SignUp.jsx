import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [caravanName, setCaravanName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (
      !username ||
      !email ||
      !phoneNumber ||
      !caravanName ||
      !password ||
      !confirmPassword
    ) {
      setError('تمام فیلدها را پر کنید');
      return;
    }

    if (password !== confirmPassword) {
      setError('رمز عبور و تکرار رمز عبور مطابقت ندارند');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/accounts/register/',
        {
          username,
          email,
          phoneNumber,
          convoyName: caravanName,
          password,
          password2: confirmPassword,
          profilePicture: null,
        }
      );

      console.log('Sign up successful:', response.data);

      navigate('/');
    } catch (err) {
      setError('ثبت نام ناموفق بود');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        border: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        mt: 5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
          }}
        >
          <Paper elevation={0}>
            <img src="main-logo.png" />
          </Paper>
          <Typography component="h1" variant="h5">
            ثبت نام
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            width={'90%'}
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              label="شماره همراه"
              name="phoneNumber"
              autoComplete="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              id="caravanName"
              label="نام کاروان"
              name="caravanName"
              autoComplete="caravanName"
              value={caravanName}
              onChange={(e) => setCaravanName(e.target.value)}
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
              label="رمز عبور"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              label="تکرار رمز عبور"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                style: {
                  borderRadius: '48px',
                },
              }}
            />
            {error && (
              <Alert severity="error" sx={{ borderRadius: '48px', mt: 5 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: '48px' }}
              disabled={isLoading}
            >
              {isLoading ? 'در حال بارگذاری...' : 'ثبت نام'}
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            backgroundImage: 'url(login-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Box>
    </Container>
  );
};

export default SignUpPage;
