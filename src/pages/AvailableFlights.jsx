// src/components/ExampleComponent.js
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { extractHourAndMinute } from '../utils/helper';

import { useNavigate, useSearchParams } from 'react-router-dom';
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
  List,
  ListItem,
  Box,
} from '@mui/material';
import useStore from '../store';

const ExampleComponent = () => {
  const [searchParams] = useSearchParams();
  const flightId = searchParams.get('id');
  const flightDate = searchParams.get('date');

  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [startDate, setStartDate] = useState('');
  const store = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/cip/flight-schedules-list/?flight_id=${flightId}&date=${flightDate}`
        );

        const flights = response.data;

        setData(flights);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLearnMoreClick = (flight) => {
    store.setSelectedFlight(flight);
    navigate(`/flight-reservation`);
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
      <h2>پرواز های موجود هواپیمایی </h2>
      {data.length === 0 && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          pt={10}
        >
          <Typography
            variant="h5"
            component="div"
            color="textSecondary"
            gutterBottom
          >
            هیچ پروازی در این تاریخ برای این ایرلاین موجود نیست
          </Typography>
        </Box>
      )}

      <Grid container spacing={2} pt={5}>
        {data.map((flight) => (
          <Grid item xs={12} sm={6} md={4} key={flight?.id}>
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                },
                overflow: 'hidden',
              }}
            >
              <CardMedia
                sx={{
                  height: 140,
                  objectFit: 'cover',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
                image={`${store?.selectedAirlineId}.jpg`}
                title="Flight Image"
              />
              <CardContent
                sx={{
                  padding: '16px',
                  backgroundColor: '#f5f5f5',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                }}
              >
                <Typography gutterBottom variant="h6" component="div">
                  شماره پرواز: &nbsp;&nbsp;{flight?.flight_number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <List>
                    <ListItem>هواپیمایی: {flight?.flight?.name}</ListItem>
                    <ListItem>تاریخ پرواز: {flightDate}</ListItem>
                    <ListItem>
                      نوع پرواز:{' '}
                      {flight?.flight_type === 'inbound' ? 'ورودی' : 'خروجی'}
                    </ListItem>
                    <ListItem>
                      ساعت خروج: {extractHourAndMinute(flight?.departure_time)}
                    </ListItem>
                    <ListItem>
                      ساعت ورود: {extractHourAndMinute(flight?.arrival_time)}
                    </ListItem>
                  </List>
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  padding: '8px 16px',
                  backgroundColor: '#f5f5f5',
                  borderTop: '1px solid #ddd',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                }}
              >
                <Button
                  size="small"
                  onClick={() => handleLearnMoreClick(flight)}
                  sx={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#0056b3',
                    },
                  }}
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
              navigate(`/profile?id=${selectedAirline.id}&date=${startDate}`);
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
