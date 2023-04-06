/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint linebreak-style: ['error', 'windows'] */
import React from 'react';

//Small component which creates the list of players to be submitted when a team is created
const PlayerList = ({ playerList }) => (
  playerList.map((player, i) => (
    <li key={i}>{player}</li>
  ))
);

export default PlayerList;