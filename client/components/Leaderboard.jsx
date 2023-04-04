import React, { useEffect, useState } from 'react';
import { makeStyle } from '@mui/material/styles';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    axios.get('/api/leaderboard')
      .then((lbData) => {
        setLeaderboardData(lbData.data);
      })
      .catch((err) => {
        console.error(err);
      })
  })
};

export default Leaderboard;
