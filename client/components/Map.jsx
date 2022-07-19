/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useState, useEffect, useRef } from 'react';

import { AddressAutofill } from '@mapbox/search-js-react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const axios = require('axios');
// import images
const basketball = new URL('../images/basketball_icon.png', import.meta.url);
const bowling = new URL('../images/bowling_icon.png', import.meta.url);
const football = new URL('../images/football_icon.png', import.meta.url);
const frisbee = new URL('../images/frisbee_icon.png', import.meta.url);
const pingpong = new URL('../images/pingpong_icon.png', import.meta.url);
const rugby = new URL('../images/rugby_icon.png', import.meta.url);
const soccer = new URL('../images/soccer_icon.png', import.meta.url);
const softball = new URL('../images/softball_icon.png', import.meta.url);
const tennis = new URL('../images/tennis_icon.png', import.meta.url);
const volleyball = new URL('../images/volleyball_icon.png', import.meta.url);
const mapboxgl = require('mapbox-gl');

const ENV = require('../../.env');

const { MAP_TOKEN, GOOGLE_MAPS_API } = ENV;

const Map = () => {
  // https://reactjs.org/docs/hooks-reference.html#useref
  const mapDiv = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-90.10);
  const [lat, setLat] = useState(29.96);
  const [zoom, setZoom] = useState(12);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    mapboxgl.accessToken = MAP_TOKEN;
    map.current = new mapboxgl.Map({
      container: mapDiv.current,
      center: [lng, lat],
      zoom,
      style: 'mapbox://styles/mapbox/streets-v11',
    });
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl,
    });
    const results = map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl,
      }),
    );
    axios.get('/map')
      .then((eventsData) => {
        console.log('eventsData:', eventsData.data);
        const events = eventsData.data;
        events.forEach((event) => {
          const image = () => {
            const images = {
              basketball,
              bowling,
              football,
              frisbee,
              pingpong,
              rugby,
              soccer,
              softball,
              tennis,
              volleyball,
            };
            return images[event.image];
          };

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
              <p>${event.date}</p>
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
      <h1>
        WELCOME TO THE MAP
      </h1>
      <div id="map" className="map-container" ref={mapDiv}></div>
    </div>

  );
};

export default Map;

/* NOTES:

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

https://developers.google.com/maps/documentation/javascript/places#find_place_from_query
https://console.cloud.google.com/google/maps-apis/overview;onboard=true?project=gameon-356617
https://developers.google.com/maps/documentation/places/web-service/search
https://developers.google.com/maps/documentation/places/web-service/autocomplete#maps_http_places_autocomplete_amoeba-js
https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete

*/
