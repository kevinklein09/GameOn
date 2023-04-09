import React, { useState, useContext } from 'react';
import axios from 'axios';

// MUI
import {
  Typography,
  Button,
  Fab,
  OutlinedInput,
  ThemeProvider,
} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import theme from './Theme.jsx';

// IMPORTED COMPONENTS
import Sports from './SportsSelect.jsx';
import EquipmentList from './EquipmentList.jsx';
import AddressField from './AddressField.jsx';
import EventTeamSelect from './EventTeamSelect.jsx';

// IMPORTED google context
import { UserContext } from '../index.jsx';

const CreateEvents = () => {
  const today = new Date();

  const context = useContext(UserContext);

  // if user is logged in
  if (context) {
    // states
    const [sport, setSport] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [long, setLong] = useState(0);
    const [lat, setLat] = useState(0);
    const [date, setDate] = useState(
      `${today.getFullYear()}-${
        today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth()
      }-${today.getDate()}`
    );
    const [time, setTime] = useState('12:00');
    const [hostTeam, setHostTeam] = useState('');
    const [playerLimit, setPlayerLimit] = useState(1);
    const [equipment, setEquipment] = useState([]);
    const [item, setItem] = useState('');
    let categoryId;
    let eventHostTeam = { teamName: '' };
    const fullAddress = `${address} ${city} ${state} ${zip}`;
    // get initial coordinates
    const getCoords = () => {
      const query = fullAddress.split(' ').join('_');
      const queryUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?type=poi&access_token=${MAP_TOKEN}`;
      axios
        .get(queryUrl)
        .then((results) => {
          setLong(results.data.features[0].center[0]);
          setLat(results.data.features[0].center[1]);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    // make it so users cant set player limit less than 1
    if (playerLimit < 1) {
      setPlayerLimit(1);
    }

    // if a sport is selected, find set the category Id variable to the one selected
    if (sport) {
      axios
        .get('/api/categories')
        .then((categories) => {
          categoryId = categories.data.filter(
            (category) => category.category === sport
          )[0]._id;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (hostTeam) {
      axios
        .get('/api/teamList')
        .then((teamData) => {
          eventHostTeam = teamData.data.filter(
            (team) => team.teamName === hostTeam
          )[0];
        })
        .catch((err) => {
          console.error(err);
        });
    }

    // HANDLERS
    const handleEquipmentList = () => {
      setEquipment([...equipment, { item, isChecked: false }]);
      setItem('');
    };

    const handleItem = (e) => {
      setItem(e.target.value);
    };

    const handleSelectSport = (e) => {
      setSport(e.category);
    };

    const handleDescription = (e) => {
      setDescription(e.target.value);
    };

    const handleDate = (e) => {
      setDate(e.target.value);
    };

    const handleLocation = (e) => {
      setLocation(e.target.value);
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

    const handleHostTeam = (e) => {
      setHostTeam(e.teamName);
    };

    const handlePlayerLimit = (e) => {
      setPlayerLimit(JSON.parse(e.target.value));
    };

    // Post request handling server side
    const postEvent = (e) => {
      // prevent form from refreshing upon submit
      e.preventDefault();
      // if user filled out the required fields, allow them to post
      if (sport && description && address) {
        axios
          .post('/api/event', {
            owner: context.email,
            address: fullAddress,
            locName: location,
            description,
            date,
            time,
            coordinates: [long, lat],
            category: categoryId,
            catName: sport,
            hostTeam: eventHostTeam.teamName,
            players: playerLimit,
            isOpen: true,
            attendees: [context._id],
            equipment,
          })
          .then(() => {
            // upon successful post...
            alert('your event was created!');
            // reset states
            setDescription('');
            setAddress('');
            setCity('');
            setState('');
            setZip('');
            setLong(0);
            setLat(0);
            setLocation('');
            setHostTeam('');
            setPlayerLimit(1);
            setDate(
              `${today.getFullYear()}-${
                today.getMonth() < 10
                  ? `0${today.getMonth() + 1}`
                  : today.getMonth()
              }-${today.getDate()}`
            );
            setTime('12:00');
            setEquipment([]);
            setItem('');
          })
          // failed event create handling
          .catch(() => alert('there are conflicting events'));
      } else {
        alert('please fill out the required fields');
      }
    };

    return (
      <div>
        <ThemeProvider theme={theme}>
          <Typography
            style={{ color: '#A5C9CA' }}
            align='center'
            variant='h3'
            gutterBottom={true}
          >
            CREATE EVENT
          </Typography>

          <form>
            <Sports sport={sport} handleSelectSport={handleSelectSport} />
            <div id='description'>
              <OutlinedInput
                style={{ backgroundColor: 'white', marginTop: '10px' }}
                multiline={true}
                rows='5'
                placeholder='enter description here (*required)'
                fullWidth={true}
                inputProps={{
                  maxLength: 500,
                  onChange: (e) => handleDescription(e),
                  value: description,
                }}
              />
            </div>
            <EventTeamSelect
              hostTeam={hostTeam}
              handleHostTeam={handleHostTeam}
            />
            <div id='playerLimit'>
              <OutlinedInput
                style={{
                  backgroundColor: '#1c1c1c',
                  color: '#A5C9CA',
                  marginTop: '10px',
                }}
                inputProps={{
                  type: 'number',
                  onChange: (e) => handlePlayerLimit(e),
                  min: 1,
                  max: 100,
                  value: playerLimit,
                }}
              />{' '}
              <Typography variant='t'># of players</Typography>
            </div>

            <OutlinedInput
              style={{ backgroundColor: 'white', marginTop: '10px' }}
              rows='1'
              placeholder='location name (optional)'
              fullWidth={true}
              inputProps={{
                maxLength: 20,
                onChange: (e) => handleLocation(e),
                value: location,
              }}
            />

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
            <div id='equipment'>
              <OutlinedInput
                style={{ backgroundColor: 'white', marginTop: '10px' }}
                inputProps={{
                  onChange: (e) => handleItem(e),
                  maxLength: '20',
                  placeholder: 'list equipment here',
                  value: item,
                }}
              />

              <Button
                style={{
                  maxWidth: '30px',
                  maxHeight: '30px',
                  minWidth: '30px',
                  minHeight: '30px',
                }}
                color='primary'
                variant='contained'
                onClick={() => handleEquipmentList()}
              >
                <b> + </b>
              </Button>
            </div>

            <EquipmentList equipment={equipment} />

            <div style={{ marginTop: '10px' }} id='dateTime'>
              <OutlinedInput
                style={{
                  marginRight: '10px',
                  backgroundColor: '#1c1c1c',
                  color: '#A5C9CA',
                }}
                inputProps={{
                  color: 'pink',
                  type: 'date',
                  value: date,
                  onChange: (e) => handleDate(e),
                  min: `${today.getFullYear()}-${
                    today.getMonth() < 10
                      ? `0${today.getMonth() + 1}`
                      : today.getMonth()
                  }-${today.getDate()}`,
                }}
              ></OutlinedInput>
              <OutlinedInput
                style={{
                  marginRight: '10px',
                  backgroundColor: '#1c1c1c',
                  color: '#A5C9CA',
                }}
                inputProps={{
                  color: 'pink',
                  type: 'time',
                  onChange: (e) => handleTime(e),
                  value: time,
                }}
              ></OutlinedInput>
            </div>

            <Fab
              style={{ marginTop: '15px' }}
              size='small'
              variant='extended'
              color='primary'
              onClick={postEvent}
              type='submit'
            >
              <BorderColorIcon />
              Create Event
            </Fab>
          </form>
        </ThemeProvider>
      </div>
    );
  }
  return (
    <div align='center'>
      <br></br>
      <h3>You must be logged in to create an event</h3>
      <img
        width='200'
        height='100%'
        src='https://manbitesfrog.com/wp-content/uploads/2021/10/giphy-1-2.gif'
      />
    </div>
  );
};

export default CreateEvents;
