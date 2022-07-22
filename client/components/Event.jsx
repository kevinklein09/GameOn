/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { UserContext } from '../index.jsx';
import axios from 'axios';
import { createTheme, ThemeProvider} from '@mui/material';
import Typography from '@mui/material/Typography';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import { black } from '@mui/material/colors';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import AlbumIcon from '@mui/icons-material/Album';
import BlurCircularIcon from '@mui/icons-material/BlurCircular';

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
     <Typography variant="h4"><p class="card-text"><SportsBasketballIcon sx={{ color: black }} /> {props.eventData.catName}</p></Typography>
       <p class="card-text">{props.eventData.description}</p>
       <p class="card-text"><CalendarMonthIcon sx={{ color: black }} /> {new Date(props.eventData.date.substring(0, 10)).toDateString()} | {props.eventData.time}</p> 
       <p class="card-text"><LocationOnIcon sx={{ color: black }} />{props.eventData.address}</p>
       <FormGroup>
         <FormControlLabel control={<Switch checked={going} color='primary' onChange={handleToggle}/>} style={{fontWeight: 'bolder'}}label="RSVP"/>
       </FormGroup>
    </div>
      </ThemeProvider>
  );

}
export default Event;