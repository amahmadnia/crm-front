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
  Box,
  styled,
} from '@mui/material';
import useStore from '../store';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '500px',
    borderRadius: '15px',
    background: 'linear-gradient(to right, #ece9e6, #ffffff)',
    boxShadow: theme.shadows[5],
  },
  '& .MuiDialogTitle-root': {
    backgroundColor: '#4758B8',
    color: '#fff',
    padding: theme.spacing(2),
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
    justifyContent: 'space-between',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4758B8',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
}));

const ExampleComponent = () => {
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
      <Grid container spacing={5} pt={6}>
        <Box
          sx={{
            width: '105%',
            padding: '10px 20px',
            mb: 0,

            backgroundColor: '#F8F8FC',
            borderRadius: 7,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: '-30px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            لیست هواپیمایی ها
          </Typography>
        </Box>
        {data.map((airline) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={airline?.id}
            justifyContent={'center'}
          >
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
                image={airline.imgURL}
                title={airline.name}
              />
              <CardContent
                sx={{
                  padding: '16px',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {airline.name}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
        Description of the airline.
      </Typography> */}
              </CardContent>
              <CardActions
                sx={{
                  padding: '8px 16px',
                  borderTop: '1px solid #ddd',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    // backgroundColor: '#e0e0e0',
                  },
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  size="small"
                  onClick={() => handleLearnMoreClick(airline)}
                  sx={{
                    backgroundColor: '#4758B8',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#0056b3',
                    },
                  }}
                >
                  انتخاب تاریخ پرواز
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <StyledDialog open={popupOpen} onClose={handleClose}>
        <DialogTitle mb={2}>تاریخ پرواز را انتخاب کنید</DialogTitle>
        <DialogContent>
          {selectedAirline && (
            <div>
              <Typography variant="h6" style={{ marginBottom: '20px' }}>
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
          <StyledButton onClick={handleClose}>بستن</StyledButton>
          <StyledButton
            onClick={() => {
              store.setSelectedAirlineId(selectedAirline.id);
              store.setCurrentFlightInfo({
                date: startDate,
                airlineName: selectedAirline.name,
              });

              navigate(
                `/available-flights?id=${selectedAirline.id}&date=${startDate}`
              );
            }}
          >
            ثبت و ادامه
          </StyledButton>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

export default ExampleComponent;
