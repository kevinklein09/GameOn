import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../index.jsx';

const CreateTeam = () => {
    const context = useContext(UserContext)

   if (context) {
     return (
        <div>This is where the Team Creation feature will be</div>
    )
   }
    return (
        <div align='center'>
          <br></br>
          <h3>
          You must be logged in to create a team
          </h3>
          <img width='200' height='100%' src='https://manbitesfrog.com/wp-content/uploads/2021/10/giphy-1-2.gif'/>
        </div>
    );
  };

  export default CreateTeam;