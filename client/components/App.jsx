import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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

const App = () => (
        <ThemeProvider theme={theme}>
            <h1>Welcome to GameOn. For the players!!!</h1>
        <nav>
            <Link to="/login">LOGIN</Link>{'   '}
            <Link to="/map">Map</Link>{'   '}
            <Link to="/eventListings">See Events</Link>{'   '}
            <Link to="/postEvent">Create new Event</Link>{'   '}
            <Link to="/profile">Your Profile</Link>{'   '}
            <Link to="/logout">Logout</Link>{'   '}
        </nav>
        <Outlet/>
        </ThemeProvider>
);

export default App;
