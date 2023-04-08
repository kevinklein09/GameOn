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

  const handleCheckboxChange = (e, item) => {
    const updatedEquipment = equipment.map((e) => {
      if (e.item === item.item) {
        const assignedTo = e.isChecked
          ? ''
          : `${context.firstName} ${context.lastName}`;
        return {
          ...e,
          isChecked: !e.isChecked,
          assignedTo,
        };
      }
      return e;
    });
    setEquipment(updatedEquipment);

    axios.put(`/api/events/${eventId}`, {
      equipment: updatedEquipment,
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
            <li key={i}>
              <input
                type='checkbox'
                checked={item.isChecked}
                onChange={(e) => handleCheckboxChange(e, item)}
              />
              {item.item}
              {item.assignedTo && <span> ({item.assignedTo})</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default EquipmentPage;
