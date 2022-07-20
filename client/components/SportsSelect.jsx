/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint linebreak-style: ['error', 'windows'] */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from '@mui/material/Select';

const Sports = (props) => {
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
      <Select required onChange={(e) => props.handleSelectSport(e)} defaultValue='selected'>
      {/* <select required onChange={(e) => props.handleSelectSport(e)} defaultValue=''> */}
        <option value='selected' disabled hidden>
          pick a sport
        </option>
        {sports.map((sport, index) => <option key={index}>{sport.category}</option>)}
      {/* </select> */}
      </Select>*required
    </div>
  );
};

export default Sports;
