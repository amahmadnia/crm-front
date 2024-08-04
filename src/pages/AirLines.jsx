// src/components/ExampleComponent.js
import React, { useEffect, useState } from 'react';
import api from './../utils/api';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
} from '@mui/material';

const ExampleComponent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/cip/flights'); // Replace with your API endpoint

        const airlines = response.data;

        const newAirlines = airlines.map((airline) => {
          return {
            ...airline,
            imgURL: `/${airline.id}.jpg`,
          };
        });

        setData(newAirlines);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLearnMoreClick = (airline) => {
    setSelectedAirline(airline);
    setPopupOpen(true);
  };

  const handleClose = () => {
    setPopupOpen(false);
    setSelectedAirline(null);
    setStartDate('');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Grid container spacing={2}>
        {data.map((airline) => (
          <Grid item xs={12} sm={6} md={4} key={airline?.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140, marginBottom: '' }}
                image={airline.imgURL}
                title={airline.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {airline.name}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  Description of the airline.
                </Typography> */}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleLearnMoreClick(airline)}
                >
                  انتخاب پرواز
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={popupOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '500px', // Set the width of the dialog here
          },
        }}
      >
        <DialogTitle>تاریخ پرواز را انتخاب کنید</DialogTitle>
        <DialogContent>
          {selectedAirline && (
            <div>
              <Typography variant="h6">
                هواپیمایی {selectedAirline.name}
              </Typography>

              <TextField
                label="تاریخ پرواز"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>بستن</Button>
          <Button
            onClick={() => {
              navigate(
                `/available-flights?id=${selectedAirline.id}&date=${startDate}`
              );
            }}
          >
            ثبت و ادامه
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ExampleComponent;
