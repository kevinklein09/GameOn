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
import { UserContext } from '../index'; // imports context
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const axios = require('axios');

// import images to use as icons
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
const moment = require('moment');
const ENV = require('../../.env');

const { MAP_TOKEN } = ENV;

const Map = () => {
  const userContext = useContext(UserContext);

  // allows you to pull parameters directly from the URL
  const [searchParams, setSearchParams] = useSearchParams();
  const user = searchParams.get('user');
  const event = searchParams.get('event');
  const userId = searchParams.get('userId');
  const status = searchParams.get('status');

  // useRef to create the Map div
  // useRef Hook allows you to persist values between renders
  const mapDiv = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-90.10);
  const [lat, setLat] = useState(29.96);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (user || event) { // checks if a parameter has been passed into the URL
      // GET request for when a user clicks on the Going/NotGoing button
      axios.get(`/map?user=${user}&userId=${userContext._id}&event=${event}&status=${status}`)
        .catch((err) => {
          console.error(err);
        });
    }
    if (userContext !== null) { // checks if context has been provided
      // don't want the map to render unless the user is logged in
      mapboxgl.accessToken = MAP_TOKEN;
      map.current = new mapboxgl.Map({ // creates instance of map
        container: mapDiv.current,
        center: [lng, lat],
        zoom,
        style: 'mapbox://styles/mapbox/dark-v10',
      });

      const results = map.current.addControl( // adds the search box on the map
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl,
        }),
      );

      map.current.on('load', () => { // once the map is loaded
        axios.get('/map') // make a GET request to retrieve events from DB
          .then((eventsData) => {
            const events = eventsData.data;
            // object with properties/values that reference the imported URL objects above
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
                return images[event.catName.split(' ').join('')]; // return if the event category name matches the URL object variable defined above
                // PingPong & Ultimatefrisbee are two words in the DB, hence the .split()/.join()
              };
              // create a div to store the images above, these are used as the map markers
              const icon = document.createElement('div');
              icon.className = 'icon';
              icon.style.backgroundImage = `url(${image()})`;
              icon.style.width = '20px';
              icon.style.height = '20px';
              icon.style.backgroundSize = '100%';
              // create the html for the popup
              let popupContent = `<h4>${event.catName}</h4>
              <p><strong>Description: </strong>${event.description}</p>
              <p><strong>When: </strong>${moment(event.date).add(1, 'day').format('MMMM Do YYYY')} | ${moment(event.time, 'h:mm a').format('h:mm a')}</p>
              <p><strong>Where: </strong><strong>${event.locName}</strong> ${event.address}</p>
              <button id="btn-collectobj" style="background-color:black; color:white"><a style="color:white; text-decoration: none" href="/#/map?user=${userContext.email}&userId=${userContext._id}&event=${event._id}`;
              // If the current event's attendees includes the logged in user
              if (event.attendees.includes(userContext._id)) {
                popupContent += '&status=Going">Going</a></button>'; // redner the "Going" button and append to popup
              } else {
                popupContent += '&status=NotGoing">Not Going</a></button>'; // otherwise append the "NotGoing" button
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
  // if the user is logged in
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
  // if user is not logged in
  return (
    <div align='center'>
      <br></br>
    <h3>
    You must be logged in to view the map
    </h3>
    <img width='200' height='100%' src='https://media4.giphy.com/media/Sn1n5eEtyWuLrhDi9S/giphy.gif?cid=790b7611a080c221e8edf3ae298df764ad9dfbf70024485a&rid=giphy.gif&ct=s'/>
  </div>
  );
};

export default Map;

/* NOTES:
🚧 The mapbox-gl popup would not implement onClick functions in the html button.
Instead, we created a link in the button that would redirect and pass in the
details of that event and user to the URL to be used by the GET request on the server side.
In the future, it would be better to create a custom Popup component and import
that instead of using the HTML.

🚧 Another bug involved having multiple events render to the exact same address; they would overlap
each other and not trigger the popups properly. This issue was not resolved.

https://docs.mapbox.com/mapbox-gl-js/api/markers/
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
