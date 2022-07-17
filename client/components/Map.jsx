/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useState, useEffect, useRef } from 'react';

import { AddressAutofill } from '@mapbox/search-js-react';
import { MapboxSearch, SearchSession } from '@mapbox/search-js-core';

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

    // GET request to the database to retrieve all event data
    // use the Marker function to populate them on the map
    // https://docs.mapbox.com/mapbox-gl-js/api/markers/

    const marker = new mapboxgl.Marker()
      .setLngLat([-90.10, 29.96])
      .setPopup(new mapboxgl.Popup().setHTML('<p>Hi, testing</p>'))
      .addTo(map.current);
    marker.on('click', (e) => {
      marker.togglePopup();
    });
    const marker2 = new mapboxgl.Marker()
      .setLngLat([-90.12, 29.97])
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

  //   let autocomplete;
  //   function initAutocomplete() {
  //     autocomplete = new google.maps.places.Autocomplete(
  //       window.HTMLInputElement('autocomplete'),
  //       {
  //         types: ['establishment', 'park', 'bar', 'bowling_alley', 'landmark', 'neighborhood',
  //  'gym', 'library', 'school', 'stadium', 'university'],
  //         componentRestrictions: { country: ['US'] },
  //         fields: ['place_id', 'geometry', 'name'],
  //       },
  //     );
  //   }
  //   console.log(google);
  //   google.maps.event.addDomListener(window, 'load', initAutocomplete);
  //  <script defer src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API}&libraries=places`}></script>

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
      </form><div id="map" className="map-container" ref={mapDiv}></div><script>
      </script>
    </div>

  );
};

export default Map;

/* NOTES:
https://docs.mapbox.com/mapbox-search-js/tutorials/add-address-autofill-with-react/
https://docs.mapbox.com/mapbox-search-js/api/react/autofill/
https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/
https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup

https://developers.google.com/maps/documentation/javascript/places#find_place_from_query
https://console.cloud.google.com/google/maps-apis/overview;onboard=true?project=gameon-356617
https://developers.google.com/maps/documentation/places/web-service/search
https://developers.google.com/maps/documentation/places/web-service/autocomplete#maps_http_places_autocomplete_amoeba-js
https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete
*/
