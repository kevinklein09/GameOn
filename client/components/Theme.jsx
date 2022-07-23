/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable */

import React from 'react';
import {createTheme} from '@mui/material';

const theme = createTheme({
  typography: {
    h3: {
      fontFamily: 'Roboto',
    },
    t: {
      fontFamily: 'Roboto'
    }
  },
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#A5C9CA',
      darker: '#5e35b1',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

export default theme;
