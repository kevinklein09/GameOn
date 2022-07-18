/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useState, useEffect, useRef } from 'react';

import { AddressAutofill } from '@mapbox/search-js-react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const axios = require('axios');

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
    const marker = new mapboxgl.Marker()
      .setLngLat([-90.10, 29.96])
      .setPopup(new mapboxgl.Popup().setHTML('<p>Hi, testing</p>'))
      .addTo(map.current);
    marker.on('click', (e) => {
      marker.togglePopup();
    });
    const marker2 = new mapboxgl.Marker()
      .setLngLat([-90.166775, 29.95726])
      .setPopup(new mapboxgl.Popup().setHTML('<p>Hi, testing</p>'))
      .addTo(map.current);
    marker2.on('click', (e) => {
      marker2.togglePopup();
    });
    const marker3 = new mapboxgl.Marker()
      .setLngLat([-90.08, 29.94])
      .setPopup(new mapboxgl.Popup().setHTML('<p>Hi, testing</p>'))
      .addTo(map.current);
    marker3.on('click', (e) => {
      marker3.togglePopup();
    });
  });

  function handleSubmit(e) {
    console.log('Submit');
    console.log(e.target.value);
  }

  // axios.get('/map');

  return (
    <div>
      <h1>
        WELCOME TO THE MAP
      </h1>
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
      <div id="map" className="map-container" ref={mapDiv}></div>
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

https://developers.google.com/maps/documentation/javascript/places#find_place_from_query
https://console.cloud.google.com/google/maps-apis/overview;onboard=true?project=gameon-356617
https://developers.google.com/maps/documentation/places/web-service/search
https://developers.google.com/maps/documentation/places/web-service/autocomplete#maps_http_places_autocomplete_amoeba-js
https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete

app.get(/maps, (req, res)=>{
  console.log('get request');
  Event.find({})
  .then((query)=>{
    console.log(query);
    res.sendStatus(200);
  })
  .catch((err)=>{
    console.error(err);
    res.sendStatus(500);
  })
})

*/

