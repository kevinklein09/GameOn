/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint linebreak-style: ['error', 'windows'] */
/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import Sports from './SportsSelect';
import Event from './Event.jsx';


const EventListings = (props) => {
  const [events, setEvents] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get("user");
  console.log(param);
  
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

};
export default EventListings;

/*
https://reactrouter.com/docs/en/v6/hooks/use-search-params
*/
