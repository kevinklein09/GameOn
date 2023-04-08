import React, { useState, useContext } from 'react';
import axios from 'axios';


// Component Imports
import PlayerList from './PlayerList.jsx';

// MUI Imports
import {
    Typography,
    Button,
    Fab,
    OutlinedInput,
    ThemeProvider,
  } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import theme from './Theme.jsx';

// Other Imports
import { UserContext } from '../index.jsx';



  //Team poster goes below


  //





const CreateTeam = () => {
    const context = useContext(UserContext)



const [teamName, setTeamName] = useState('');
const [playerList, setPlayerList] = useState([]);
const [player, setPlayer] = useState([]);
const [state, setState] = useState('');


const handleTeamName = (e) => {
    setTeamName(e.target.value);
  };

const handlePlayerList = () => {
    setPlayerList([...playerList, player]);
    setPlayer('')
  };

  const handlePlayer = (e) => {
    setPlayer(e.target.value);
  };

  const addTeam = (e) => {
    // prevent form from refreshing upon submit
    e.preventDefault();
    // if user filled out the required fields, allow them to post
    if (teamName && playerList) {
      axios.post('/api/teamList', {
        owner: context.email,
        teamName: teamName,
        playerList: playerList
      })
        .then(() => {
          // upon successful post...
          alert('your team was added')
          // reset states
          setTeamName('');
          setPlayerList([]);
          setPlayer('');
          setState('')
        })
        // failed event create handling
        .catch(() => alert('Unable to add team!'));
    } else {
      alert('please add a team name and players ');
    }
  };



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
              value: teamName,
            }}
          />
        </div>

        <div id='playerList'>
          <OutlinedInput
            style= {{ backgroundColor: 'white', marginTop: '10px' }}
            inputProps={{
              onChange: (e) => handlePlayer(e),
              maxLength: '20',
              placeholder: 'add player here',
              value: player,
            }}
          />

          <Button
            style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', marginLeft: '5px' }}
            color='primary'
            variant='contained'
            onClick={() => handlePlayerList()}
          ><b> + </b>
          </Button>
        </div>

        <PlayerList playerList={playerList}/>

        <Fab
          style={{ marginTop: '15px' }}
          size='small'
          variant='extended'
          color='primary'
          onClick={addTeam}
          type='submit'
        ><BorderColorIcon/>Add Team
        </Fab>

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


  export default CreateTeam;