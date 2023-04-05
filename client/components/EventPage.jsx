import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { UserContext } from '../index.jsx';

// const ENV = require('../../.env');

// const { SOCKET_URL } = ENV;

function EventPage() {
  console.log(process.env.SOCKET_URL);
  const { eventId } = useParams();
  const context = useContext(UserContext);
  // use the eventId to fetch data for the specific event
  const [event, setEvent] = useState({});
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socket = io(process.env.SOCKET_URL);
  socket.on('connect', () => {
    console.log('ur in');
  });
  const getEvent = () => {
    axios
      .get(`/eventPage/${eventId}`)
      .then((event) => {
        setEvent(event.data);
        setMessages(event.data.messages);
      })
      .catch((err) => {
        console.error('failed to get event:', err);
      });
  };

  const postMessage = (message) => {
    axios
      .post(`/event/${eventId}/message`, {
        username: `${context.firstName}${
          context.lastName ? ` ${context.lastName}` : ''
        }`,
        message,
      })
      .then(getEvent)
      .catch((err) => {
        console.error('could not post message:', err);
      });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    postMessage(input);
    setInput('');
    socket.emit('message', {
      username: `${context.firstName} ${context?.lastName}`,
      message: input,
    });
  };

  useEffect(() => {
    getEvent();
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  if (context) {
    return (
      <div>
        <h2>{`${event?.catName} at ${event?.locName}`}</h2>
        <h6>
          {`${new Date(event?.date).toLocaleDateString()} at ${event?.time}`}
        </h6>
        <div className='bulletin'>
          <div className='container'>
            <div className='messages'>
              {messages
                .slice()
                .reverse()
                .map((message) => (
                  <div className='message' key={message.id}>
                    <p>Playa: {message.username}</p>
                    <p style={{ color: 'lightblue', marginBottom: 0 }}>
                      {message.message}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <div className='input-container'>
            <input
              type='text'
              placeholder='Type your message here'
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => (e.key === 'Enter' ? handleSubmit() : null)}
            />
            <button onClick={handleSubmit}>Send</button>
          </div>
        </div>
      </div>
    );
  }
}

export default EventPage;
