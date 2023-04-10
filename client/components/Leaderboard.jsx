import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { UserContext } from '../index.jsx';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const context = useContext(UserContext);
  // console.log(users);

  const getUsers = () => {
    axios
      .get('/users')
      .then((usersObj) => {
        const sortedUsers = usersObj.data.sort(
          (a, b) => b.eventCount - a.eventCount
        );
        setUsers(sortedUsers);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (context) {
    return (
      <TableContainer component={Paper}>
        <Typography variant='h4' component='h4' align='center'>
          LeaderBoard
        </Typography>
        <Table aria-label='leaderboard'>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.eventCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return (
    <div align='center'>
      <br></br>
      <h3>You must be logged in to view the leaderboard</h3>
      <img
        width='200'
        height='100%'
        src='https://media4.giphy.com/media/js585wl3Qpq1UdOITv/giphy.gif?cid=ecf05e47hx3hiuhu1eq85aimqdh3nzva4u0vs0hnqyar0sjg&rid=giphy.gif&ct=g'
      />
    </div>
  );
};

export default Leaderboard;
