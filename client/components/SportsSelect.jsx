/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint linebreak-style: ['error', 'windows'] */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const Sports = ({ sport, handleSelectSport }) => {
  const [sports, setSports] = useState([]);
  const [sportDrop, setSport] = useState('');
  const getAllSports = () => {
    axios
      .get('/api/categories')
      .then((allSports) => {
        setSports(allSports.data);
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (event) => {
    setSport(event.target.value);
  };

  useEffect(() => {
    getAllSports();
  }, []);

  return (
    <div id='category'>
    <FormControl>
    <Select
      autoWidth= {true}
      variant='standard'
      style={{ padding: '10px', backgroundColor: '#1c1c1c', color: '#A5C9CA' }}
      inputProps={{
        defaultValue: 'test',
      }}
      >
      {/* // onChange={handleSelectSport} defaultValue='test'> */}
      <MenuItem style={{ backgroundColor: '#A5C9CA', color: '#1c1c1c' }} disabled value='test'> <b>{sport || 'choose a sport'}</b> </MenuItem>
      {sports.map(
        (sportItem, index) =>
        <MenuItem
          style={{ backgroundColor: '#A5C9CA', color: '#1c1c1c' }}
          onClick ={() => handleSelectSport(sportItem)}
          onChange = {handleChange}
          key={index}
          value={sportItem.category}
        >{sportItem.category}</MenuItem>,
      )}
      </Select>*required
      </FormControl>
    </div>
  );
};

export default Sports;
