import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // For redirection

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!username || !password) {
      setError('نام کاربری و رمز عبور را وارد کنید');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/accounts/login/',
        {
          username,
          password,
        }
      );

      console.log('Login successful:', response.data.access);

      // Store the token in cookies
      Cookies.set('token', response.data.access, { expires: 7 });

      // Redirect to home page upon successful login
      navigate('/home');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('نام کاربری یا رمز عبور اشتباه است');
      } else {
        setError('خطایی رخ داده است. لطفا دوباره تلاش کنید');
      }
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
        height: '100vh',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        border: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
          <Typography component="h1" variant="h5">
            ورود
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="رمز عبور"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'در حال بارگذاری...' : 'ورود'}
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

export default LoginPage;
