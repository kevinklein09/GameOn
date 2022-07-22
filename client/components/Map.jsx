/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import Typography from '@mui/material/Typography';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useSearchParams } from 'react-router-dom';
import { UserContext } from '../index';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const axios = require('axios');
// import images
const Basketball = new URL('../images/basketball_icon.png', import.meta.url);
const Bowling = new URL('../images/bowling_icon.png', import.meta.url);
const Football = new URL('../images/football_icon.png', import.meta.url);
const Ultimatefrisbee = new URL('../images/frisbee_icon.png', import.meta.url);
const PingPong = new URL('../images/pingpong_icon.png', import.meta.url);
const Rugby = new URL('../images/rugby_icon.png', import.meta.url);
const Soccer = new URL('../images/soccer_icon.png', import.meta.url);
const Softball = new URL('../images/softball_icon.png', import.meta.url);
const Tennis = new URL('../images/tennis_icon.png', import.meta.url);
const Volleyball = new URL('../images/volleyball_icon.png', import.meta.url);
const mapboxgl = require('mapbox-gl');

const ENV = require('../../.env');

const { MAP_TOKEN } = ENV;

const Map = () => {
  const userContext = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const user = searchParams.get('user');
  const event = searchParams.get('event');
  const userId = searchParams.get('userId');
  if (userContext !== null) {
    console.log(`userParam: ${user}, event: ${event}, signedIn: ${userContext.email}, userId: ${userContext._id}`);
  }

  // https://reactjs.org/docs/hooks-reference.html#useref
  const mapDiv = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-90.10);
  const [lat, setLat] = useState(29.96);
  const [zoom, setZoom] = useState(12);

  // context username & userId
  useEffect(() => {
    if (user || event) {
      axios.get(`/map?user=${user}&userId=${userContext._id}&event=${event}`)
        .then((eventData) => {
          // console.log(eventData);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (userContext) {
      mapboxgl.accessToken = MAP_TOKEN;
      map.current = new mapboxgl.Map({
        container: mapDiv.current,
        center: [lng, lat],
        zoom,
        style: 'mapbox://styles/mapbox/dark-v10',
      });

      const results = map.current.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl,
        }),
      );

      map.current.on('load', () => {
        axios.get('/map')
          .then((eventsData) => {
            const events = eventsData.data;
            events.forEach((event) => {
              const image = () => {
                const images = {
                  Basketball,
                  Bowling,
                  Football,
                  Ultimatefrisbee,
                  PingPong,
                  Rugby,
                  Soccer,
                  Softball,
                  Tennis,
                  Volleyball,
                };
                return images[event.catName.split(' ').join('')];
              };

              const icon = document.createElement('div');
              icon.className = 'icon';
              icon.style.backgroundImage = `url(${image()})`;
              icon.style.width = '20px';
              icon.style.height = '20px';
              icon.style.backgroundSize = '100%';
              let popupContent;
              if (event.attendees.includes(userId)) {
                console.log('user attending');
                popupContent = `
              <h4>${event.catName}</h4>
              <p>${event.description}</p>
              <p><strong>When: </strong>${new Date(event.date.substring(0, 10)).toDateString()} | ${event.time}</p>
              <p><strong>Where: </strong>${event.address}</p>
              <button id="btn-collectobj" style="background-color:green"><a href="/#/map?user=${userContext.email}&userId=${userContext._id}&event=${event._id}">Going</a></button>
              `;
              } else {
                popupContent = `
              <h4>${event.catName}</h4>
              <p>${event.description}</p>
              <p><strong>When: </strong>${new Date(event.date.substring(0, 10)).toDateString()} | ${event.time}</p>
              <p><strong>Where: </strong>${event.address}</p>
              <button id="btn-collectobj"><a href="/#/map?user=${userContext.email}&userId=${userContext._id}&event=${event._id}">Not Going</a></button>
              `;
              }

              new mapboxgl.Marker(icon)
                .setLngLat([event.coordinates[0], event.coordinates[1]])
                .setPopup(new mapboxgl.Popup().setHTML(popupContent))
                .addTo(map.current);
            });
          });
      });
    }
  });

  if (userContext) {
    return (
        <div>
          <br></br><br></br>
        <Typography variant="h4" >Hello, {userContext.firstName}!</Typography>
        <Typography align="center" variant="body1">Check out all of the games near you!</Typography>
        <div id="map" className="map-container" ref={mapDiv}></div>
      </div>
    );
  }
  return (
    <div align='center'>
    <h3>
    You must be logged in to view the map
    </h3>
    <img width='200' height='100%' src='https://media4.giphy.com/media/Sn1n5eEtyWuLrhDi9S/giphy.gif?cid=790b7611a080c221e8edf3ae298df764ad9dfbf70024485a&rid=giphy.gif&ct=s'/>
  </div>
  );
};

export default Map;

/* NOTES:

    // GET request to the database to retrieve all event data
    // use the Marker function to populate them on the map
    // https://docs.mapbox.com/mapbox-gl-js/api/markers/

https://docs.mapbox.com/mapbox-search-js/tutorials/add-address-autofill-with-react/
https://docs.mapbox.com/mapbox-search-js/api/react/autofill/
https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/
https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup
http://visgl.github.io/react-map-gl/
https://reactjs.org/docs/hooks-reference.html#useref

https://stackoverflow.com/questions/48916901/possible-to-render-react-component-within-mapboxgl-popup-in-sethtml-or-setdo

https://stackoverflow.com/questions/68066479/onclick-not-working-in-my-popup-button-mapoboxgl
https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/
https://codesandbox.io/s/confident-moser-80lxz?file=/src/App.js:906-1013
https://github.com/visgl/react-map-gl/blob/master/src/components/popup.ts
https://docs.mapbox.com/mapbox-gl-js/api/markers/
https://www.w3schools.com/jsref/event_onclick.asp
https://docs.mapbox.com/mapbox-gl-js/api/markers/
*/
