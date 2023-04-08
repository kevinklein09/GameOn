import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../index.jsx';

function EquipmentPage() {
  const { eventId } = useParams();
  const context = useContext(UserContext);

  const [equipment, setEquipment] = useState([]);
  const [event, setEvent] = useState({});

  const getEvent = () => {
    axios
      .get(`/eventPage/${eventId}`)
      .then((event) => {
        setEvent(event.data);
        setEquipment(event.data.equipment);
      })
      .catch((err) => {
        console.error('failed to get event:', err);
      });
  };

  useEffect(() => {
    getEvent();
  }, []);

  if (context) {
    return (
      <div>
        <h2>{`${event?.catName} at ${event?.locName}`}</h2>
        <h6>
          {`${new Date(event?.date).toLocaleDateString()} at ${event?.time}`}
        </h6>
        <ul className='equipmentlist'>
          {equipment.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default EquipmentPage;
