import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, styled } from '@mui/material';

const CustomCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));

const CustomCard = styled(Card)(({ theme }) => ({
  //   display: 'flex',
  //   justifyContent: 'flex-end',
}));

const CustomCardAction = styled(CardActions)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));

export default function MediaCard() {
  return (
    <>
      <Box>
        <CustomCard sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/air1.png"
            title="green iguana"
          />
          <CustomCardContent>
            <Typography gutterBottom variant="h5" component="div" align="right">
              Lizard
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
          </CustomCardContent>
          <CustomCardAction>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CustomCardAction>
        </CustomCard>
      </Box>
    </>
  );
}
