import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import icons for weather forecast
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun, faCloud, faCloudRain, faSnowflake, faCloudSun, faCloudShowersHeavy,
} from '@fortawesome/free-solid-svg-icons';

const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=29.95&longitude=-90.08&hourly=temperature_2m,rain,showers,snowfall,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=auto';

const Weather = () => {
  // giving state
  const [weatherData, setWeatherData] = useState(null);

  // potential useEffect
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setWeatherData(Object.values(res.data.daily));
      })
      .catch((err) => {
        console.error('Failed to GET', err);
      });
  }, []);
  console.log(weatherData, 'This is the weatherData');
  // loading screen display
  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  // days of the week to display
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  // icons for types of weather
  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'clear':
        return <FontAwesomeIcon icon={faSun} />;
      case 'partly-cloudy':
        return <FontAwesomeIcon icon={faCloudSun}/>;
      case 'cloudy':
        return <FontAwesomeIcon icon={faCloud} />;
      case 'light-rain':
        return <FontAwesomeIcon icon={faCloudRain} />;
      case 'heavy-rain':
        return <FontAwesomeIcon icon={faCloudShowersHeavy} />;
      case 'snow':
        return <FontAwesomeIcon icon={faSnowflake} />;
      default:
        return null;
    }
  };

  return (
    <div className='weather-forecast'>
      <h2>Weekly Weather Forecast</h2>
{weatherData.map(() => (
    <p className="test">{weatherData}</p>
))}
    </div>
  );
};

export default Weather;
