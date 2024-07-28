// src/Login.js
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import backgroundImage from './../assets/login-bg.png'; // Make sure to add an image in the src folder
import useStore from './../store'; // Import Zustand store

const theme = createTheme();

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setToken } = useStore(); // Get the setToken action from Zustand store

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('https://your-api-endpoint/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Store the token in localStorage
      setToken(data.token); // Set the token in Zustand store
      console.log('Login successful:', data);
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging in:', error);
      setError(
        'Failed to log in. Please check your credentials and try again.'
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth={false} disableGutters>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid container spacing={0} sx={{ height: '100%' }}>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Grid
              item
              xs={12}
              sm={6}
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ padding: 4 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 4,
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: 'white',
                }}
              >
                <Typography component="h1" variant="h5">
                  Sign In
                </Typography>
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 1 }}
                  onSubmit={handleLogin}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error && (
                    <Typography color="error" variant="body2">
                      {error}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
