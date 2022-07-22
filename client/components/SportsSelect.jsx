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
    <Select
      autoWidth= {true} 
      variant='standard'
      style={{ padding: '10px', backgroundColor: '#1c1c1c', color: '#ce93d8' }}
      inputProps={{
        defaultValue: 'test',
      }}
      >
      {/* // onChange={handleSelectSport} defaultValue='test'> */}
      <MenuItem style={{ backgroundColor: '#ce93d8', color: '#1c1c1c' }} disabled value='test'> <b>{sport || 'choose a sport'}</b> </MenuItem>
      {sports.map(
        (sportItem, index) =>
        <MenuItem
          style={{ backgroundColor: '#ce93d8', color: '#1c1c1c' }}
          onClick ={() => handleSelectSport(sportItem)}
          key={index}
        >{sportItem.category}</MenuItem>)}
      {/* <select required onChange={handleSelectSport} defaultValue='test'>
        <option disabled value='test'>TEST</option>

      </select> */}
      </Select>*required
    </div>
  );
};

export default Sports;
