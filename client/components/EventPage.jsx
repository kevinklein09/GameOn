import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { io } from 'socket.io-client';
import { UserContext } from '../index.jsx';

function EventPage() {
  const { eventId } = useParams();
  const context = useContext(UserContext);
  // use the eventId to fetch data for the specific event
  const [event, setEvent] = useState({});
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socket = io(process.env.SOCKET_URL);
  const room = eventId;

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
        creator: context._id,
        owner: context.email,
        message,
        room,
      })
      .then(getEvent)
      .catch((err) => {
        console.error('could not post message:', err);
      });
    socket.emit('message', {
      username: `${context.firstName} ${context?.lastName}`,
      message: input,
      room,
    });
  };

  const deleteMessage = (message) => {
    if (context.email === event.owner || context._id === message.creator) {
      axios
        .put(`/event/${eventId}/${message._id}`)
        .then(getEvent)
        .catch((err) => {
          console.error('could not delete message', err);
        });
    } else {
      window.alert('You are not allowed to delete this message.');
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    postMessage(input);
    setInput('');
  };

  useEffect(() => {
    getEvent();
    socket.on('message', (message) => {
      if (message.room === room) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
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
                  <div
                    className='message'
                    key={message.id}
                    style={{ position: 'relative' }}
                  >
                    <DeleteForeverIcon
                      onClick={() => {
                        deleteMessage(message);
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        cursor: 'pointer',
                      }}
                    />
                    <p>
                      <span
                        style={{
                          verticalAlign: 'middle',
                          marginRight: '5px',
                        }}
                      >
                        Playa: {message.username}
                      </span>
                      <span
                        style={{
                          fontFamily: 'Helvetica, sans-serif',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: 'skyblue',
                          verticalAlign: 'middle',
                        }}
                      >
                        {moment(message.createdAt).isValid()
                          ? moment(message.createdAt).fromNow()
                          : 'just now'}
                      </span>
                    </p>
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
