import { useParams } from 'react-router-dom';
import { UserContext } from '../index.jsx';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

function EventPage() {
  const { eventId } = useParams();
  const context = useContext(UserContext);
  // use the eventId to fetch data for the specific event
  const [event, setEvent] = useState({});
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = () => {
    axios.get(`/eventPage/${eventId}`)
      .then((event) => {
        console.log(event);
        setEvent(event.data);
        setMessages(event.data.messages);
      })
      .catch((err) => {
        console.error('failed to get event:', err);
      });
  };

  const postMessage = (message) => {
    axios.post(
      `/event/${eventId}/message`,
      {
        username: 'todd',
        message: 'anything',
      },
    )
      .then(() => {
        getEvent();
      })
      .catch((err) => {
        console.error('could not post message:', err);
      });
  };

  if (context) {
    return (
      <div className="bulletin">
        <h2>
          {`${event?.catName} at ${event?.locName}`}
        </h2>
        <h6>
          {`${new Date(event?.date).toLocaleDateString()} at ${event?.time}`}
        </h6>
        <div className="messages">
          {messages.map((message) => (
            <div key={message.id}>
              <p>Playa: {message.username}</p>
              <p>{message.message}</p>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your message here"
          />
          <button onClick={postMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default EventPage;
