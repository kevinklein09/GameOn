import React, { useState, useEffect } from 'react';import axios from 'axios';

//import icons for weather forecast
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faCloud, faCloudRain, faSnowflake } from "@fortawesome/free-solid-svg-icons";

const API_URL = 'https://api.open-meteo.com/v1/forecast/daily';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        setWeatherData(res.data);
      })
      .catch((err) => {
        console.error('Failed to GET', err);
      });
  }, []);

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

};
