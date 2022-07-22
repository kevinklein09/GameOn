/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable */
import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext} from '../index';
//MUI
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import OutlinedInput from '@mui/material/OutlinedInput'
// import { createTheme, ThemeProvider} from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { Typography, Button, Fab, OutlinedInput, createTheme, ThemeProvider} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
// import AdapterJalaali from '@date-io/jalaali';
//COMPONENTS
import Sports from './SportsSelect';
import EquipmentList from './EquipmentList.jsx';
import AddressField from './AddressField.jsx';




const theme = createTheme({
  typography: {
    h3: {
      fontFamily: 'Roboto',
    },
    t: {
      fontFamily: 'Roboto'
    }
  },
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#ce93d8',
      darker: '#5e35b1',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});


const today = new Date();
const hour = today.getHours();
const minute = today.getMinutes();
console.log('TIME', hour.toString() + ':' + minute.toString())

const CreateEvents = () => {
  //user email from login
  const context = useContext(UserContext);
  if (context) {
  //states
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
    console.log(e.target.value)
    setItem(e.target.value);
    
  };

  const handleSelectSport = (e) => {
    console.log(e.category)
    setSport(e.category);
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
        setLong(results.data.features[0].center[0]);
        setLat(results.data.features[0].center[1]);
      })
      .catch((err) => {
        console.error(err);
      });
  }




  const postEvent = (e) => {
    e.preventDefault();
    if (sport && description && address){

      axios.post('/api/event', {
      owner: context.email,
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

    })
    .catch(() => alert('there are conflicting events'));
      
  } else {
    alert('please fill out the required fields')
  }
      

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

      <ThemeProvider theme={theme}>
      <Typography
        style={{color: '#172e36'}}
        align='center'
        variant='h3'
        gutterBottom={true}
      >
        CREATE EVENT
      </Typography>

      <form>
        <Sports sport={sport} handleSelectSport={handleSelectSport}/>
        

        <div id='description'>
          <OutlinedInput
            style={{backgroundColor: 'white', marginTop: '10px'}}
            multiline={true}
            rows='5'
            placeholder='enter description here (*required)'
            fullWidth={true}
            inputProps={{
              maxLength: 500,
              onChange: (e) => handleDescription(e),
              value: description
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
            style= {{backgroundColor: '#1c1c1c', color: '#ce93d8', marginTop: '10px'}}
            inputProps={{
              type:'number',
              onChange: (e) => handlePlayerLimit(e),
              min: 1,
              max: 100,
              value: playerLimit,
            }}
          /> <Typography variant='t'>
              # of players 
            </Typography>
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
          <OutlinedInput
            style= {{backgroundColor: 'white', marginTop: '10px'}}
            inputProps={{
              onChange: (e) => handleItem(e),
              maxLength: '20',
              placeholder: 'list equipment here',
              value: item
            }}
          />
{/* 
          <input
            type='text'
            onChange={(e) => handleItem(e)}
            maxLength='20'
            placeholder='list equipment here'
            value={item}
          /> */}

          <Button  style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} color='primary' variant="contained" onClick={() => handleEquipmentList()}> <b> + </b> </Button>
        </div>

        <EquipmentList equipment={equipment}/>
        {/* <LocalizationProvider dateAdapter={AdapterJalaali}>
        <DateRangePicker/>
        </LocalizationProvider> */}
        <div style={{marginTop: '10px'}} id='dateTime'>
          <OutlinedInput
            style={{marginRight: '10px', backgroundColor: '#1c1c1c', color: 'pink'}}
            inputProps={{
              color: 'pink',
              type: 'date',
              value: date,
              onChange: (e) => handleDate(e),
              min: `${today.getFullYear()}-${today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth()}-${today.getDate()}`,

            }}
          >
          </OutlinedInput>
          {/* <input
            value={date}
            onChange={(e) => handleDate(e)}
            type='date'
            min={`${today.getFullYear()}-${today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth()}-${today.getDate()}`}
          /> */}
          <OutlinedInput
            style={{marginRight: '10px', backgroundColor: '#1c1c1c', color: 'pink'}}
            inputProps={{
              color: 'pink',
              type: 'time',
              onChange: (e) => handleTime(e),
              value: time
            }}
          >
          </OutlinedInput>
          {/* <input
            type='time'
            value={time}
            onChange={(e) => handleTime(e)}
          /> */}
        </div>

        <Fab style={{marginTop: '15px'}} size='small' variant='extended' color='primary' onClick={postEvent} type='submit'><BorderColorIcon/>     Create Event</Fab>

        </form>
      </ThemeProvider>

    </div>
  );
  } else {
    return (
      <div align='center'>
        <h3>
        You must be logged in to create an event
        </h3>
        <img width='200' height='100%' src='https://manbitesfrog.com/wp-content/uploads/2021/10/giphy-1-2.gif'/>
      </div>
    )
  }
};

export default CreateEvents;
