import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import LogoIcon from '@mui/icons-material/AcUnit'; // Replace with your actual logo

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  margin: theme.spacing(0, 2),
  '&.active': {
    fontWeight: 'bold',
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
}));

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 0 }}>
          <IconButton edge="start" color="inherit" aria-label="profile">
            <Avatar
              alt="Profile Picture"
              src="https://via.placeholder.com/40"
            />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="/about">لیست پرواز ها</StyledNavLink>
          <StyledNavLink to="/profile">پروفایل</StyledNavLink>
          <StyledNavLink to="/airlines">رزرو جایگاه</StyledNavLink>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <IconButton edge="end" color="inherit" aria-label="logo">
            <LogoIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
