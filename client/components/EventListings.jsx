/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Sports from './SportsSelect.jsx';
import Event from './Event.jsx';
import { UserContext } from '../index.jsx';

const EventListings = () => {
  const context = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [eventCount, setEventCount] = useState(0);
  // const [eventCount, setEventCount] = useState(
  //   parseInt(localStorage.getItem('eventCount')) || context.eventCount
  // );
  // event handler that will send an axios request to the server/index.js file that
  // will filter out the rendered events based off of the sports categor selected
  const handleSelectSport = (e) => {
    axios
      .get('/api/eventListings')
      .then((eventData) => {
        setEvents(
          eventData.data.filter((current) => e.category === current.catName)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // This is what will grab all of the events from the database and
  // render them onto the screen on the pageload time
  const getAllEvents = () => {
    axios
      .get('/api/eventListings')
      .then((eventData) => {
        setEvents(eventData.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const [users, setUsers] = useState([]);

  // const getUsers = () => {
  //   axios
  //     .get('/users')
  //     .then((usersObj) => {
  //       console.log(usersObj.data);
  //       setEventCount(usersObj.data.eventCount);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  useEffect(() => {
    getAllEvents();
    // getUsers();
    if (context) {
      setEventCount(context.eventCount);
    }
  }, [context]);

  // useEffect(() => {
  //   localStorage.setItem('eventCount', eventCount.toString());
  // }, [eventCount]);

  // console.log(context);
  if (context) {
    return (
      <div>
        <br></br>
        <br></br>
        <Typography variant='h4'>See all da events</Typography>
        <button id='all-button' onClick={getAllEvents}>
          Show All
        </button>
        <Sports handleSelectSport={handleSelectSport} />
        {events.map((event, i) => (
          <>
            <Event
              setEventCount={setEventCount}
              eventCount={eventCount}
              eventData={event}
              class='event'
              //key={`event: ${i}`}
            />
          </>
        ))}
      </div>
    );
  }

  return (
    <div align='center'>
      <br></br>
      <h3>You must be logged in to view the teams</h3>
      <img
        width='200'
        height='100%'
        src='https://giffiles.alphacoders.com/102/102598.gif'
      />
    </div>
  );
};
export default EventListings;
