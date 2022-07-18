import React from 'react';
import Event from './Event.jsx';

const EventListings = () => {
  const fakeData = [
    {
      event: 'basketball',
      category: 'dribble, dribble',
    },
    {
      event: 'baseball',
      category: 'home, run',
    },
    {
      event: 'tennis lmfao',
      category: 'wut',
    },
  ];

  return (
    <div>
      <h1>SEE ALL DA hey whats up</h1>
      <div>
        {fakeData.map((sport, i) => {
          return <Event sport={ sport } event={ sport.event } category={ sport.category } key={ `sport ${i}` }/>
          
        })}
      </div>
    </div>
  );
};

export default EventListings;
