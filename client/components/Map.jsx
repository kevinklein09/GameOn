/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';

const mapboxgl = require('mapbox-gl');
const ENV = require('../../.env');

const { MAP_TOKEN } = ENV;

const Map = () => {
  useEffect(() => {
    mapboxgl.accessToken = MAP_TOKEN;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
    });
  });

  return (
  <div>
        <h1>
            WELCOME TO THE MAP
        </h1>
        <div id="map" className="map-container"></div>
      </div>
  );
};

/*   <div id="map"></div>
  <script>
  mapboxgl.accessToken =
  'pk.eyJ1IjoiYmV0cGV0am9uZXMiLCJhIjoiY2w1b2p4c3U0MWVhYjNrbW1sN3dscDk5ZCJ9.mCRjcVp1qwrsKdBNjFgKuA';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
  });

  map.on('style.load');
</script>
*/
export default Map;
