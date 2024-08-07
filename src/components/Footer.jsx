import React from 'react';
import { Box, Typography, Link, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(to right, #3f51b5, #5c6bc0)',
        color: 'white',
        p: 4,
        mt: 20,
        textAlign: 'center',
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            تماس با ما
          </Typography>
          <Typography variant="body1" gutterBottom>
            تلفن: 021-12345678
          </Typography>
          <Typography variant="body1" gutterBottom>
            ایمیل: info@travelagency.com
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            لینک‌های مفید
          </Typography>
          <Link
            href="#"
            color="inherit"
            underline="none"
            display="block"
            sx={{ mb: 1, '&:hover': { color: '#ffeb3b' } }}
          >
            درباره ما
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            ما را دنبال کنید
          </Typography>
          <IconButton
            href="#"
            color="inherit"
            sx={{
              mx: 1,
              '&:hover': {
                color: '#ffeb3b',
                transform: 'scale(1.1)',
                transition: 'all 0.3s ease-in-out',
              },
            }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            href="#"
            color="inherit"
            sx={{
              mx: 1,
              '&:hover': {
                color: '#ffeb3b',
                transform: 'scale(1.1)',
                transition: 'all 0.3s ease-in-out',
              },
            }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            href="#"
            color="inherit"
            sx={{
              mx: 1,
              '&:hover': {
                color: '#ffeb3b',
                transform: 'scale(1.1)',
                transition: 'all 0.3s ease-in-out',
              },
            }}
          >
            <InstagramIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
