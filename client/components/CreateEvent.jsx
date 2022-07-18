/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import axios from 'axios';
import SportsSelect from './SportsSelect.jsx';

const CreateEvents = () => {
  const [sport, setSport] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [playerLimit, setPlayerLimit] = useState(0);

  const handleSelectSport = (e) => {
    setSport(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleTime = (e) => {
    setTime(e.target.value);
  }

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handlePlayerLimit = (e) => {
    setPlayerLimit(JSON.parse(e.target.value));
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

        <div id="playerLimit">
          <input onChange={(e) => handlePlayerLimit(e)} type='number'></input> # of players
        </div>

        <div id='location'>
          <input onChange={(e) => handleLocation(e)} type='text' defaultValue='event address'></input>
        </div>

        <div id='equipment'>
          <input type='text' defaultValue='list equipment here'></input>
          <button> add item </button>
        </div>

        <div id='date'>
          <input onChange={(e) => handleDate(e)} type='date'></input>
        </div>

        <div id='time'>
          <input onChange={(e) => handleTime(e)} type='time'></input>
        </div>

        <div id='submit'>
          <button> POST EVENT </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvents;
