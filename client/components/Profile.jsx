/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../index';
import axios from 'axios';


const Profile = () => {
  const user = useContext(UserContext);
  console.log(user);

  if (user) {
    
  const [userEvents, setUserEvents] = useState([]);
  const getUserEvents = () => {
    axios.get('/api/eventListings')
      .then((events) => {
        console.log(events.data.filter((event) => event.owner === user.email));
        console.log(events.data.filter((event) => event.attendees.includes(user._id)));
  
        setUserEvents(events.data.filter((event) => event.owner === user.email));
      })
      .catch(() => console.log(oops));
  };

  const [userAttendingEvents, setUserAttendingEvents] = useState([]);
  const getUserAttendingEvents = () => {
    axios.get('/api/eventListings')
      .then((events) => {
        console.log(events.data.filter((event) => event.attendees.includes(user._id)));
  
        setUserAttendingEvents(events.data.filter((event) => event.attendees.includes(user._id)));
      })
      .catch(() => console.log(err => console.error(err)));
  };


  


  useEffect(() => {
    if (user) {
      getUserEvents();
      getUserAttendingEvents();
    }
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

  const handleDelete = (eventId) => {
    const deleteConfirmation = confirm('Are you sure you wish to delete this event?')
    if (deleteConfirmation) {
      axios.delete('/api/event', {
        data: {
          id: eventId
        }
      })
      .then(() => {
        console.log('event deleted')
        getUserEvents(); 
      })
      .catch((err) => console.error(err));
    }
  }

  
    return (
      <div>
        <h1>
            WELCOME TO THE PROFILE PAGE
        </h1>
        <div>
          <img src={user.image} height={200} width={200} />
        </div>
        <p>Hello, User: </p>
        <div>
          <h2>NAME</h2>
          <p>{ user.firstName } { user.lastName }</p>
        </div>
        <div>
          <h2>EMAIL</h2>
          <p>{ user.email }</p>
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
            {/* <button onClick={() => handleDelete(event._id)} style={{marginLeft: 'auto'}}> delete </button> */}
          </div>
          )}
        </div>
        <div>
          <h2>EVENTS ATTENDING</h2>
          {userAttendingEvents.map((event, i) =>
          <div key={i} style={{display: 'flex', backgroundColor: 'white', marginTop: '10px', whiteSpace: 'nowrap'}}>
            <p style={{marginLeft: '10px'}}>{event.catName}<br />{'\n'}{'\n'}</p>{'\n'}
            <p><br /></p>
            <p style={{marginLeft: '30px'}}><b>Date: </b>{`${event.date}`.substring(0, 10)}{'\n'}</p>{'\n'}
            <p style={{marginLeft: '30px'}}><b>Location: </b>{event.address}{'\n'}</p>{'\n'}
            <button onClick={() => handleDelete(event._id)} style={{marginLeft: 'auto'}}> delete </button>
          </div>
          )}        
        </div>
      </div>
    );

  } else {
    return (
      <div>
        <h1>PLEASE LOG IN </h1>
      </div>
    )
  }
};

export default Profile;
