import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
// import icons for weather forecast
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun, faCloud, faCloudRain, faSnowflake, faCloudSun, faCloudShowersHeavy, faSmog, faCloudBolt, faTemperatureHigh, faTemperatureLow, faCalendarDay, faGlobe,
} from '@fortawesome/free-solid-svg-icons';

const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=29.95&longitude=-90.08&hourly=temperature_2m,rain,showers,snowfall,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=auto';

const Weather = () => {
  // giving state
  const [weatherData, setWeatherData] = useState(null);

  // useEffect
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setWeatherData(res.data.daily);
      })
      .catch((err) => {
        console.error('Failed to GET', err);
      });
  }, []);

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
        return <FontAwesomeIcon icon={faSun} size='2x' beat/>;
      case 1:
        return <FontAwesomeIcon icon={faCloudSun} size='2x' beat/>;
      case 2:
        return <FontAwesomeIcon icon={faCloudSun} size='2x' beat/>;
      case 3:
        return <FontAwesomeIcon icon={faCloudSun} size='2x' beat/>;
      case 45:
        return <FontAwesomeIcon icon={faSmog} size='2x' beat/>;
      case 48:
        return <FontAwesomeIcon icon={faSmog} size='2x' beat/>;
      case 51:
        return <FontAwesomeIcon icon={faCloudRain} size='2x' beat/>;
      case 53:
        return <FontAwesomeIcon icon={faCloudRain} size='2x' beat/>;
      case 55:
        return <FontAwesomeIcon icon={faCloudRain} size='2x' beat/>;
      case 61:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} size='2x' beat/>;
      case 63:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} size='2x' beat/>;
      case 65:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} size='2x' beat/>;
      case 71:
        return <FontAwesomeIcon icon={faSnowflake} size='2x' beat/>;
      case 73:
        return <FontAwesomeIcon icon={faSnowflake} size='2x' beat/>;
      case 75:
        return <FontAwesomeIcon icon={faSnowflake} size='2x' beat/>;
      case 80:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} size='2x' beat/>;
      case 81:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} size='2x' beat/>;
      case 82:
        return <FontAwesomeIcon icon={faCloudShowersHeavy} size='2x' beat/>;
      case 95:
        return <FontAwesomeIcon icon={faCloudBolt} size='2x' beat/>;
      case 96:
        return <FontAwesomeIcon icon={faCloudBolt} size='2x' beat/>;
      default:
        return null;
    }
  };

  // daily forecast
  return (
    <div className='weather-forecast'>
      <h2>Weekly Weather Forecast</h2>
      {weatherData.time.map((data, index) => (
  <div key={index}>
    <p className="day-of-week-date"><FontAwesomeIcon icon={faCalendarDay} size='2x' beat/> : {daysOfWeek[dayjs(weatherData.time[index]).format('d')]} {dayjs(weatherData.time[index]).format('D MMM YYYY')}</p>
    <p className="weather-icon"><FontAwesomeIcon icon={faGlobe} size='2x' beat /> : {getWeatherIcon(weatherData.weathercode[index])}</p>
    <p className="high-temp"><FontAwesomeIcon icon={faTemperatureHigh} size='2x' beat/> : {weatherData.temperature_2m_max[index]}°F</p>
    <p className="low-temp"><FontAwesomeIcon icon={faTemperatureLow} size='2x' beat/> : {weatherData.temperature_2m_min[index]}°F</p>
    <p className="sunrise"><FontAwesomeIcon icon={faSun} size='2x' beat/> : {dayjs(weatherData.sunrise[index]).format(' h:mm A')}</p>
    <p className="sunset"><FontAwesomeIcon icon={faCloudSun} size='2x' beat/> : {dayjs(weatherData.sunset[index]).format(' h:mm A')}</p>
  </div>
      ))}
    </div>
  );
};

export default Weather;
