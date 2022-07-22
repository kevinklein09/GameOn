/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { UserContext } from '../index.jsx';
import axios from 'axios';

const Event = (props) => {
  const [going, setGoing] = useState(false);
  
  const context = useContext(UserContext);

  const setStatus = () => {
    axios.get('/api/event', {
      params: {
        id: props.eventData._id
      }
    })
    .then((event) => {
      if (event.data.attendees.includes(context._id)){
        setGoing(true)
      } else {
        setGoing(false)
      }
    })
    .catch((err) => console.error(err))
  }
  useEffect(() => {
    setStatus();
  })

  const handleToggle = () => {
    console.log('toggled');
    axios.get('/api/event', {
      params: {
        id: props.eventData._id
      }
    }).then((event) => {
      axios.put('/api/event', {
        id: event.data._id,
        going,
        userId: context._id
        
      }).then((data) => console.log(data))
      .catch((err) => console.error(err));
    })
    .then(() => setGoing(going => !going))

  }


  // const handleChange = (e) => {
  //   // console.log('changed!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  //   setGoing(e.target.checked);
  //     // console.log("target id →", e.target.id);
  //     // console.log('context (email of user)  →', context.email) 
  //     const event = e.target.id;
  //   axios.put(`/api/eventListings/`, {eventID: event, userId: context._id})
  //        .catch((err) => {
  //         console.error(err);
  //     })
  // }

  // const handleRemovalChange = (e) => {
  //   setGoing(e.target.checked);
  //   axios.delete('/api/eventListings/')
    
  // }
  // const renderSwitch = () => {
    
  //   const attArr = props.eventData.attendees;
  //   let switchyBoi = '';
     
  //   if (attArr.includes(props.userContext._id)){
  //     setGoing(true);
  //     switchyBoi =
  //       `<FormGroup>
  //       <FormControlLabel control=${<Switch color="warning" onChange={ handleRemovalChange } checked={ going } id={ props.eventData._id }/>} label="Going" />
  //     </FormGroup>`

      
  //   } else {
  //     switchyBoi =
  //     `<FormGroup>
  //       <FormControlLabel control=${<Switch color="warning" onChange={ handleChange } checked={ going } id={ props.eventData._id }/>} label="Going" />
  //     </FormGroup>`
  // }
  // return switchyBoi;
  // }



 return (

      <div>
        <div>-------------------------------------------</div>
        <h4>Type of Event: </h4>
      <div>{ props.eventData.catName }</div>  
      <h4>Details: </h4>   
      <div>{ props.eventData.description }
        <h5>Starting @ { props.eventData.time }</h5>
      </div>
      <h4>Location yo: </h4>
      <div>{ props.eventData.address }</div>
      <h4>What day?: </h4>
      <div>{ props.eventData.date.substring(0, 10) }</div>
    {/* // add a conditional that will make a new FormGroup containing the handleRemovalChange function 
    //and a default unchecked state if the user was an attendee but switches it off to revoke that status  */}
      <FormGroup>
        <FormControlLabel control={<Switch checked={going} color="success" onChange={ handleToggle }/>}/>
      </FormGroup>
      <div>-------------------------------------------</div>
      </div>
    
  );

}
export default Event;