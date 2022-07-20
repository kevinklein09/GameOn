import React from 'react';
import { useState, createContext } from "react";
import { Link, Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from 'styled-components';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// const UserContext = React.createContext('{username: user, email: user@gmail.com}');

const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'black',
  fontSize: 17,
};
const login = {
  margin: "1rem",
  textDecoration: "none",
  color: 'gray',
  fontSize: 13,
  fontFamily: 'Roboto',
};

const App = () => (
        // <UserContext.Provider>
        <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
          <Grid item xs={9}></Grid>
          <Grid item xs={1}><Link to="/login" style={login}>LOGIN</Link></Grid>
          <Grid item xs={1}><Link to="/logout" style={login}>LOGOUT</Link></Grid>
            </Grid>
          <Typography align="center" variant="h2" component="h2" >Game<strong><SportsBasketballIcon sx={{ fontSize: 50 }}/>N</strong></Typography>
          <Grid container spacing={6} align="center" margin="auto">
          <Grid xs={2}><Link to="/home" style={linkStyle}>{<Tab icon={<HomeIcon />} label='HOME'/>}</Link> </Grid>
          <Grid xs={2}><Link to="/eventListings" style={linkStyle}>{<Tab icon={<SportsFootballIcon />} label='GAMES'/>}</Link></Grid>
          <Grid xs={2}><Link to="/map" style={linkStyle}>{<Tab icon={<MapOutlinedIcon />} label='MAP'/>}</Link></Grid>
          <Grid xs={2}><Link to="/postEvent" style={linkStyle}>{<Tab icon={<AddCircleIcon />} label='POST'/>}</Link></Grid>
          <Grid xs={2}><Link to="/profile" style={linkStyle}>{<Tab icon={<AccountCircleIcon />} label='PROFILE' />}</Link></Grid>
          </Grid>
          <Outlet/>
          <Typography><p align="center">Game<strong><SportsBasketballIcon sx={{ fontSize: 15 }}/>N</strong>: Your go-to app for local pickup games.</p></Typography>
        </Box>
        </ThemeProvider>
        // </UserContext.Provider>
);

export default App;

/*
https://styled-components.com/docs/basics#installation
const App = () => (

        <ThemeProvider theme={theme}>
          <Typography align="center" variant="h2" component="h2" >Game<strong><SportsBasketballIcon sx={{ fontSize: 50 }}/>N</strong></Typography>
        <Tabs fixed>
          <Link to="/home" style={linkStyle}>{<Tab icon={<HomeIcon />} label='HOME'/>}</Link>
          <Link to="/eventListings" style={linkStyle}>{<Tab icon={<SportsFootballIcon />} label='GAMES'/>}</Link>
          <Link to="/map" style={linkStyle}>{<Tab icon={<MapOutlinedIcon />} label='MAP'/>}</Link>
          <Link to="/postEvent" style={linkStyle}>{<Tab icon={<AddCircleIcon />} label='POST'/>}</Link>
          <Link to="/profile" style={linkStyle}>{<Tab icon={<AccountCircleIcon />} label='PROFILE' />}</Link>
          <Link to="/login" style={linkStyle}>{<Tab icon={<LoginIcon />} label='LOGIN'/>}</Link>
          <Link to="/logout" style={linkStyle}>{<Tab icon={<LogoutIcon />} label='LOGOUT'/>}</Link>
        </Tabs>
          <Outlet/>
          <Typography><p align="center">Game<strong><SportsBasketballIcon sx={{ fontSize: 15 }}/>N</strong>: Your go-to app for local pickup games.</p></Typography>
        </ThemeProvider>
);
*/
