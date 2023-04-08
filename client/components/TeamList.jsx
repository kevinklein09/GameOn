/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import TeamSelect from './TeamSelect.jsx';
import Team from './Team.jsx';
import { UserContext } from '../index.jsx';

const TeamList = () => {
  const context = useContext(UserContext);
  const [teams, setTeams] = useState([]);

  // Function to retrieve teams that are selected by the TeamSelect button
  const handleTeamSelect = (e) => {
    axios.get('/api/teamList')
      .then((teamData) => {
        setTeams(
          teamData.data.filter((current) => e.teamName === current.teamName),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Function to retrieve all listed teams
  const getAllTeams = () => {
    axios
      .get('/api/teamList')
      .then((teamData) => {
        setTeams(teamData.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Hook which calls getAllTeams
  useEffect(() => {
    getAllTeams();
  }, [context]);

  if (context) {
    return (
      <div>
        <br></br><br></br>
        <Typography variant='h4'>Teams</Typography><button id='all-button' onClick={getAllTeams}>Show All Teams</button>
        <TeamSelect handleTeamSelect={ handleTeamSelect } />
        {teams.map((team, i) => (<><Team teamData={team} class='team' key={`team: ${i}`} /></>))}
      </div>
    );
  }

  return (
    <div align='center'>
      <br></br>
      <h3>You must be logged in to view the teams</h3>
      <img
        width='200'
        height='100%'
        src='https://giffiles.alphacoders.com/102/102598.gif'
      />
    </div>
  );
};
export default TeamList;
