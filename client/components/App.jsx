import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { makeStyles } from '@mui/material';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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

const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
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
  fontSize: 15,
};

// const useStyles = makeStyles({
//   btn: {
//     fontSize: 16,
//     backgroundColor: 'violet',
//     '&:hover': {
//       backgroundColor: 'blue',
//     },
//   },
// });

// const classes = useStyles();
// className={classes.btn};

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
