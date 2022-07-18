/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import axios from 'axios';
import SportsSelect from './SportsSelect.jsx';

const CreateEvents = () => {
  const [sport, setSport] = useState('');
  const [description, setDescription] = useState('');

  const handleSelectSport = (e) => {
    setSport(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div>
      <h1>THIS IS WHERE YOU CREATE NEW EVENTS</h1>

      <form>
        <SportsSelect handleSelectSport={handleSelectSport}/>

        <div id='description'>
          <textarea
            rows='5'
            cols='60'
            onChange={(e) => handleDescription(e)}
          >
            Enter Description Here
          </textarea>
        </div>

        <div id='location'>
          <input type='text' value='insert location here'></input>
        </div>

        <div id='equipment'>
          <input type='text' value='list equipment here'></input>
          <button> add item </button>
        </div>

        <div id='date'>
          <input type='date'></input>
        </div>

        <div id='submit'>
          <button> POST EVENT </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvents;
