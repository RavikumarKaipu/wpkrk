import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'

const Weather = () => {
  const [forecastList, setForecastList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = '5f547758932b38a665c0f9a2af041dea';
        const cityId = 524901; // Replace with the desired city ID
        const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`;

        const response = await axios.get(apiUrl);
        const fiveDayForecast = response.data.list.slice(0, 5); // Get the next 5 days
        console.log(response.data.city.sunrise)
        const formatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

        const formattedForecastList = fiveDayForecast.map(forecast => ({
          maxTemperature: forecast.main.temp_max,
          minTemperature: forecast.main.temp_min,
          sunsetTime: new Date(response.data.city.sunset  * 1000).toLocaleTimeString('en-US', formatOptions),
          sunriseTime: new Date(response.data.city.sunrise * 1000).toLocaleTimeString('en-US', formatOptions),
          humidity: forecast.main.humidity,
          
        }));

        setForecastList(formattedForecastList);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='main-temp-container'>
      <div className=''>
        <div className='flex'>
          <label>Select Date</label>
          <input type='date'/>
        </div>
        <h4>High Temperature</h4>
        <h4>Low Temperature</h4>
        <h4>Humidity</h4>
        <h4>Sunrise Time</h4>
        <h4>Sunset Time</h4>
      </div>
      
      <div>
        
        <div className='flex-row'>
          
          
          {forecastList.map((forecast, index) => (
            
            <div key={index} >
            <h1>20 Jan 2023</h1>
            <div className='temp-card'>
              <p>Sunny</p>
              <hr/>
              <p>{forecast.maxTemperature}</p>
              <p>{forecast.minTemperature}</p>
              <p>{forecast.humidity}</p>
              <p>{forecast.sunsetTime}</p>
              <p>{forecast.sunriseTime}</p>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  )
}

export default Weather
