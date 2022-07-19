/* eslint-disable */
import React from 'react';

const Event = (props) => {
  // console.log(sport);
  console.log(props.eventData);
  
 return (
    
      <div>
        <div>-------------------------------------------</div>
        <h4>Type of Event: </h4>
      <div>{ props.eventData.catName }</div>   
      <h4>Details: </h4>   
      <div>{ props.eventData.description }</div>
      <h4>Location yo: </h4>
      <div>{ props.eventData.address }</div>
      <h4>When though?: </h4>
      <div>{ props.eventData.date.substring(0, 10) }</div>
      <div>-------------------------------------------</div>
      </div>
    
  );

}
export default Event;

