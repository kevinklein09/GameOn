/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint linebreak-style: ['error', 'windows'] */
/* eslint-disable */

import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import Sports from './SportsSelect';
import Event from './Event.jsx';
import { UserContext } from '../index.jsx';

const EventListings = (props) => {
  const context = useContext(UserContext);
  const [events, setEvents] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get("user");
  console.log(param);
const getFilteredEvents = () => {
    axios.get()
}
  
const getAllEvents = () => {
      axios.get('/api/eventListings')
      .then((eventData) => {
        console.log(eventData);
        setEvents(eventData.data);
      })
      .catch((err) => {
        console.error(err);
      })
  }

useEffect(() => {
  getAllEvents()
}, []);


if (context) {
return (
  <div>
    <br></br><br></br>
    <h1>See all da events</h1>
    <Sports />
    { events.map((event, i) => {
      return <><Event eventData={ event } class="event" key={ `event: ${i}` }/></> 
    }) }
  </div>
)
  }

return (
  <div align='center'>
    <br></br>
  <h3>
  You must be logged in to view the events
  </h3>
  <img width='200' height='100%' src='https://giffiles.alphacoders.com/102/102598.gif'/>
</div>
);

};
export default EventListings;

/*
https://reactrouter.com/docs/en/v6/hooks/use-search-params
*/
