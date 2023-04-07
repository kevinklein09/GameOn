/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint linebreak-style: ['error', 'windows'] */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const TeamSelect = ({ team, handleSelectTeam }) => {
    const [teams, setTeams] = useState([]);
    const [teamDrop, setTeam] = useState('');
    const getAllTeams = () => {
      axios
        .get('/api/teamList')
        .then((allTeams) => {
          setTeams(allTeams.data);
        })
        .catch((err) => console.error(err));
    };

    const handleChange = (event) => {
      setTeam(event.target.value);
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
        style={{ padding: '10px', backgroundColor: '#1c1c1c', color: '#A5C9CA' }}
        inputProps={{
          defaultValue: 'test',
        }}
        >
        {/* // onChange={handleSelectTeam} defaultValue='test'> */}
        <MenuItem style={{ backgroundColor: '#A5C9CA', color: '#1c1c1c' }} disabled value='test'> <b>{team || 'Choose A Team'}</b> </MenuItem>
        {teams.map(
          (teamItem, index) =>
          <MenuItem
            style={{ backgroundColor: '#A5C9CA', color: '#1c1c1c' }}
            onClick ={() => handleSelectTeam(teamItem)}
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

  export default TeamSelect;