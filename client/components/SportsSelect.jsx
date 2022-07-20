/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint linebreak-style: ['error', 'windows'] */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Sports = ({sport, handleSelectSport}) => {
  const [sports, setSports] = useState([]);
  const getAllSports = () => {
    axios
      .get('/api/categories')
      .then((allSports) => {
        setSports(allSports.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAllSports();
  }, []);
  return (
    <div id='category'>
    {/* <Select native={true} onChange={handleSelectSport} defaultValue='test'>
      <option disabled value='test'> pick a sport </option> */}
      <select required onChange={handleSelectSport} defaultValue='test'>
        <option disabled value='test'>TEST</option>
        {sports.map((sportItem, index) => <option key={index}>{sportItem.category}</option>)}
      </select>
      {/* </Select>*required */}
    </div>
  );
};

export default Sports;
