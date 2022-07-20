/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//MUI
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput'
import { createTheme, ThemeProvider} from '@mui/material/styles';
import DatePicker from '@mui/x-date-pickers-pro/DatePicker'
import TimePicker from '@mui/x-date-pickers-pro/TimePicker';
//COMPONENTS
import Sports from './SportsSelect';
import EquipmentList from './EquipmentList.jsx';
import AddressField from './AddressField.jsx';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#5e35b1',
      darker: '#5e35b1',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});



const today = new Date();

const CreateEvents = () => {
  const [sport, setSport] = useState('');
  const [description, setDescription] = useState('');
  // const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  // const [coords, setCoords] = useState([]);
  const [date, setDate] = useState(`${today.getFullYear()}-${today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth()}-${today.getDate()}`);
  const [time, setTime] = useState('12:00');
  const [playerLimit, setPlayerLimit] = useState(1);
  const [equipment, setEquipment] = useState([]);
  const [item, setItem] = useState('');
  let categoryId;
  let location = `${address} ${city} ${state} ${zip}`

  if (playerLimit < 1) {
    setPlayerLimit(1)
  }

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
    console.log(e.target.value);
    setSport(e.target.value);
  };

  const handleDescription = (e) => {
    console.log(e.target.value)
    setDescription(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleTime = (e) => {
    setTime(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handleState = (e) => {
    setState(e.target.value);
  };
  const handleZip = (e) => {
    setZip(e.target.value);
    getCoords();
  };

  const handlePlayerLimit = (e) => {
    setPlayerLimit(JSON.parse(e.target.value));
  };

  const getCoords = () => {
    const query = location.split(' ').join('_');
    const queryUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?type=poi&access_token=${MAP_TOKEN}`;
    axios.get(queryUrl)
      .then((results) => {
        console.log(results.data.features[0].center)
        setLong(results.data.features[0].center[0]);
        setLat(results.data.features[0].center[1]);
      })
      .catch((err) => {
        console.error(err);
      });
  }


  const postEvent = (e) => {
    e.preventDefault();

      axios.post('/api/event', {
      address: location,
      description,
      date,
      time,
      coordinates: [long, lat],
      category: categoryId,
      catName: sport,
      players: playerLimit,
      isOpen: true,
    })
    .then(() => {
      alert('your event was created!')
      if (sport && description && address){
        setDescription('');
        setAddress('');
        setCity('');
        setState('');
        setZip('');
        // setCoords([]);
        setLong(0);
        setLat(0);
        // setLocation('');
        setPlayerLimit(1);
        setDate(`${today.getFullYear()}-${today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth()}-${today.getDate()}`);
        setTime('12:00');
        setEquipment([]);
        setItem('');
  
      }
    })
    .catch(() => console.error('OOPs'));
      

    // if (sport && description && address){
    //   setDescription('');
    //   setAddress('');
    //   setCity('');
    //   setState('');
    //   setZip('');
    //   // setCoords([]);
    //   setLong(0);
    //   setLat(0);
    //   // setLocation('');
    //   setPlayerLimit(1);
    //   setDate(`${today.getFullYear()}-${today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth()}-${today.getDate()}`);
    //   setTime('12:00');
    //   setEquipment([]);
    //   setItem('');

    // }
  };


  return (
    <div>

      <h1>THIS IS WHERE YOU CREATE NEW EVENTS</h1>

      <form>
      <ThemeProvider theme={theme}>
        <Sports sport={sport} handleSelectSport={handleSelectSport}/>
        

        <div id='description'>
          <OutlinedInput
            style={{backgroundColor: 'white', marginTop: '10px'}}
            multiline={true}
            rows='5'
            placeholder='enter description here'
            fullWidth={true}
            colorSecondary
            inputProps={{
              maxLength: 500,
              onChange: (e) => handleDescription(e)
            }}
          />
          {/* <textarea
            rows='5'
            cols='60'
            maxLength='500'
            onChange={(e) => handleDescription(e)}
            value={description}
            placeholder='enter description here'
            required
          />*required */}
        </div>

        <div id="playerLimit">
          <OutlinedInput
            style= {{backgroundColor: 'white', marginTop: '10px'}}
            inputProps={{
              type:'number',
              onChange: (e) => handlePlayerLimit(e),
              min: 1,
              max: 100,
              value: playerLimit,
            }}
          /> # of players 
          {/* <input
            type='number'
            onChange={(e) => handlePlayerLimit(e)}
            min='1' max='100'
            value={playerLimit}
          /> */}
        </div>

        <AddressField
          handleAddress={handleAddress}
          handleCity={handleCity}
          handleState={handleState}
          handleZip={handleZip}
          address={address}
          city={city}
          state={state}
          zip={zip}
        />


        {/* <div id='location'>
          <input
            type='text'
            maxLength='100'
            onChange={(e) => handleLocation(e)}
            placeholder='enter event address'
            value={location}
            required
          />
        </div> */}

        <div id='equipment'>
          <input
            type='text'
            onChange={(e) => handleItem(e)}
            maxLength='20'
            placeholder='list equipment here'
            value={item}
          />

            <Button  color='primary' variant="contained" onClick={() => handleEquipmentList()}> add item </Button>
        </div>

        <EquipmentList equipment={equipment}/>
        <DatePicker
        
        />
        <div id='date'>
          <input
            value={date}
            onChange={(e) => handleDate(e)}
            type='date'
          />
        </div>

        <div id='time'>
          <input
            type='time'
            value={time}
            onChange={(e) => handleTime(e)}
          />
        </div>

        <Button variant='contained' color='primary' onClick={postEvent} type='submit'>SUBMIT</Button>

        </ThemeProvider>
      </form>
    </div>
  );
};

export default CreateEvents;
