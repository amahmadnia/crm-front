import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Cookies from 'js-cookie';
import LogoIcon from '@mui/icons-material/AcUnit'; // Replace with your actual logo
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import { Typography } from '@mui/material';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  margin: theme.spacing(0, 2),
  marginLeft: 70,
  '&.active': {
    fontWeight: 'bold',
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
}));

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      sx={{ background: 'linear-gradient(to right, #3f51b5, #5c6bc0)', mb: 5 }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 0 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="profile"
            onClick={handleMenuOpen}
          >
            <Avatar alt="Profile Picture" src="/avatar.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
              sx: {
                backgroundColor: '#a33e3e', // Light red background
              },
            }}
          >
            <MenuItem onClick={handleLogout} sx={{ color: '#fff' }}>
              خروج
            </MenuItem>
          </Menu>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            marginRight: '-100px',
          }}
        >
          <StyledNavLink to="/">رزرو جایگاه</StyledNavLink>
          <StyledNavLink to="/reserved-flights">
            پرواز های رزرو شده
          </StyledNavLink>
          <StyledNavLink to="/profile">پروفایل</StyledNavLink>
        </Box>

        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6">CIP Reservation</Typography>&nbsp;&nbsp;
          <img
            src="/logo-3.webp"
            style={{
              borderRadius: '10px',
              height: '40px',
              // margin: '12px 0 7px',
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
