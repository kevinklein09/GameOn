import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { black } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';
import Groups3Icon from '@mui/icons-material/Groups3';


// create materialUi theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#476A83',
      darker: '#395B64',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

const Team = (props) => {

    return (
        <ThemeProvider theme={theme}>
          <div class='card'>
            <Typography variant='h4'>
              <p class='card-text'>{props.teamData.teamName}</p>
              </Typography>
              <p class='card-text'>
              <Groups3Icon sx={{ color: black }} />{' '}
              <div>{props.teamData.playerList.map((player, i) => (<div key={`team: ${i}`}>{player}</div>))}</div>
              </p>
              <p class='card-text'>
              <StarIcon sx={{ color: black }} />{' '}
               {props.teamData.owner}
              </p>
              </div>
    </ThemeProvider>
    )
};

export default Team;




