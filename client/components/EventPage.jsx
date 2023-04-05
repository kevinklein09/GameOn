import { useParams } from 'react-router-dom';
import { UserContext } from '../index.jsx';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

function EventPage() {
  const { eventId } = useParams();
  const context = useContext(UserContext);
  // use the eventId to fetch data for the specific event
  const [event, setEvent] = useState({});

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = () => {
    axios.get(`/eventPage/${eventId}`)
      .then((event) => {
        console.log(event);
        setEvent(event.data);
      })
      .catch((err) => {
        console.error('failed to get event:', err);
      });
  };

  if (context) {
    return (
      <div>
        {event?.locName}
      </div>
    );
  }
}

export default EventPage;
