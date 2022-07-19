/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import axios from 'axios';
import SportsSelect from './SportsSelect.jsx';
import EquipmentList from './EquipmentList.jsx';

const ENV = require('../../.env');

const { MAP_TOKEN } = ENV;
const today = new Date();

const CreateEvents = () => {
  const [sport, setSport] = useState('');
  const [description, setDescription] = useState('enter description here');
  const [location, setLocation] = useState('enter event address');
  const [date, setDate] = useState(`${today.getFullYear()}-${today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth()}-${today.getDate()}`);
  const [time, setTime] = useState('12:00');
  const [playerLimit, setPlayerLimit] = useState(0);
  const [equipment, setEquipment] = useState([]);
  const [item, setItem] = useState('list equipment here');
  let categoryId;

  if (sport) {
    axios.get('/api/categories')
      .then((categories) => {
        categoryId = categories.data.filter((category) => category.category === sport)[0]._id;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleEquipmentList = () => {
    setEquipment([...equipment, item]);
    setItem('');
  };

  const handleItem = (e) => {
    setItem(e.target.value);
  };

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
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handlePlayerLimit = (e) => {
    setPlayerLimit(JSON.parse(e.target.value));
  };

  const postEvent = () => {
    axios.post('/api/event', {
      location,
      description,
      date,
      time,
      category: categoryId,
      catName: sport,
      players: playerLimit,
      isOpen: true,
    });

    setSport('');
    setDescription('enter description here');
    setLocation('enter event address');
    setPlayerLimit(0);
    setDate(`${today.getFullYear()}-${today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth()}-${today.getDate()}`);
    setTime('12:00');
    setEquipment([]);
    setItem('list equipment here');
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
            value={description}
          >
          </textarea>
        </div>

        <div id="playerLimit">
          <input onChange={(e) => handlePlayerLimit(e)} type='number' value={playerLimit}></input> # of players
        </div>

        <div id='location'>
          <input onChange={(e) => handleLocation(e)} type='text' value={location}></input>
        </div>

        <div id='equipment'>
          <input onChange={(e) => handleItem(e)} type='text' value={item}></input>
          <button onClick={() => handleEquipmentList()}> add item </button>
        </div>
        <EquipmentList equipment={equipment}/>

        <div id='date'>
          <input value={date} onChange={(e) => handleDate(e)} type='date'></input>
        </div>

        <div id='time'>
          <input value={time} onChange={(e) => handleTime(e)} type='time'></input>
        </div>

        <div id='submit'>
          <button onClick={postEvent}> POST EVENT </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvents;

// const query = location.split(' ').join('_');
// const queryUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?type=poi&access_token=${MAP_TOKEN}`;
// console.log(queryUrl);
// axios.get(queryUrl)
//   .then((results) => {
//     console.log(results.features[0].center);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
