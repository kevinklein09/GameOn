import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

// import icons for weather forecast
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun, faCloud, faCloudRain, faSnowflake, faCloudSun, faCloudShowersHeavy, faSmog, faCloudBolt,
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
        setWeatherData(res.data.daily);
        console.log(res.data.daily, 'This is res.data.daily');
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
      case 0:
        return <FontAwesomeIcon icon={faSun} />;
      case 1:
        return <FontAwesomeIcon icon={faCloudSun}/>;
      case 2:
        return <FontAwesomeIcon icon={faCloudSun}/>;
      case 3:
        return <FontAwesomeIcon icon={faCloudSun}/>;
      case 45:
        return <FontAwesomeIcon icon={faSmog} />;
      case 48:
        return <FontAwesomeIcon icon={faSmog} />;
      case 51:
        return <FontAwesomeIcon icon={faCloudRain} />;
      case 53:
        return <FontAwesomeIcon icon={faCloudRain} />;
      case 55:
        return <FontAwesomeIcon icon={faCloudRain} />;
      case 61:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} />;
      case 63:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} />;
      case 65:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} />;
      case 71:
        return <FontAwesomeIcon icon={faSnowflake} />;
      case 73:
        return <FontAwesomeIcon icon={faSnowflake} />;
      case 75:
        return <FontAwesomeIcon icon={faSnowflake} />;
      case 80:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} />;
      case 81:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} />;
      case 82:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} />;
      case 95:
        return <FontAwesomeIcon icon={faCloudBolt} />;
      default:
        return null;
    }
  };

  return (
    <div className='weather-forecast'>
      <h2>Weekly Weather Forecast</h2>
      {weatherData.time.map((data, index) => (
  <li key={index}>
    <p className="high-temp">High: {weatherData.temperature_2m_max[index]}°F</p>
    <p className="low-temp">Low: {weatherData.temperature_2m_min[index]}°F</p>
    <p className="day-of-week">Day: {daysOfWeek[dayjs(weatherData.time[index]).format('d')]}</p>
    <p className="date">Date: {dayjs(weatherData.time[index]).format('D MMM')}</p>
    <p className="sunrise">Sunrise: {dayjs(weatherData.sunrise[index]).format(' MMMM D, YYYY h:mm A')}</p>
    <p className="sunset">Sunset: {dayjs(weatherData.sunset[index]).format(' MMMM D, YYYY h:mm A')}</p>
    <div className="weather-icon">{getWeatherIcon(weatherData.weathercode[index].value)}</div>
  </li>
      ))}
    </div>
  );
};

export default Weather;
