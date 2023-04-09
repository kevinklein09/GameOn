/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { UserContext } from '../index.jsx';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { black } from '@mui/material/colors';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloudRain,
  faSnowflake,
  faCloudSun,
  faCloudShowersHeavy,
  faSmog,
  faCloudBolt,
} from '@fortawesome/free-solid-svg-icons';

const moment = require('moment');
// create materialUi theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#476A83',
      darker: '#395B64',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

const Event = (props) => {
  const [going, setGoing] = useState(false);
  // const [eventCount, setEventCount] = useState(0);

  const [weatherData, setWeatherData] = useState(null);

  const API_URL = `https://api.open-meteo.com/v1/forecast?daily=weathercode&start_date=2023-04-10&end_date=2023-04-10&timezone=auto&latitude=${props.eventData.coordinates[1]}&longitude=${props.eventData.coordinates[0]}`;

  const context = useContext(UserContext);
  // console.log(eventCount);
  // This will read the current status of whether the user is attending or not based off of what is currently in the database on page load
  const setStatus = () => {
    axios
      .get('/api/event', {
        params: {
          id: props.eventData._id,
        },
      })

      .then((event) => {
        if (event.data.attendees.includes(context._id)) {
          setGoing(true);
        } else {
          setGoing(false);
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    setStatus();
  }, []);
  // This will update the database based off of the position of the toggle switch that is selected by the user (based off of whether they are going or not)
  const handleToggle = () => {
    axios
      .get('/api/event', {
        params: {
          id: props.eventData._id,
        },
      })
      .then((event) => {
        axios
          .put('/api/event', {
            id: event.data._id,
            going,
            userId: context._id,
          })
          .then(() => {
            console.log('eventCount before update:', props.eventCount);
            if (going) {
              axios
                .put('/user', {
                  id: context._id,
                  eventCount: props.eventCount - 1,
                })
                .then((userData) => {
                  // console.log(
                  //   'evenCount after increment',
                  //   userData.data.eventCount
                  // );
                  props.setEventCount((prevState) => prevState - 1);
                })
                .catch((err) => {
                  console.error(err);
                });
            } else {
              axios
                .put('/user', {
                  id: context._id,
                  eventCount: props.eventCount + 1,
                })
                .then((userData) => {
                  props.setEventCount((prevState) => prevState + 1);
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          })
          .catch((err) => console.error(err));
      })
      .then(() => setGoing((going) => !going));
  };
  // console.log('context', context);

  // icons for types of weather
  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 0:
        return <FontAwesomeIcon icon={faSun} size='3x' beat />;
      case 1:
        return <FontAwesomeIcon icon={faCloudSun} size='3x' beat />;
      case 2:
        return <FontAwesomeIcon icon={faCloudSun} size='3x' beat />;
      case 3:
        return <FontAwesomeIcon icon={faCloudSun} size='3x' beat />;
      case 45:
        return <FontAwesomeIcon icon={faSmog} size='3x' beat />;
      case 48:
        return <FontAwesomeIcon icon={faSmog} size='3x' beat />;
      case 51:
        return <FontAwesomeIcon icon={faCloudRain} size='3x' beat />;
      case 53:
        return <FontAwesomeIcon icon={faCloudRain} size='3x' beat />;
      case 55:
        return <FontAwesomeIcon icon={faCloudRain} size='3x' beat />;
      case 61:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} size='3x' beat />;
      case 63:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} size='3x' beat />;
      case 65:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} size='3x' beat />;
      case 71:
        return <FontAwesomeIcon icon={faSnowflake} size='3x' beat />;
      case 73:
        return <FontAwesomeIcon icon={faSnowflake} size='3x' beat />;
      case 75:
        return <FontAwesomeIcon icon={faSnowflake} size='3x' beat />;
      case 80:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} size='3x' beat />;
      case 81:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} size='3x' beat />;
      case 82:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} size='3x' beat />;
      case 95:
        return <FontAwesomeIcon icon={faCloudBolt} size='3x' beat />;
      case 96:
        return <FontAwesomeIcon icon={faCloudBolt} size='3x' beat />;
      default:
        return null;
    }
  };
//GetWeather API call
  function getWeather() {
    axios
      .get('/weather', {
        params: {
          latitude: props.eventData.coordinates[1],
          longitude: props.eventData.coordinates[0],
        }
      })
       .then((res) => {
        setWeatherData(res.data.daily);
      })
      .catch((err) => {
        console.error('Failed to GET', err);
      });
  }
  //Weather UseEffect
  useEffect(() => {
    getWeather();
  }, []);


  if (weatherData) {
    return (
      <ThemeProvider theme={theme}>
        <div class='card'>
          <div className='weather-icon-container'>
            <p className='weather-icon' >
            {getWeatherIcon(weatherData.weathercode[0])}
          </p>
          </div>
          <Typography variant='h4'>
            <p class='card-text'>{props.eventData.catName}</p>
          </Typography>
          <p class='card-text'>{props.eventData.description}</p>
          <p class='card-text'>
            <CalendarMonthIcon sx={{ color: black }} />{' '}
            {moment(props.eventData.date).add(1, 'day').format('MMMM Do YYYY')}{' '}
            | {moment(props.eventData.time, 'h:mm a').format('h:mm a')}
          </p>
          <p class='card-text'>
            <LocationOnIcon sx={{ color: black }} />
            <strong>{props.eventData.locName}</strong> {props.eventData.address}
          </p>
          <div className='form-container'>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={going}
                    sx={{ color: '#476A83' }}
                    onChange={handleToggle}
                  />
                }
                label={
                  going ? (
                    <div style={{ color: 'green', fontWeight: 'bolder' }}>
                      {' '}
                      GOING <CheckCircleOutlineIcon />
                    </div>
                  ) : (
                    <div style={{ color: '#234D6A', fontWeight: 'bolder' }}>
                      RSVP?
                    </div>
                  )
                }
              />
            </FormGroup>
            <Link
              to={`/eventPage/${props.eventData._id}`}
              className='card-link'
            >
              Bulletin Board
            </Link>
          </div>
        </div>
      </ThemeProvider>
    );
  }
};
export default Event;
