/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useState, useEffect, useRef } from 'react';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
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
  // https://reactjs.org/docs/hooks-reference.html#useref
  const mapDiv = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-90.10);
  const [lat, setLat] = useState(29.96);
  const [zoom, setZoom] = useState(12);
  const [marker, setMarker] = useState([]);
  let prevMarker = [];
  useEffect(() => {
    mapboxgl.accessToken = MAP_TOKEN;
    map.current = new mapboxgl.Map({
      container: mapDiv.current,
      center: [lng, lat],
      zoom,
      style: 'mapbox://styles/mapbox/streets-v11',
    });

    const results = map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl,
      }),
    );
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

          console.log('marker:', prevMarker);
          if (event.coordinates[0] === prevMarker[0]) {
            console.log(`${event.coordinates[0].toString()}1`);
            console.log('yes');
            event.coordinates.splice(0, 1, Number(`${event.coordinates[0].toString()}79`));
            console.log(event.coordinates);
          }
          prevMarker = event.coordinates;
          const icon = document.createElement('div');
          icon.className = 'icon';
          icon.style.backgroundImage = `url(${image()})`;
          icon.style.width = '20px';
          icon.style.height = '20px';
          icon.style.backgroundSize = '100%';
          new mapboxgl.Marker(icon)
            .setLngLat([event.coordinates[0], event.coordinates[1]])
            .setPopup(new mapboxgl.Popup().setHTML(`
          <h4>${event.locName}</h4>
          <p>${event.description}</p>
          <p>${new Date(event.date.substring(0, 10)).toDateString()}</p>
          <p>${event.time}</p>`))
            .addTo(map.current)
            .on('click', (e) => {
              e.togglePopup();
            });
        });
      });
  });

  return (
      <div>
      <div id="map" className="map-container" ref={mapDiv}></div>
    </div>

  );
};

export default Map;

/* NOTES:

import { AddressAutofill } from '@mapbox/search-js-react';
<form>
<AddressAutofill accessToken={MAP_TOKEN}>
<input
name="address"
            placeholder="Address"
            type="text"
            autoComplete="address-line1" />
            </AddressAutofill>
            <input
            name="city" placeholder="City" type="text"
            autoComplete="address-level2" />
            <input
          name="state" placeholder="State" type="text"
          autoComplete="address-level1" />
        <input
          name="postcode" placeholder="Postcode" type="text"
          autoComplete="postal-code" />
          <input type="submit" onClick={handleSubmit}></input>
      </form>

    // GET request to the database to retrieve all event data
    // use the Marker function to populate them on the map
    // https://docs.mapbox.com/mapbox-gl-js/api/markers/

https://docs.mapbox.com/mapbox-search-js/tutorials/add-address-autofill-with-react/
https://docs.mapbox.com/mapbox-search-js/api/react/autofill/
https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/
https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup
http://visgl.github.io/react-map-gl/
https://reactjs.org/docs/hooks-reference.html#useref

*/
