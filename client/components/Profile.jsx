import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../index';

const axios = require('axios');

const Profile = () => {
  const user = useContext(UserContext)
  console.log('LINE 8 PROFILE USER', user)
  // useEffect(() => {
  //   axios.get('/users')
  //     .then((usersData) => {
  //       console.log(usersData);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // });

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
        <input type='text' id='eventCreated' name ='eventsCreated' value='{modifiable user created events here}'></input>
      </div>
      <div>
        <h2>EVENTS ATTENDING</h2>
        <input type='text' id='eventAttending' name ='eventsAttending' value='{modifiable events user is attending here}'></input>
      </div>
    </div>
  );
};

export default Profile;
