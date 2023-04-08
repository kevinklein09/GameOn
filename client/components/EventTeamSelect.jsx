/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint linebreak-style: ['error', 'windows'] */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const EventTeamSelect = ({ team, handleHostTeam }) => {
    const [teams, setTeams] = useState([]);
    const [teamDrop, setHostTeam] = useState('');


    const getAllTeams = () => {
      axios
        .get('/api/teamList')
        .then((allTeams) => {
          setTeams(allTeams.data);
        })
        .catch((err) => console.error(err));
    };



    const handleChange = (event) => {
      setHostTeam(event.target.value);
    };

    useEffect(() => {
      getAllTeams();
    }, []);


    return (
      <div id='category'>
      <FormControl>
      <Select
        autoWidth= {true}
        variant='standard'
        style={{ padding: '10px', backgroundColor: '#1c1c1c', color: '#A5C9CA', marginTop: '10px' }}
        inputProps={{
          defaultValue: 'test',
        }}
        >
        {/* // onChange={handleSelectTeam} defaultValue='test'> */}
        <MenuItem style={{ backgroundColor: '#A5C9CA', color: '#1c1c1c' }} disabled value='test'> <b>{team || 'Add Host Team'}</b> </MenuItem>
        {teams.map(
          (teamItem, index) =>
          <MenuItem
            style={{ backgroundColor: '#A5C9CA', color: '#1c1c1c' }}
            onClick ={() => handleHostTeam(teamItem)}
            onChange = {handleChange}
            key={index}
            value={teamItem.teamName}
          >{teamItem.teamName}</MenuItem>,
        )}
        </Select>
        </FormControl>
      </div>
    );
  };

  export default EventTeamSelect;