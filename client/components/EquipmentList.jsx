/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint linebreak-style: ['error', 'windows'] */
import React from 'react';
import axios from 'axios';

const EquipmentList = ({ equipment, eventId }) =>
  equipment.map((item, i) => <li key={i}>{item}</li>);

export default EquipmentList;
