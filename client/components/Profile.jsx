import React, { useState, useEffect } from 'react';

const axios = require('axios');

const Profile = () => {
  useEffect(() => {
    axios.get('/users')
      .then((usersData) => {
        // console.log(usersData);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  return (
      <div>
        <h1>
            WELCOME TO THE PROFILE PAGE
        </h1>
        <p>Hello, User: </p>
      </div>
  );
};

export default Profile;
