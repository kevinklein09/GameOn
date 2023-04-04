import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    axios.get('/api/leaderboard')
      .then((lbData) => {
        setLeaderboardData(lbData.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Typography>LeaderBoard</Typography>
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
