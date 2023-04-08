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
//Team functionality additions:


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
  const [teamDrop, setTeam] = useState('');
  // const [eventCount, setEventCount] = useState(0);

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

  return (
    <ThemeProvider theme={theme}>
      <div class='card'>
        <Typography variant='h4'>
          <p class='card-text'>{props.eventData.catName}</p>
        </Typography>
        <p class='card-text'>{props.eventData.description}</p>
        <p class='card-text'>
          <CalendarMonthIcon sx={{ color: black }} />{' '}
          {moment(props.eventData.date).add(1, 'day').format('MMMM Do YYYY')} |{' '}
          {moment(props.eventData.time, 'h:mm a').format('h:mm a')}
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
            <div>{props.eventData.hostTeam}</div>
            <div>{teamDrop}</div>
          </FormGroup>
          <Link to={`/eventPage/${props.eventData._id}`} className='card-link'>
            Bulletin Board
          </Link>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default Event;
