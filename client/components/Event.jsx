/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { UserContext } from '../index.jsx';
import axios from 'axios';
import { createTheme, ThemeProvider} from '@mui/material';
const theme = createTheme({
  palette: {
    primary: {
      main: '#a373ab',
      darker: '#395B64',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});


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

 return (
  <ThemeProvider theme={theme}>
     <div class="card">
       <p class="card-text">{props.eventData.catName}</p>
       <p class="card-text">{props.eventData.description}</p>
       <p class="card-text">{props.eventData.time} | {props.eventData.date.substring(0, 10)}</p>
       <p class="card-text">{props.eventData.address}</p>
       <FormGroup>
         <FormControlLabel control={<Switch checked={going} color='primary' onChange={handleToggle} />} />
       </FormGroup>
    </div>
      </ThemeProvider>
  );

}
export default Event;