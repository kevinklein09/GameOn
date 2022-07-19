/* eslint-disable no-unused-vars */ 
/* eslint-disable import/extensions */ 
/* eslint linebreak-style: ['error', 'windows'] */ 
/* eslint-disable */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sports from './SportsSelect';
import Event from './Event.jsx';

const EventListings = (props) => {
  const [events, setEvents] = useState([]);
  const [dates, setdate] = useState()

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
    <h1>See all da events</h1>
    <Sports />
    <button>Sort by Dist  ance</button>
    { events.map((event, i) => {
      return <Event eventData={ event } class="event" key={ `event: ${i}` }/> 
    }) }
  </div>
)

};
export default EventListings;

//   return (
//     <div>
//       <h1>SEE ALL DA hey whats up</h1>
 
//        <Sports />
//        <button>Sort by Date</button>
//        <button>Sort by DI ST ANC   E</button>
//        {
//         events.map((event, i) => {
//           return (
//             <div>
//             <Event class="event" key={ `event: ${i}` }/>
//             <button>Going or Not</button>
//             <div>
//        ))}
//        }
       
        
      
//     </div>
//   );
// };


// const fakeData = [
//   {
//     event: 'basketball',
//     category: 'dribble, dribble',
//   },
//   {
//     event: 'baseball',
//     category: 'home, run',
//   },
//   {
//     event: 'tennis lmfao',
//     category: 'wut',
//   },
// ];
 {/* {.map((sport, i) => {
          return <Event sport={ sport } event={ sport.event } category={ sport.category } key={ `sport ${i}` }/>
          
        })} */}