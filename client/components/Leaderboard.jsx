import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const Leaderboard = () => {
  // const [leaderboardData, setLeaderboardData] = useState([]);
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios.get('/users')
      .then((usersObj) => {
        console.log(usersObj);
        setUsers(usersObj.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" component="h4" align="center">LeaderBoard</Typography>
      <Table aria-label="leaderboard">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leaderboard;
