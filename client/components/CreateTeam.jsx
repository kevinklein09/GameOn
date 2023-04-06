import React, { useState, useContext } from 'react';
import axios from 'axios';


// Component Imports
import TeamSelect from './TeamSelect.jsx';
import PlayerList from './PlayerList.jsx';

// MUI Imports
import {
    Typography,
    Button,
    Fab,
    OutlinedInput,
    ThemeProvider,
  } from '@mui/material';
import theme from './Theme.jsx';

// Other Imports
import { UserContext } from '../index.jsx';



  //Team poster goes below


  //





const CreateTeam = () => {
    const context = useContext(UserContext)



const [description, setTeamName] = useState('');
const [player, setPlayers] = useState([]);

const handleTeamName = (e) => {
    setTeamName(e.target.value);
  };

const handlePlayers = (e) => {
    setPlayers



   if (context) {
     return (
        <div>
        <ThemeProvider theme={theme}>
      <Typography
        style={{ color: '#A5C9CA' }}
        align='center'
        variant='h3'
        gutterBottom={ true }
      >
        CREATE TEAM
      </Typography>
      <div id='description'>
          <OutlinedInput
            style={{ backgroundColor: 'white', marginTop: '10px' }}
            multiline={true}
            rows='1'
            placeholder='enter team name here (*required)'
            fullWidth={true}
            inputProps={{
              maxLength: 500,
              onChange: (e) => handleTeamName(e),
              value: description,
            }}
          />
        </div>

      </ThemeProvider>
      </div>
    )
   }
    return (
        <div align='center'>
          <br></br>
          <h3>
          You must be logged in to create a team
          </h3>
          <img width='200' height='100%' src='https://manbitesfrog.com/wp-content/uploads/2021/10/giphy-1-2.gif'/>
        </div>
    );
  };
};

  export default CreateTeam;