import React from 'react';

const Event = ({ sport }) => {
  console.log(sport);
  return (
    <>
      <div>
        <div>{ sport.event }</div>
        <div>{ sport.category }</div>
      </div>
    </>
  );
};

export default Event;
