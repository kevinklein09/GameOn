/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../index';
import axios from 'axios';
import { styled } from '@mui/material/styles';
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
  
  const user = useContext(UserContext);
  
  const [expanded, setExpanded] = React.useState(null);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
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
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            )}
        </div>
      </div>
    );
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
