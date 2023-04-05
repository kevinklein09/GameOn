import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import TeamSelect from './TeamSelect.jsx';
import Team from './Team.jsx'
import { UserContext } from '../index.jsx';



const TeamList = () => {
    const context = useContext(UserContext);
    const [teams, setTeams] = useState([]);
    
    // Function to retrieve teams that are selected by the TeamSelect button
    const handleTeamSelect = (e) => {
      axios.get('/api/teamList')
        .then((teamData) => {
          setTeams(
            teamData.data.filter((current) => team.teamName === current.teamName),
          );
        })
        .catch((err) => {
          console.error(err);
        });
    };
    
  //Function to retrieve all listed teams
  const getAllTeams = () => {
    axios.get('/api/teamList')
      .then((teamData) => {
        setTeams(teamData.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //Hook which calls getAllTeams
  useEffect(() => {
    getAllTeams();
  }, []);

  if (context) {
    return (
    <div>
    <br></br><br></br>
    <Typography variant="h4">See all Teams</Typography><button id='all-button' onClick={getAllTeams}>Show All</button>
    <TeamSelect handleTeamSelect={ handleTeamSelect }/>
    { teams.map((team, i) => <><Team teamData={ teamData } class="team" key={ `team: ${i}` }/></>) }
    </div>
    )
  }
  
}