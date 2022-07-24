/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../index';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Profile = () => {
  // set context to usercontext defined in index.jsx
  const user = useContext(UserContext);

  // set state for accordion list expansion animation
  const [expanded, setExpanded] = React.useState(null);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // if conditional to prevent user from viewing profile page if not logged in
  // wrapped around whole functions body
  if (user) {

  // set State to get user events that they have created to populate list of these event in profile
  const [userEvents, setUserEvents] = useState([]);
  // same as line above except for events that user has rsvp'd to in games section
  const [userAttendingEvents, setUserAttendingEvents] = useState([]);

  // function to get user events from database and set state to reflect this data
  const getUserEvents = () => {
    axios.get('/api/eventListings')
      .then((events) => {
        setUserEvents(events.data.filter((event) => event.owner === user.email));
      })
      .catch(() => console.log(oops));
  };

  // function to get user events rsvp'd to from database and set state to reflect this data
  const getUserAttendingEvents = () => {
    axios.get('/api/eventListings')
      .then((events) => {
        setUserAttendingEvents(events.data.filter((event) => event.attendees.includes(user._id)));
      })
      .catch(err => console.error(err));
  };

  // call these functions on page load which will
  // populate components in which the are called below in Profile return statement
  useEffect(() => {
    if (user) {
      getUserEvents();
      getUserAttendingEvents();
    }
  }, [])

  // function to define delete button in user events created list
  const handleDelete = (eventId) => {
    const deleteConfirmation = confirm('Are you sure you wish to delete this event?')
    if (deleteConfirmation) {
      axios.delete('/api/event', {
        data: {
          id: eventId
        }
      })
      .then(() => {
        getUserEvents();
      })
      .catch((err) => console.error(err));
    }
  }

  // function to define delete button in user events attending list
  const handleAttendingDelete = (eventId) => {
    axios.put('/api/event', {
      id: eventId,
      // see Event.jsx and server/index.jsx for more detail on 'going' value
      going: true,
      userId: user._id
    })
      .then(getUserAttendingEvents)
      .catch((err) => console.error(err));
  }

    return (
      <div>
        <h1>
          WELCOME TO THE PROFILE PAGE
        </h1>
        <div>
        <Avatar
          alt= {user.firstName[0] + user.lastName[0]}
          src={user.image}
          sx={{ width: 175, height: 175 }}
        />
        </div>
        <p>Your Info: </p>
        <div>
          <h2>NAME</h2>
          <p>{ user.firstName } { user.lastName }</p>
        </div>
        <div>
          <h2>EMAIL</h2>
          <p>{ user.email }</p>
        </div>
        <div>
          <h2>EVENTS CREATED</h2>
          {/* map through userEvents state data and render accordion component for each item */}
            {userEvents.map((event, i) =>
            <div class='card'>
              <Accordion onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography>{event.catName + ' | Date: ' + event.date.substring(0, 10)}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <p style={{marginLeft: '10px'}}>{event.catName}</p>
                    <p style={{marginLeft: '30px'}}><b>Time: </b>{`${event.time}`}</p>
                    <p style={{marginLeft: '30px'}}><b>Location: </b>{event.address}</p>
                    <button onClick={() => handleDelete(event._id)} style={{marginLeft: 'auto'}}> delete </button>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            )}
        </div>
        <div>
          <h2>EVENTS ATTENDING</h2>
            {/* map through userAttendingEvents state data and render accordion component for each item */}
            {userAttendingEvents.map((event, i) =>
              <div class='card'>
                <Accordion onChange={handleChange('panel1')}>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>{event.catName + ' ' +event.date.substring(0, 10)}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <p style={{marginLeft: '10px'}}>{event.catName}</p>
                      <p style={{marginLeft: '30px'}}><b>Time: </b>{`${event.time}`}</p>
                      <p style={{marginLeft: '30px'}}><b>Location: </b>{event.address}</p>
                      <button onClick={() => handleAttendingDelete(event._id)} style={{marginLeft: 'auto'}}> delete </button>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            )}
        </div>
      </div>
    );
    // if user is not logged in, the below is rendered instead
  } else {
    return (
      <div>
        <br></br>
        <h1>PLEASE LOG IN </h1>
      </div>
    )
  }
}

export default Profile;
