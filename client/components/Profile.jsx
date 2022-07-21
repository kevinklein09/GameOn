/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../index';

const axios = require('axios');


const Profile = () => {
  const user = useContext(UserContext);

  const [userEvents, setUserEvents] = useState([]);
  const getUserEvents = () => {
    axios.get('/api/eventListings')
      .then((events) => {
        console.log(events.data.filter((event) => event.owner === user));

        setUserEvents(events.data.filter((event) => event.owner === user))
      })
      .catch(() => console.log(oops));
  };

  useEffect(() => {
    getUserEvents();
  }, [])

  // console.log('LINE 8 PROFILE USER', user)
  // useEffect(() => {
  //   axios.get('/users')
  //     .then((usersData) => {
  //       console.log(usersData);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // });

  const handleDelete = () => {
    
  }

  const userOrNull = () => { return user ? user : 'please login' };

  return (
    <div>
      <h1>
          WELCOME TO THE PROFILE PAGE
      </h1>
      <p>Hello, User: </p>
      <div>
        <h2>NAME</h2>
        <p>{ userOrNull() }</p>
      </div>
      <div>
        <h2>EMAIL</h2>
        <p>{ userOrNull() }</p>
      </div>
      <div>
        <h2>USERNAME</h2>
        <input type='text' id='username' name ='username' value='{modifiable username here}'></input>
      </div>
      <div>
        <h2>EVENTS CREATED</h2>
        {userEvents.map((event, i) =>
        <div key={i} style={{display: 'flex', backgroundColor: 'white', marginTop: '10px', whiteSpace: 'nowrap'}}>
          <p style={{marginLeft: '10px'}}>{event.catName}</p>
          <p style={{marginLeft: '30px'}}><b>Date: </b>{`${event.date}`.substring(0, 10)}</p>
          <p style={{marginLeft: '30px'}}><b>Location: </b>{event.address}</p>
          <button style={{marginLeft: 'auto'}}> delete </button>
        </div>
        )}
      </div>
      <div>
        <h2>EVENTS ATTENDING</h2>
        <input type='text' id='eventAttending' name ='eventsAttending' value='{modifiable events user is attending here}'></input>
      </div>
    </div>
  );
};

export default Profile;
