import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  TextField,
  Grid,
} from '@mui/material';

const PaymentComponent = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <Box
      sx={{
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: '4px',
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">مبلغ قابل پرداخت</Typography>
          <Typography variant="h6" color="primary">
            68,267,000 ریال
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
          <Button variant="contained" color="primary">
            {isChecked ? 'پرداخت هماهنگ شده' : 'پرداخت آنلاین'}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
            }
            label="هماهنگی با مدیریت"
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
          <TextField
            variant="outlined"
            size="small"
            defaultValue="0 ریال"
            sx={{ width: '100px' }}
            disabled
          />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Button variant="outlined">بازگشت</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentComponent;
