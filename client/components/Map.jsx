/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useState, useEffect, useRef } from 'react';

const mapboxgl = require('mapbox-gl');

const ENV = require('../../.env');

const { MAP_TOKEN } = ENV;

const Map = () => {
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
