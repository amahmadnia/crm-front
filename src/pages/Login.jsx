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
  Link,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('نام کاربری یا رمز عبور اشتباه است');
      } else {
        setError('نام کاربری یا رمز عبور اشتباه است');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
          }}
        >
          <img
            src="main-logo.png"
            alt="logo"
            style={{ marginBottom: '20px' }}
          />
          <Typography component="h1" variant="h5">
            خوش آمدید!
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            برای ورود به پرتال لاگین کنید
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: '100%' }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="نام کاربری / ایمیل"
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
              name="password"
              label="رمزعبور"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: {
                  borderRadius: '48px',
                },
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="مرا به خاطر بسپار"
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
                borderRadius: '48px',
                backgroundColor: '#6200ea',
                '&:hover': {
                  backgroundColor: '#3700b3',
                },
              }}
              disabled={isLoading}
            >
              {isLoading ? 'در حال بارگذاری...' : 'ورود'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ color: '#6200ea' }}>
                  {'حساب ندارید؟ ثبت نام'}
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {/* Forgot your password? */}
                </Link>
              </Grid>
            </Grid>
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
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  );
};

export default LoginPage;
