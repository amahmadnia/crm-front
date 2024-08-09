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
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  styled,
  Box,
} from '@mui/material';
import useStore from '../store';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatDate, formatNumber } from '../utils/helper';

const CustomTableCellHeader = styled(TableCell)(({ theme }) => ({
  fontSize: 18,
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 16,
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

  const [dateValue, setDateValue] = useState(formatDate(new Date()));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/cip/reserved-flights/?date=${dateValue}`
        ); // Replace with your API endpoint

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
  }, [dateValue]);

  const handleDate = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);

    setDateValue(value);
  };

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Box>
        <Grid container spacing={5} pt={6}>
          <Grid
            container
            sx={{
              width: '100%',
              padding: '10px 20px',
              mb: 3,
              backgroundColor: '#F8F8FC',
              borderRadius: 7,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" gutterBottom>
                لیست پرواز های رزرو شده
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <TextField
                name="birthDate"
                value={dateValue}
                onChange={handleDate}
                type="date"
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  style: {
                    borderRadius: '48px',
                  },
                }}
              />
            </Grid>
          </Grid>

          {data.length === 0 ? (
            <Box
              display="flex"
              width={'100%'}
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
                style={{ textAlign: 'center' }}
              >
                پروازی در این تاریخ رزرو نشده است
              </Typography>
            </Box>
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                padding: '20px',
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <CustomTableCellHeader>کد پرواز</CustomTableCellHeader>
                    {/* <CustomTableCellHeader>برنامه</CustomTableCellHeader> */}
                    <CustomTableCellHeader>بزرگسالان</CustomTableCellHeader>
                    <CustomTableCellHeader>نوزادان</CustomTableCellHeader>
                    <CustomTableCellHeader>
                      تاریخ به‌روزرسانی
                    </CustomTableCellHeader>
                    <CustomTableCellHeader>قیمت کل</CustomTableCellHeader>
                    <CustomTableCellHeader>وضعیت پرداخت</CustomTableCellHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((flight, index) => (
                    <React.Fragment key={flight.cip_id}>
                      <TableRow
                        sx={{
                          '&:hover': {
                            background: 'rgba(0,0,0,0.1)',
                          },
                        }}
                      >
                        <CustomTableCell>{flight.cip_id}</CustomTableCell>
                        {/* <CustomTableCell>{flight.schedule}</CustomTableCell> */}
                        <CustomTableCell>{flight.adults}</CustomTableCell>
                        <CustomTableCell>{flight.infants}</CustomTableCell>
                        <CustomTableCell>
                          {formatDate(new Date(flight.date_updated))}
                        </CustomTableCell>
                        <CustomTableCell>
                          {formatNumber(flight.total_price)} تومان
                        </CustomTableCell>
                        <CustomTableCell>
                          {flight.payment_status === 'pending'
                            ? 'در حال بررسی'
                            : 'تایید شده'}
                        </CustomTableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={8}>
                          <Accordion
                            expanded={expanded === `panel${index}`}
                            onChange={handleChange(`panel${index}`)}
                            sx={{
                              border: '1px solid #B0B8E0',
                              borderRadius: '16px',
                              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={`panel${index}bh-content`}
                              id={`panel${index}bh-header`}
                            >
                              <Typography sx={{ fontWeight: 500 }}>
                                مسافران
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>نام</TableCell>
                                    <TableCell>نام خانوادگی</TableCell>
                                    <TableCell>شماره گذرنامه</TableCell>
                                    <TableCell>تاریخ تولد</TableCell>
                                    <TableCell>سن</TableCell>
                                    <TableCell>جنسیت</TableCell>
                                    {/* <TableCell>توضیحات</TableCell> */}
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {flight.passengers.map(
                                    (passenger, pIndex) => (
                                      <TableRow key={pIndex}>
                                        <TableCell>
                                          {passenger.first_name}
                                        </TableCell>
                                        <TableCell>
                                          {passenger.last_name}
                                        </TableCell>
                                        <TableCell>
                                          {passenger.passport_number}
                                        </TableCell>
                                        <TableCell>
                                          {formatDate(
                                            new Date(passenger.birth_date)
                                          )}
                                        </TableCell>
                                        <TableCell>{passenger.age}</TableCell>
                                        <TableCell>
                                          {passenger.gender === 'Male'
                                            ? 'مرد'
                                            : 'زن'}
                                        </TableCell>
                                        {/* <TableCell>{passenger.description}</TableCell> */}
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </AccordionDetails>
                          </Accordion>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default ExampleComponent;
